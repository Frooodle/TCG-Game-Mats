import { useCallback, useMemo, useRef, useState } from 'react';
import Dropzone from './components/Dropzone';
import OverlayCanvas, { TOOLS } from './components/OverlayCanvas';
import Sidebar from './components/Sidebar';
import { DEFAULT_CUSTOM_CONFIG, getMatSize, getRiftboundPreset } from './overlays/renderer';
import { RulesConfigBuilder } from './domain/rules';
import './App.css';

export default function App() {
  const [imageData,    setImageData]    = useState(null);
  const [backgroundMode, setBackgroundMode] = useState('image'); // 'image' | 'plain'
  const [plainBackgroundColor, setPlainBackgroundColor] = useState('#1f2233');
  const [presetMode,   setPresetMode]   = useState('riftbound'); // 'riftbound' | 'custom'
  const [riftboundLayoutId, setRiftboundLayoutId] = useState('1p-with-battlefield');
  const [config,       setConfig]       = useState(() => getRiftboundPreset('1p-with-battlefield'));
  const [overlayColor,    setOverlayColor]    = useState('#c89b3c');
  const [overlayOpacity,  setOverlayOpacity]  = useState(0.85);
  const [showOverlay,     setShowOverlay]     = useState(true);
  const [borderStyle,     setBorderStyle]     = useState('full');   // 'full' | 'corners' | 'none'
  const [overlayRounded,  setOverlayRounded]  = useState(true);
  const [showNames,       setShowNames]       = useState(true);
  const [showIcons,       setShowIcons]       = useState(true);
  const [giantTextEnabled, setGiantTextEnabled] = useState(false);
  const [rulesEntries, setRulesEntries] = useState(() => RulesConfigBuilder.buildDefaultEntries(getRiftboundPreset('1p-with-battlefield')));
  const [overlayMirrored, setOverlayMirrored] = useState(false);
  const [zoneGap,      setZoneGap]      = useState(20);
  const [edgeRunner,   setEdgeRunner]   = useState({ enabled: false, inset: 18, pointed: false });
  const [activeTool,   setActiveTool]   = useState(TOOLS.NONE);
  const [brushSize,    setBrushSize]    = useState(40);
  const [fadeOpacity,  setFadeOpacity]  = useState(0.4);
  const [isDragging,   setIsDragging]   = useState(false);
  const [isExporting,  setIsExporting]  = useState(false);

  const canvasRef = useRef(null);

  // ── Memoised overlay options ──────────────────────────────────────────────
  const overlayOptions = useMemo(
    () => ({ borderStyle, rounded: overlayRounded, showNames, showIcons, giantTextEnabled, mirrored: overlayMirrored, zoneGap, edgeRunner }),
    [borderStyle, overlayRounded, showNames, showIcons, giantTextEnabled, overlayMirrored, zoneGap, edgeRunner]
  );

  // ── Mode switching ────────────────────────────────────────────────────────
  const handleModeChange = useCallback((newMode) => {
    setPresetMode(newMode);
    if (newMode === 'riftbound') {
      const next = getRiftboundPreset(riftboundLayoutId);
      setConfig(next);
      setRulesEntries(RulesConfigBuilder.buildDefaultEntries(next));
    } else if (newMode === 'custom') {
      const next = JSON.parse(JSON.stringify(DEFAULT_CUSTOM_CONFIG));
      setConfig(next);
      setRulesEntries(RulesConfigBuilder.buildDefaultEntries(next));
    }
  }, [riftboundLayoutId]);

  const handleRiftboundLayoutChange = useCallback((layoutId) => {
    setRiftboundLayoutId(layoutId);
    if (presetMode === 'riftbound') {
      const next = getRiftboundPreset(layoutId);
      setConfig(next);
      setRulesEntries(RulesConfigBuilder.buildDefaultEntries(next));
    }
  }, [presetMode]);

  const renderConfig = useMemo(
    () => RulesConfigBuilder.applyEntries(config, rulesEntries, giantTextEnabled),
    [config, rulesEntries, giantTextEnabled]
  );

  const matSize = useMemo(() => getMatSize(renderConfig), [renderConfig]);

  // ── Image handling ────────────────────────────────────────────────────────
  const handleImageLoad = useCallback((src) => {
    setImageData(src);
    setBackgroundMode('image');
    setActiveTool(TOOLS.NONE);
  }, []);

  const handleUsePlainBackground = useCallback((color) => {
    setImageData(null);
    setBackgroundMode('plain');
    if (color) setPlainBackgroundColor(color);
    setActiveTool(TOOLS.NONE);
  }, []);

  const handleDragOver  = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => handleImageLoad(ev.target.result);
        reader.readAsDataURL(file);
      }
    },
    [handleImageLoad]
  );

  const handleClearImage = useCallback(() => {
    setImageData(null);
    setBackgroundMode('image');
    setActiveTool(TOOLS.NONE);
  }, []);

  const hasCanvas = !!imageData || backgroundMode === 'plain';

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = canvasRef.current.toDataURL();
      const a = document.createElement('a');
      a.download = `tcg-game-mat-${presetMode}.png`;
      a.href = dataUrl;
      a.click();
    } finally {
      setIsExporting(false);
    }
  }, [presetMode]);

  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-sword">⚔</span>
          <span className="logo-name">TCG Game Mats</span>
          <span className="logo-tag">Mat Designer</span>
        </div>
        <div className="header-actions">
          {hasCanvas && (
            <>
              <button className="btn-ghost" onClick={handleClearImage}>← New Background</button>
              <button className="btn-export" onClick={handleExport} disabled={isExporting}>
                {isExporting ? 'Exporting…' : '↓ Export PNG'}
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="app-body">
        <Sidebar
          presetMode={presetMode}
          onPresetModeChange={handleModeChange}
          riftboundLayoutId={riftboundLayoutId}
          onRiftboundLayoutChange={handleRiftboundLayoutChange}
          config={config}
          onConfigChange={setConfig}
          borderStyle={borderStyle}
          onBorderStyleChange={setBorderStyle}
          overlayRounded={overlayRounded}
          onOverlayRoundedChange={setOverlayRounded}
          showNames={showNames}
          onShowNamesChange={setShowNames}
          showIcons={showIcons}
          onShowIconsChange={setShowIcons}
          giantTextEnabled={giantTextEnabled}
          onGiantTextEnabledChange={setGiantTextEnabled}
          rulesEntries={rulesEntries}
          onRulesEntriesChange={setRulesEntries}
          overlayMirrored={overlayMirrored}
          onOverlayMirroredChange={setOverlayMirrored}
          zoneGap={zoneGap}
          onZoneGapChange={setZoneGap}
          edgeRunner={edgeRunner}
          onEdgeRunnerChange={setEdgeRunner}
          overlayColor={overlayColor}
          onOverlayColorChange={setOverlayColor}
          overlayOpacity={overlayOpacity}
          onOverlayOpacityChange={setOverlayOpacity}
          showOverlay={showOverlay}
          onShowOverlayChange={setShowOverlay}
          activeTool={activeTool}
          onActiveToolChange={setActiveTool}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          fadeOpacity={fadeOpacity}
          onFadeOpacityChange={setFadeOpacity}
          onClearMask={() => canvasRef.current?.clearMask()}
          hasImage={hasCanvas}
        />

        <main className="canvas-area">
          {!hasCanvas ? (
            <Dropzone
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onImageLoad={handleImageLoad}
              plainBackgroundColor={plainBackgroundColor}
              onPlainBackgroundColorChange={setPlainBackgroundColor}
              onUsePlainBackground={handleUsePlainBackground}
              matSize={matSize}
            />
          ) : (
            <div className="canvas-wrapper-outer">
              <OverlayCanvas
                ref={canvasRef}
                imageData={imageData}
                plainBackgroundColor={plainBackgroundColor}
                overlayColor={overlayColor}
                overlayOpacity={overlayOpacity}
                showOverlay={showOverlay}
                activeTool={activeTool}
                brushSize={brushSize}
                fadeOpacity={fadeOpacity}
                config={renderConfig}
                overlayOptions={overlayOptions}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
              <div className="canvas-meta">
                <span className="canvas-dim">{`${matSize.width} × ${matSize.height} px`}</span>
                <span className="canvas-hint">
                  {activeTool === TOOLS.NONE
                    ? 'Select a tool to paint on the overlay'
                    : `${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} tool active — paint on the canvas`}
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
