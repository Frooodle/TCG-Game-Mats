import { useState } from 'react';
import { MirroredLayoutSync, clamp } from '../domain/layoutSync';
import IconSelector from './IconSelector';

function newZone(id) {
  return { id, name: '', icon: '', colStart: 1, colSpan: 1, rowStart: 1, rowSpan: 1, text: { content: '', align: 'center', valign: 'middle', color: '', enabled: false, fontSize: 0 } };
}

export default function CustomEditor({ config, onChange, isRiftbound }) {
  const [editingId, setEditingId] = useState(null);
  const [tab, setTab] = useState('zones'); // 'zones' | 'grid'
  const [unlocked, setUnlocked] = useState(false);
  const [scoreTracksOpen, setScoreTracksOpen] = useState(false);

  const { gridCols, gridRows, zones, scoreTrack, scoreTracks } = config;
  const hasAnyScoreTrack = !!scoreTrack || (Array.isArray(config.scoreTracks) && config.scoreTracks.length > 0);
  const isMirrored2P = isRiftbound && MirroredLayoutSync.isMirroredTwoPlayer(zones);
  const editableScoreTracks = Array.isArray(scoreTracks)
    ? scoreTracks
    : (scoreTrack ? [scoreTrack] : []);
  const displayZones = isMirrored2P
    ? zones.filter((z) => !z.id.startsWith('p2_'))
    : zones;

  const patch = (p) => onChange({ ...config, ...p });
  const patchZone = (id, p) => {
    const nextZones = isMirrored2P
      ? MirroredLayoutSync.applyMirroredZonePatch({
        zones,
        sourceZoneId: id,
        patch: p,
        gridCols,
        gridRows,
      })
      : zones.map((zone) => (zone.id === id ? { ...zone, ...p } : zone));
    patch({ zones: nextZones });
  };
  const addZone = () => {
    const id = `z${Date.now()}`;
    patch({ zones: [...zones, newZone(id)] });
    setEditingId(id);
    setTab('zones');
  };

  const removeZone = (id) => {
    patch({ zones: zones.filter((z) => z.id !== id) });
    if (editingId === id) setEditingId(null);
  };

  const toggleScoreTrack = () =>
    patch({ scoreTrack: hasAnyScoreTrack ? null : { count: 9, position: 'left' }, scoreTracks: null });
  const patchScore = (p) =>
    patch({ scoreTrack: { ...scoreTrack, ...p } });
  const patchScoreTrack = (idx, p) => {
    if (!Array.isArray(scoreTracks)) {
      if (idx !== 0 || !scoreTrack) return;
      patch({ scoreTrack: { ...scoreTrack, ...p } });
      return;
    }
    const nextTracks = isMirrored2P
      ? MirroredLayoutSync.applyMirroredScoreTrackPatch({
        scoreTracks,
        editedIndex: idx,
        patch: p,
        canvasWidth: config?.canvas?.width ?? 2450,
      })
      : scoreTracks.map((track, index) => (index === idx ? { ...track, ...p } : track));
    patch({ scoreTracks: nextTracks });
  };

  return (
    <>
      {/* ── Tabs (Grid | Zones) ─────────────────────────────────────── */}
      {!isRiftbound && (
        <div className="sidebar-section" style={{ paddingBottom: '0' }}>
          <div className="editor-tabs">
            <button className={`editor-tab ${tab === 'grid' ? 'active' : ''}`} onClick={() => setTab('grid')}>
              Grid
            </button>
            <button className={`editor-tab ${tab === 'zones' ? 'active' : ''}`} onClick={() => setTab('zones')}>
              Zones
            </button>
          </div>
        </div>
      )}

      {/* ── Grid config ─────────────────────────────────────────────── */}
      {tab === 'grid' && !isRiftbound && (
        <div className="sidebar-section">
          <div className="section-label">Grid Size</div>
          <div className="grid-size-row">
            <div className="grid-size-field">
              <span className="field-label">Cols</span>
              <input type="number" min={1} max={30} value={gridCols}
                onChange={(e) => patch({ gridCols: clamp(+e.target.value, 1, 30) })}
                className="num-input" />
            </div>
            <span className="grid-size-sep">×</span>
            <div className="grid-size-field">
              <span className="field-label">Rows</span>
              <input type="number" min={1} max={12} value={gridRows}
                onChange={(e) => patch({ gridRows: clamp(+e.target.value, 1, 12) })}
                className="num-input" />
            </div>
          </div>

          {/* Mini grid preview */}
          <div className="mini-grid-preview"
            style={{
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gridTemplateRows: `repeat(${gridRows}, 1fr)`,
              aspectRatio: `${config?.canvas?.width ?? 2450}/${config?.canvas?.height ?? 1450}`,
            }}>
            {zones.map((z) => (
              <div key={z.id}
                className={`mini-grid-zone ${editingId === z.id ? 'active' : ''}`}
                style={{ gridColumn: `${z.colStart} / span ${z.colSpan}`, gridRow: `${z.rowStart} / span ${z.rowSpan}` }}
                onClick={() => { setEditingId(editingId === z.id ? null : z.id); setTab('zones'); }}
                title={z.name || 'Zone'}>
                {z.icon || z.name?.charAt(0) || '?'}
              </div>
            ))}
          </div>

          {/* Score track */}
          <div style={{ marginTop: '0.75rem' }}>
            <label className="toggle-row">
              <span className="field-label" style={{ color: 'var(--text)' }}>Score Track</span>
              <div className={`toggle ${hasAnyScoreTrack ? 'on' : ''}`} onClick={toggleScoreTrack}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {scoreTrack && !Array.isArray(config.scoreTracks) && <ScoreCfg scoreTrack={scoreTrack} patchScore={patchScore} />}
          </div>
        </div>
      )}

      {/* ── Riftbound unlock + grid config ──────────────────────────── */}
      {isRiftbound && unlocked && (
        <div className="sidebar-section">
          <div className="section-label">Grid Layout</div>
          <div className="grid-size-row" style={{ marginTop: '0.4rem' }}>
            <div className="grid-size-field">
              <span className="field-label">Cols</span>
              <input type="number" min={1} max={40} value={gridCols}
                onChange={(e) => patch({ gridCols: clamp(+e.target.value, 1, 40) })}
                className="num-input" />
            </div>
            <span className="grid-size-sep">×</span>
            <div className="grid-size-field">
              <span className="field-label">Rows</span>
              <input type="number" min={1} max={12} value={gridRows}
                onChange={(e) => {
                  const r = clamp(+e.target.value, 1, 12);
                  const rh = Array.from({ length: r }, (_, i) => (config.rowHeights?.[i] ?? 33));
                  patch({ gridRows: r, rowHeights: rh });
                }}
                className="num-input" />
            </div>
          </div>
          {config.rowHeights && (
            <div className="row-heights-grid" style={{ marginTop: '0.5rem' }}>
              {config.rowHeights.map((h, i) => (
                <div key={i} className="grid-inp-group">
                  <label>R{i + 1} wt</label>
                  <input type="number" min={1} max={999} value={h}
                    onChange={(e) => {
                      const rh = [...config.rowHeights];
                      rh[i] = Math.max(1, +e.target.value || 1);
                      patch({ rowHeights: rh });
                    }}
                    className="num-input small" />
                </div>
              ))}
            </div>
          )}
          <p className="hint-text" style={{ marginTop: '0.4rem' }}>Row weights are relative — e.g. 40 30 30 means top row is 40% of height.</p>
        </div>
      )}

      {/* ── Zones list ──────────────────────────────────────────────── */}
      {(tab === 'zones' || isRiftbound) && (
        <div className="sidebar-section">
          <div className="section-title-row">
            <span className="section-label">{isRiftbound ? 'Zone Labels & Text' : `Zones (${displayZones.length})`}</span>
            {!isRiftbound && <button className="btn-add-zone" onClick={addZone}>+ Add</button>}
          </div>

          {isRiftbound && (
            <label className="toggle-row" style={{ marginBottom: '0.35rem' }}>
              <span className="field-label">Unlock Layout</span>
              <div className={`toggle sm ${unlocked ? 'on' : ''}`} onClick={() => setUnlocked(!unlocked)}>
                <div className="toggle-thumb" />
              </div>
            </label>
          )}

          <div className="zone-list">
            {displayZones.length === 0 && (
              <p className="zone-empty">No zones yet — click + Add to create one.</p>
            )}
            {displayZones.map((z) => {
              const locked = !!z.locked;
              const isOpen = editingId === z.id;
              return (
                <div key={z.id} className={`zone-item ${isOpen ? 'open' : ''}`}>
                  <div className={`zone-header ${isOpen ? 'active' : ''}`}
                    onClick={() => setEditingId(isOpen ? null : z.id)}>
                    <span className="zone-h-icon">{z.icon || '▣'}</span>
                    <span className="zone-h-name">{z.name || <em style={{ opacity: 0.4 }}>Unnamed</em>}</span>
                    <span className="zone-h-chevron">{isOpen ? '▾' : '▸'}</span>
                    {!locked && (
                      <button className="zone-del"
                        onClick={(e) => { e.stopPropagation(); removeZone(z.id); }}
                        title="Remove zone">✕</button>
                    )}
                  </div>

                  {isOpen && (
                    <div className="zone-body">
                      {/* Name + Icon — one compact row */}
                      <div className="zone-row">
                        <div className="zone-field grow">
                          <label className="field-label">Name</label>
                          <input type="text" value={z.name}
                            onChange={(e) => patchZone(z.id, { name: e.target.value })}
                            placeholder="Zone name" className="zone-input" />
                        </div>
                        <div className="zone-field zone-f-icon">
                          <label className="field-label">Icon</label>
                          <IconSelector
                            value={z.icon}
                            onChange={(icon) => patchZone(z.id, { icon })}
                            zones={zones}
                          />
                        </div>
                      </div>

                      {/* Grid position — 4-column compact strip, hidden for locked zones unless unlocked */}
                      {(!locked || unlocked) && (
                        <div className="zone-grid-inputs">
                          <div className="grid-inp-group">
                            <label>Col</label>
                            <input type="number" min={1} max={gridCols} value={z.colStart}
                              onChange={(e) => patchZone(z.id, { colStart: clamp(+e.target.value, 1, gridCols) })}
                              className="num-input small" />
                          </div>
                          <div className="grid-inp-group">
                            <label>Span</label>
                            <input type="number" min={1} max={gridCols - z.colStart + 1} value={z.colSpan}
                              onChange={(e) => patchZone(z.id, { colSpan: clamp(+e.target.value, 1, gridCols - z.colStart + 1) })}
                              className="num-input small" />
                          </div>
                          <div className="grid-inp-group">
                            <label>Row</label>
                            <input type="number" min={1} max={gridRows} value={z.rowStart}
                              onChange={(e) => patchZone(z.id, { rowStart: clamp(+e.target.value, 1, gridRows) })}
                              className="num-input small" />
                          </div>
                          <div className="grid-inp-group">
                            <label>Span</label>
                            <input type="number" min={1} max={gridRows - z.rowStart + 1} value={z.rowSpan}
                              onChange={(e) => patchZone(z.id, { rowSpan: clamp(+e.target.value, 1, gridRows - z.rowStart + 1) })}
                              className="num-input small" />
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {editableScoreTracks.length > 0 && (
            <div style={{ marginTop: '0.7rem' }}>
              <button
                type="button"
                className="collapsible-hd"
                onClick={() => setScoreTracksOpen(!scoreTracksOpen)}
                aria-expanded={scoreTracksOpen}
              >
                <span className="section-label">Score Tracks</span>
                <span className="collapsible-meta">
                  <span className="collapsible-hint">{scoreTracksOpen ? 'Hide' : 'Show'}</span>
                  <span className="collapse-arrow">{scoreTracksOpen ? '▾' : '▸'}</span>
                </span>
              </button>
              {scoreTracksOpen && (
                <ScoreTracksEditor
                  scoreTracks={editableScoreTracks}
                  patchScoreTrack={patchScoreTrack}
                  mirroredPair={isMirrored2P && editableScoreTracks.length === 2}
                />
              )}
            </div>
          )}

          {/* Score track for Riftbound */}
          {isRiftbound && (
            <div style={{ marginTop: '0.75rem' }}>
              <label className="toggle-row">
                <span className="field-label" style={{ color: 'var(--text)' }}>Score Track</span>
                <div className={`toggle ${hasAnyScoreTrack ? 'on' : ''}`} onClick={toggleScoreTrack}>
                  <div className="toggle-thumb" />
                </div>
              </label>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function ScoreCfg({ scoreTrack, patchScore }) {
  return (
    <div className="score-cfg">
      <div className="cfg-row" style={{ marginTop: '0.5rem' }}>
        <span className="field-label">Count</span>
        <input type="number" min={2} max={20} value={scoreTrack.count}
          onChange={(e) => patchScore({ count: clamp(+e.target.value, 2, 20) })}
          className="num-input small" />
      </div>
      <div className="cfg-row" style={{ marginTop: '0.4rem' }}>
        <span className="field-label">Side</span>
        <div className="btn-group">
          {['left', 'right'].map((p) => (
            <button key={p}
              className={`btn-opt ${scoreTrack.position === p ? 'active' : ''}`}
              onClick={() => patchScore({ position: p })}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreTracksEditor({ scoreTracks, patchScoreTrack, mirroredPair }) {
  const entries = mirroredPair ? [scoreTracks[0]] : scoreTracks;
  return (
    <div style={{ marginTop: '0.45rem' }}>
      <div className="zone-list">
        {entries.map((track, idx) => (
          <div key={`score-track-${idx}`} className="zone-item open">
            <div className="zone-header active" style={{ cursor: 'default' }}>
              <span className="zone-h-name">{mirroredPair ? 'Track (Mirrored Pair)' : `Track ${idx + 1}`}</span>
            </div>
            <div className="zone-body">
              <div className="zone-grid-inputs" style={{ marginTop: 0 }}>
                <div className="grid-inp-group">
                  <label>Count</label>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={track.count ?? 9}
                    onChange={(e) => patchScoreTrack(idx, { count: clamp(+e.target.value, 2, 20) })}
                    className="num-input small"
                  />
                </div>
                <div className="grid-inp-group">
                  <label>Y Start %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={Math.round((track.yStart ?? 0.08) * 100)}
                    onChange={(e) => patchScoreTrack(idx, { yStart: clamp((+e.target.value || 0) / 100, 0, 1) })}
                    className="num-input small"
                  />
                </div>
                <div className="grid-inp-group">
                  <label>Y End %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={Math.round((track.yEnd ?? 0.92) * 100)}
                    onChange={(e) => patchScoreTrack(idx, { yEnd: clamp((+e.target.value || 0) / 100, 0, 1) })}
                    className="num-input small"
                  />
                </div>
                <div className="grid-inp-group">
                  <label>X (px)</label>
                  <input
                    type="number"
                    min={0}
                    max={4096}
                    value={typeof track.x === 'number' ? track.x : ''}
                    placeholder="auto"
                    onChange={(e) => patchScoreTrack(idx, { x: e.target.value === '' ? null : Math.max(0, +e.target.value || 0) })}
                    className="num-input small"
                  />
                </div>
                <div className="grid-inp-group">
                  <label>Orb %</label>
                  <input
                    type="number"
                    min={60}
                    max={200}
                    value={Math.round((track.orbScale ?? 1) * 100)}
                    onChange={(e) => patchScoreTrack(idx, { orbScale: clamp((+e.target.value || 100) / 100, 0.6, 2) })}
                    className="num-input small"
                  />
                </div>
              </div>

              <div className="cfg-row" style={{ marginTop: '0.45rem' }}>
                <span className="field-label">Side</span>
                <div className="btn-group">
                  {['left', 'right', 'center-left', 'center-right'].map((p) => (
                    <button
                      key={`${idx}-${p}`}
                      className={`btn-opt ${track.position === p ? 'active' : ''}`}
                      onClick={() => patchScoreTrack(idx, { position: p, x: null })}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <label className="toggle-row cfg-row-gap">
                <span className="field-label">Upside Down</span>
                <div className={`toggle sm ${track.upsideDown ? 'on' : ''}`} onClick={() => patchScoreTrack(idx, { upsideDown: !track.upsideDown })}>
                  <div className="toggle-thumb" />
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
