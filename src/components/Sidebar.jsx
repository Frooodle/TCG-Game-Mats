import { useState } from 'react';
import { TOOLS } from './OverlayCanvas';
import CustomEditor from './CustomEditor';
import { RIFTBOUND_LAYOUTS } from '../overlays/renderer';
import { clampPct, RuleEntryFactory, RULE_TEMPLATES } from '../domain/rules';

const TOOL_DEFS = [
  { id: TOOLS.NONE,    icon: '↖', label: 'Select' },
  { id: TOOLS.ERASER,  icon: '◌', label: 'Erase' },
  { id: TOOLS.FADE,    icon: '◕', label: 'Fade' },
  { id: TOOLS.RESTORE, icon: '✦', label: 'Restore' },
];

const BORDER_OPTS = [
  { id: 'full',    label: 'Full' },
  { id: 'corners', label: 'Corners' },
  { id: 'double',  label: 'Double' },
  { id: 'dashed',  label: 'Dashed' },
  { id: 'brush',   label: 'Brush' },
  { id: 'none',    label: 'None' },
];

function SectionLabel({ children, badge }) {
  return (
    <div className="section-label-wrap">
      <span className="section-label">{children}</span>
      {badge && <span className="badge-beta">{badge}</span>}
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="toggle-thumb" />
    </div>
  );
}

function AccordionSection({ label, open, onToggle, headerRight, children }) {
  return (
    <div className="sidebar-section">
      <button type="button" className="collapsible-hd"
        onClick={onToggle} aria-expanded={open}>
        <SectionLabel>{label}</SectionLabel>
        <span className="collapsible-meta">
          {headerRight}
          <span className="collapsible-hint">{open ? 'Hide' : 'Show'}</span>
          <span className="collapse-arrow">{open ? '▾' : '▸'}</span>
        </span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default function Sidebar({
  presetMode, onPresetModeChange,
  riftboundLayoutId, onRiftboundLayoutChange,
  config, onConfigChange,
  borderStyle, onBorderStyleChange,
  overlayRounded, onOverlayRoundedChange,
  showNames, onShowNamesChange,
  showIcons, onShowIconsChange,
  giantTextEnabled, onGiantTextEnabledChange,
  rulesEntries, onRulesEntriesChange,
  overlayMirrored, onOverlayMirroredChange,
  zoneGap, onZoneGapChange,
  edgeRunner, onEdgeRunnerChange,
  overlayColor, onOverlayColorChange,
  overlayOpacity, onOverlayOpacityChange,
  showOverlay, onShowOverlayChange,
  overlayGradient, onOverlayGradientChange,
  pointsStyle, onPointsStyleChange,
  borderEffects, onBorderEffectsChange,
  zoneBackground, onZoneBackgroundChange,
  activeTool, onActiveToolChange,
  brushSize, onBrushSizeChange,
  fadeOpacity, onFadeOpacityChange,
  onClearMask, hasImage,
}) {
  const [drawingOpen, setDrawingOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(true);
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [moreStyleOpen, setMoreStyleOpen] = useState(false);
  const [edgeRunnerOpen, setEdgeRunnerOpen] = useState(false);
  const [pointsOpen, setPointsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  const isRiftbound = presetMode === 'riftbound';
  const hasMirrored2P = isRiftbound && config.zones?.some((z) => z.id.startsWith('p1_')) && config.zones?.some((z) => z.id.startsWith('p2_'));
  const ruleZoneOptions = hasMirrored2P
    ? config.zones.filter((z) => !z.id.startsWith('p2_'))
    : config.zones;

  const patchRule = (id, p) => {
    onRulesEntriesChange(rulesEntries.map((r) => (r.id === id ? { ...r, ...p } : r)));
  };
  const removeRule = (id) => onRulesEntriesChange(rulesEntries.filter((r) => r.id !== id));
  const addRule = () => {
    const firstZone = ruleZoneOptions[0]?.id ?? '';
    onRulesEntriesChange([
      ...rulesEntries,
      RuleEntryFactory.createBlank(firstZone),
    ]);
  };
  const applyTemplate = (ruleId, templateId) => {
    const t = RULE_TEMPLATES.find((x) => x.id === templateId);
    patchRule(ruleId, { templateId, text: t?.text ?? '' });
  };

  return (
    <aside className="sidebar">

      {/* ── Game Type (always visible) ──────────────────────────────────── */}
      <div className="sidebar-section">
        <SectionLabel>Game Type</SectionLabel>
        <div className="mode-selector">
          <button className={`mode-tab ${isRiftbound ? 'active' : ''}`}
            onClick={() => onPresetModeChange('riftbound')}>
            <span>⚔</span> Riftbound
          </button>
          <button className={`mode-tab ${!isRiftbound ? 'active' : ''}`}
            onClick={() => onPresetModeChange('custom')}>
            <span>⊞</span> Custom
          </button>
        </div>
        {isRiftbound && (
          <>
            <div className="field-label" style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}>Game Mode</div>
            <div className="riftbound-layout-selector">
              {RIFTBOUND_LAYOUTS.map((layout) => (
                <button
                  key={layout.id}
                  className={`layout-tab ${riftboundLayoutId === layout.id ? 'active' : ''}`}
                  onClick={() => onRiftboundLayoutChange(layout.id)}
                >
                  {layout.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Show Overlay (pinned, always visible) ───────────────────────── */}
      <div className="sidebar-section" style={{ padding: '0.5rem 0' }}>
        <label className="toggle-row" style={{ fontWeight: 600 }}>
          <span className="field-label">Show Overlay</span>
          <Toggle on={showOverlay} onClick={() => onShowOverlayChange(!showOverlay)} />
        </label>
      </div>

      {/* ── Zones accordion ─────────────────────────────────────────────── */}
      <AccordionSection
        label={isRiftbound ? "Zone Labels" : "Zones"}
        open={zonesOpen}
        onToggle={() => setZonesOpen(!zonesOpen)}>
        <CustomEditor
          config={config}
          onChange={onConfigChange}
          isRiftbound={isRiftbound}
        />
      </AccordionSection>

      {/* ── Appearance accordion ────────────────────────────────────────── */}
      <AccordionSection
        label="Appearance"
        open={appearanceOpen}
        onToggle={() => setAppearanceOpen(!appearanceOpen)}>

        {/* Color (moved up, now first) */}
        <div className="cfg-block">
          <span className="field-label">Color</span>
          <div className="color-row">
            <div className="color-swatch-wrap">
              <input type="color" value={overlayColor}
                onChange={(e) => onOverlayColorChange(e.target.value)}
                className="color-native" title="Pick color" />
              <span className="color-preview" style={{ background: overlayColor }} />
            </div>
            <input type="text" value={overlayColor}
              onChange={(e) => {
                if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                  onOverlayColorChange(e.target.value);
              }}
              className="color-hex-input" maxLength={7} spellCheck={false} />
          </div>
          <div className="preset-colors">
            {['#c89b3c','#ffffff','#7b5ea7','#3ca8c8','#c84b3c','#3cc87b','#c8c83c'].map((c) => (
              <button key={c}
                className={`preset-dot ${overlayColor === c ? 'active' : ''}`}
                style={{ background: c }}
                onClick={() => onOverlayColorChange(c)}
                title={c} />
            ))}
          </div>
        </div>

        {/* Opacity (right below color) */}
        <div className="cfg-block" style={{ marginTop: '0.6rem' }}>
          <div className="section-row" style={{ marginBottom: '0.25rem' }}>
            <span className="field-label">Opacity</span>
            <span className="value-pill">{Math.round(overlayOpacity * 100)}%</span>
          </div>
          <input type="range" min={0} max={1} step={0.01} value={overlayOpacity}
            onChange={(e) => onOverlayOpacityChange(Number(e.target.value))}
            className="slider" />
        </div>

        {/* Border Style */}
        <div className="cfg-block" style={{ marginTop: '0.6rem' }}>
          <span className="field-label">Border Style</span>
          <div className="btn-group">
            {BORDER_OPTS.map((o) => (
              <button key={o.id}
                className={`btn-opt ${borderStyle === o.id ? 'active' : ''}`}
                onClick={() => onBorderStyleChange(o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Effects (Glow, Shadow) */}
        <div className="cfg-block" style={{ marginTop: '0.4rem' }}>
          <span className="field-label" style={{ fontSize: '0.85rem' }}>Effects</span>
          <label className="toggle-row" style={{ marginTop: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem' }}>Glow</span>
            <Toggle on={borderEffects.glow} onClick={() => onBorderEffectsChange({ ...borderEffects, glow: !borderEffects.glow })} />
          </label>
          <label className="toggle-row" style={{ marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.8rem' }}>Shadow</span>
            <Toggle on={borderEffects.shadow} onClick={() => onBorderEffectsChange({ ...borderEffects, shadow: !borderEffects.shadow })} />
          </label>
        </div>

        {/* Rounded Corners */}
        <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.6rem' }}>
          <span className="field-label">Rounded Corners</span>
          <Toggle on={overlayRounded} onClick={() => onOverlayRoundedChange(!overlayRounded)} />
        </label>

        {/* Mirror Layout */}
        <button
          className={`btn-mirror ${overlayMirrored ? 'active' : ''}`}
          onClick={() => onOverlayMirroredChange(!overlayMirrored)}>
          ↔ Mirror Layout
        </button>

        {/* Inner "More Style Options" accordion */}
        <button
          type="button"
          className="inner-accordion-hd"
          onClick={() => setMoreStyleOpen(!moreStyleOpen)}
          style={{ width: '100%', textAlign: 'left', marginTop: '0.6rem' }}>
          <span>▼ More Style Options</span>
        </button>

        {moreStyleOpen && (
          <div style={{ marginTop: '0.4rem' }}>

            {/* Zone Gap */}
            <div className="cfg-block">
              <div className="section-row" style={{ marginBottom: '0.25rem' }}>
                <span className="field-label">Zone Gap</span>
                <span className="value-pill">{zoneGap}px</span>
              </div>
              <input type="range" min={0} max={60} step={2} value={zoneGap}
                onChange={(e) => onZoneGapChange(Number(e.target.value))}
                className="slider" />
            </div>

            {/* Zone Names */}
            <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.5rem' }}>
              <span className="field-label">Zone Names</span>
              <Toggle on={showNames} onClick={() => onShowNamesChange(!showNames)} />
            </label>

            {/* Zone Icons */}
            <label className="toggle-row cfg-row-gap">
              <span className="field-label">Zone Icons</span>
              <Toggle on={showIcons} onClick={() => onShowIconsChange(!showIcons)} />
            </label>

            {/* Zone Background */}
            <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.5rem' }}>
              <span className="field-label">Background Fill</span>
              <Toggle on={zoneBackground.enabled} onClick={() => onZoneBackgroundChange({ ...zoneBackground, enabled: !zoneBackground.enabled })} />
            </label>
            {zoneBackground.enabled && (
              <>
                <div className="cfg-block" style={{ marginTop: '0.4rem' }}>
                  <div className="section-row" style={{ marginBottom: '0.25rem' }}>
                    <span className="field-label" style={{ fontSize: '0.8rem' }}>Opacity</span>
                    <span className="value-pill" style={{ fontSize: '0.75rem' }}>{Math.round(zoneBackground.opacity * 100)}%</span>
                  </div>
                  <input type="range" min={0} max={1} step={0.01} value={zoneBackground.opacity}
                    onChange={(e) => onZoneBackgroundChange({ ...zoneBackground, opacity: Number(e.target.value) })}
                    className="slider" />
                </div>
                <div className="cfg-block" style={{ marginTop: '0.4rem' }}>
                  <span className="field-label" style={{ fontSize: '0.8rem' }}>Color</span>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '0.2rem' }}>
                    (Default: Overlay Color)
                  </div>
                  <div className="color-row">
                    <div className="color-swatch-wrap">
                      <input type="color" value={zoneBackground.color || overlayColor}
                        onChange={(e) => onZoneBackgroundChange({ ...zoneBackground, color: e.target.value })}
                        className="color-native" />
                      <span className="color-preview" style={{ background: zoneBackground.color || overlayColor }} />
                    </div>
                    {zoneBackground.color && (
                      <button
                        onClick={() => onZoneBackgroundChange({ ...zoneBackground, color: null })}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.5rem',
                          background: 'transparent',
                          border: '1px solid currentColor',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          opacity: 0.6
                        }}>
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Gradient */}
            <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.5rem' }}>
              <span className="field-label">Gradient</span>
              <Toggle on={overlayGradient.enabled} onClick={() => onOverlayGradientChange({ ...overlayGradient, enabled: !overlayGradient.enabled })} />
            </label>
            {overlayGradient.enabled && (
              <>
                <div className="cfg-block" style={{ marginTop: '0.3rem' }}>
                  <span className="field-label" style={{ fontSize: '0.8rem' }}>Type</span>
                  <div className="btn-group" style={{ gap: '0.2rem', marginTop: '0.25rem' }}>
                    {['linear', 'radial', 'conic'].map((type) => (
                      <button key={type}
                        className={`btn-opt ${overlayGradient.type === type ? 'active' : ''}`}
                        onClick={() => onOverlayGradientChange({ ...overlayGradient, type })}
                        style={{ fontSize: '0.7rem', padding: '0.25rem 0.4rem' }}>
                        {type.charAt(0).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {(overlayGradient.type === 'linear' || overlayGradient.type === 'conic') && (
                  <div className="cfg-block" style={{ marginTop: '0.3rem' }}>
                    <div className="section-row" style={{ marginBottom: '0.2rem' }}>
                      <span className="field-label" style={{ fontSize: '0.8rem' }}>Angle</span>
                      <span className="value-pill" style={{ fontSize: '0.7rem' }}>{overlayGradient.angle}°</span>
                    </div>
                    <input type="range" min={0} max={360} step={1} value={overlayGradient.angle}
                      onChange={(e) => onOverlayGradientChange({ ...overlayGradient, angle: Number(e.target.value) })}
                      className="slider" />
                  </div>
                )}

                <div className="cfg-block" style={{ marginTop: '0.3rem' }}>
                  <span className="field-label" style={{ fontSize: '0.8rem' }}>To Color</span>
                  <div className="color-row">
                    <div className="color-swatch-wrap">
                      <input type="color" value={overlayGradient.color2}
                        onChange={(e) => onOverlayGradientChange({ ...overlayGradient, color2: e.target.value })}
                        className="color-native" />
                      <span className="color-preview" style={{ background: overlayGradient.color2 }} />
                    </div>
                    <input type="text" value={overlayGradient.color2}
                      onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                          onOverlayGradientChange({ ...overlayGradient, color2: e.target.value });
                      }}
                      className="color-hex-input" maxLength={7} spellCheck={false} />
                  </div>
                </div>
              </>
            )}

          </div>
        )}

      </AccordionSection>

      {/* ── Edge Runner accordion ────────────────────────────────────────── */}
      <AccordionSection
        label="Edge Runner"
        open={edgeRunnerOpen}
        onToggle={() => setEdgeRunnerOpen(!edgeRunnerOpen)}
        headerRight={
          <Toggle on={edgeRunner.enabled}
            onClick={(e) => {
              e.stopPropagation();
              onEdgeRunnerChange({ ...edgeRunner, enabled: !edgeRunner.enabled });
            }} />
        }>

        {edgeRunner.enabled && (
          <>
            <div className="cfg-block" style={{ marginTop: '0.2rem' }}>
              <div className="section-row" style={{ marginBottom: '0.25rem' }}>
                <span className="field-label">Inset from Edge</span>
                <span className="value-pill">{edgeRunner.inset}px</span>
              </div>
              <input type="range" min={6} max={80} step={2} value={edgeRunner.inset}
                onChange={(e) => onEdgeRunnerChange({ ...edgeRunner, inset: Number(e.target.value) })}
                className="slider" />
            </div>

            <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.5rem' }}>
              <span className="field-label">Pointed Corners</span>
              <Toggle on={edgeRunner.pointed} onClick={() => onEdgeRunnerChange({ ...edgeRunner, pointed: !edgeRunner.pointed })} />
            </label>
          </>
        )}
      </AccordionSection>

      {/* ── Badge Points accordion ────────────────────────────────────────── */}
      <AccordionSection
        label="Badge Points"
        open={pointsOpen}
        onToggle={() => setPointsOpen(!pointsOpen)}>

        <div className="cfg-block">
          <span className="field-label">Shape</span>
          <div className="btn-group">
            {['circle', 'square', 'diamond', 'hexagon'].map((shape) => (
              <button key={shape}
                className={`btn-opt ${pointsStyle.shape === shape ? 'active' : ''}`}
                onClick={() => onPointsStyleChange({ ...pointsStyle, shape })}
                title={shape.charAt(0).toUpperCase() + shape.slice(1)}>
                {shape.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <label className="toggle-row cfg-row-gap" style={{ marginTop: '0.6rem' }}>
          <span className="field-label">Filled</span>
          <Toggle on={pointsStyle.filled} onClick={() => onPointsStyleChange({ ...pointsStyle, filled: !pointsStyle.filled })} />
        </label>
      </AccordionSection>

      {/* ── Rules Text accordion ─────────────────────────────────────────── */}
      <AccordionSection
        label="Rules Text"
        open={rulesOpen}
        onToggle={() => setRulesOpen(!rulesOpen)}
        headerRight={
          <Toggle on={giantTextEnabled}
            onClick={(e) => {
              e.stopPropagation();
              onGiantTextEnabledChange(!giantTextEnabled);
            }} />
        }>

        {giantTextEnabled && (
          <>
            <div className="zone-list" style={{ marginTop: '0.2rem' }}>
              {rulesEntries.map((rule) => (
                <div key={rule.id} className="zone-item open">
                  <div className="zone-header active" style={{ cursor: 'default' }}>
                    <span className="zone-h-name">Rule Entry</span>
                    <button className="zone-del" onClick={() => removeRule(rule.id)} title="Remove rule">✕</button>
                  </div>
                  <div className="zone-body">
                    <div className="cfg-row">
                      <span className="field-label">Zone</span>
                      <select
                        value={rule.zoneId}
                        onChange={(e) => patchRule(rule.id, { zoneId: e.target.value })}
                        className="zone-input"
                      >
                        {ruleZoneOptions.map((z) => (
                          <option key={z.id} value={z.id}>{z.name || z.id}</option>
                        ))}
                      </select>
                    </div>
                    <div className="cfg-row" style={{ marginTop: '0.4rem' }}>
                      <span className="field-label">Preset</span>
                      <select
                        value={rule.templateId || 'blank'}
                        onChange={(e) => applyTemplate(rule.id, e.target.value)}
                        className="zone-input"
                      >
                        {RULE_TEMPLATES.map((t) => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={rule.text}
                      onChange={(e) => patchRule(rule.id, { text: e.target.value })}
                      placeholder="Rules text..."
                      className="zone-textarea"
                      rows={7}
                      style={{ marginTop: '0.5rem' }}
                    />
                    <div className="zone-grid-inputs" style={{ marginTop: '0.5rem' }}>
                      <div className="grid-inp-group">
                        <label>X %</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={Math.round(rule.xPct ?? 3)}
                          onChange={(e) => patchRule(rule.id, { xPct: clampPct(+e.target.value, 3) })}
                          className="num-input small"
                        />
                      </div>
                      <div className="grid-inp-group">
                        <label>Y %</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={Math.round(rule.yPct ?? 6)}
                          onChange={(e) => patchRule(rule.id, { yPct: clampPct(+e.target.value, 6) })}
                          className="num-input small"
                        />
                      </div>
                      <div className="grid-inp-group">
                        <label>W %</label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={Math.round(rule.wPct ?? 94)}
                          onChange={(e) => patchRule(rule.id, { wPct: clampPct(+e.target.value, 94) })}
                          className="num-input small"
                        />
                      </div>
                      <div className="grid-inp-group">
                        <label>H %</label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={Math.round(rule.hPct ?? 88)}
                          onChange={(e) => patchRule(rule.id, { hPct: clampPct(+e.target.value, 88) })}
                          className="num-input small"
                        />
                      </div>
                    </div>
                    <div className="cfg-row" style={{ marginTop: '0.45rem' }}>
                      <span className="field-label">Font Size</span>
                      <input
                        type="number"
                        min={0}
                        max={300}
                        value={rule.fontSize ?? 0}
                        onChange={(e) => patchRule(rule.id, { fontSize: Math.max(0, +e.target.value || 0) })}
                        className="num-input small"
                        style={{ width: '88px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-add-zone" style={{ marginTop: '0.5rem' }} onClick={addRule}>+ Add Rule Entry</button>
          </>
        )}
      </AccordionSection>


      {/* ── Drawing ───────────────────────────────────────────────────── */}
      {hasImage && (
        <div className="sidebar-section">
          <button
            type="button"
            className="collapsible-hd"
            onClick={() => setDrawingOpen(!drawingOpen)}
            aria-expanded={drawingOpen}
          >
            <SectionLabel>Drawing</SectionLabel>
            <span className="collapsible-meta">
              <span className="collapsible-hint">{drawingOpen ? 'Hide' : 'Show'}</span>
              <span className="collapse-arrow">{drawingOpen ? '▾' : '▸'}</span>
            </span>
          </button>

          {drawingOpen && (
            <>
              <div className="tools-grid" style={{ marginTop: '0.5rem' }}>
                {TOOL_DEFS.map((t) => (
                  <button key={t.id}
                    className={`tool-btn ${activeTool === t.id ? 'active' : ''}`}
                    onClick={() => onActiveToolChange(t.id)}>
                    <span className="tool-icon">{t.icon}</span>
                    <span className="tool-label">{t.label}</span>
                  </button>
                ))}
              </div>

              {activeTool !== TOOLS.NONE && (
                <div className="sub-section">
                  <div className="section-row" style={{ marginBottom: '0.3rem' }}>
                    <span className="field-label">Brush Size</span>
                    <span className="value-pill">{brushSize}px</span>
                  </div>
                  <input type="range" min={5} max={200} step={5} value={brushSize}
                    onChange={(e) => onBrushSizeChange(Number(e.target.value))}
                    className="slider" />

                  {activeTool === TOOLS.FADE && (
                    <>
                      <div className="section-row" style={{ margin: '0.6rem 0 0.3rem' }}>
                        <span className="field-label">Fade Strength</span>
                        <span className="value-pill">{Math.round(fadeOpacity * 100)}%</span>
                      </div>
                      <input type="range" min={0.05} max={1} step={0.05} value={fadeOpacity}
                        onChange={(e) => onFadeOpacityChange(Number(e.target.value))}
                        className="slider" />
                    </>
                  )}

                  <button className="btn-clear-mask" onClick={onClearMask}>Reset Erases</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <footer className="sidebar-footer">
        <p>Stirling Mats — unofficial Riftbound mat designer</p>
        <p>Not affiliated with Riot Games</p>
        <p>
          <a href="https://github.com/Frooodle/TCG-Game-Mats" target="_blank" rel="noopener noreferrer" style={{ color: '#c89b3c', textDecoration: 'none' }}>
            GitHub →
          </a>
        </p>
      </footer>
    </aside>
  );
}
