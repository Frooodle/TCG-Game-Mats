export const MAT_W = 2450;
export const MAT_H = 1450;

// ─── Score track geometry ─────────────────────────────────────────────────────
const SCORE_CX    = 52;
const SCORE_R_MAX = 38;
const SCORE_STEP  = 140;
const SIDE_SCORE_PAD = 75;

// ─── Presets ──────────────────────────────────────────────────────────────────
function mkZoneText() { return { content: '', align: 'center', valign: 'middle', color: '', enabled: false, fontSize: 0 }; }

const RIFTBOUND_1P_WITH_BATTLEFIELD = {
  canvas: { width: MAT_W, height: MAT_H },
  gridCols: 30,
  gridRows: 3,
  rowHeights: [40, 30, 30],
  zones: [
    { id: 'bf1',       name: 'Battlefield', icon: '⚔', colStart:  1, colSpan: 14, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'bf2',       name: 'Battlefield', icon: '⚔', colStart: 17, colSpan: 14, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'champion',  name: 'Champion',    icon: '♟', colStart:  1, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'legend',    name: 'Legend',      icon: '✦', colStart:  5, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'base',      name: 'Base',        icon: '',  colStart:  9, colSpan: 18, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'main_deck', name: 'Main Deck',   icon: '▣', colStart: 27, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'rune_deck', name: 'Rune Deck',   icon: '◈', colStart:  1, colSpan:  4, rowStart: 3, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'runes',     name: 'Runes',       icon: '',  colStart:  5, colSpan: 22, rowStart: 3, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'trash',     name: 'Trash',       icon: '✕', colStart: 27, colSpan:  4, rowStart: 3, rowSpan: 1, locked: true, text: mkZoneText() },
  ],
  scoreTrack: { count: 9, position: 'left' },
};

const RIFTBOUND_1P_NO_BATTLEFIELD = {
  canvas: { width: MAT_W, height: MAT_H },
  gridCols: 24,
  gridRows: 2,
  rowHeights: [52, 48],
  zones: [
    { id: 'champion',  name: 'Champion',    icon: '♟', colStart:  1, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'legend',    name: 'Legend',      icon: '✦', colStart:  5, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'base',      name: 'Base',        icon: '',  colStart:  9, colSpan: 12, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'main_deck', name: 'Main Deck',   icon: '▣', colStart: 21, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'rune_deck', name: 'Rune Deck',   icon: '◈', colStart:  1, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'runes',     name: 'Runes',       icon: '',  colStart:  5, colSpan: 16, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'trash',     name: 'Trash',       icon: '✕', colStart: 21, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, text: mkZoneText() },
  ],
  scoreTrack: { count: 9, position: 'left' },
};

const RIFTBOUND_2P_WITH_BATTLEFIELD = {
  canvas: { width: 2040, height: 2040 },
  gridCols: 30,
  gridRows: 7,
  rowHeights: [16, 16, 7, 14, 7, 16, 16],
  zones: [
    { id: 'p1_rune_deck', name: 'Rune Deck', icon: '◈', colStart: 27, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_runes',     name: 'Runes',     icon: '',  colStart:  5, colSpan: 22, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_trash',     name: 'Trash',     icon: '✕', colStart:  1, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_champion',  name: 'Champion',  icon: '♟', colStart: 27, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_legend',    name: 'Legend',    icon: '✦', colStart: 23, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_base',      name: 'Base',      icon: '',  colStart:  5, colSpan: 18, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_main_deck', name: 'Main Deck', icon: '▣', colStart:  1, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_bf',        name: 'Battlefield', icon: '⚔', colStart:  1, colSpan: 13, rowStart: 3, rowSpan: 3, locked: true, text: mkZoneText() },
    { id: 'p2_bf',        name: 'Battlefield', icon: '⚔', colStart: 18, colSpan: 13, rowStart: 3, rowSpan: 3, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p2_champion',  name: 'Champion',  icon: '♟', colStart:  1, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_legend',    name: 'Legend',    icon: '✦', colStart:  5, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_base',      name: 'Base',      icon: '',  colStart:  9, colSpan: 18, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_main_deck', name: 'Main Deck', icon: '▣', colStart: 27, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_rune_deck', name: 'Rune Deck', icon: '◈', colStart:  1, colSpan:  4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_runes',     name: 'Runes',     icon: '',  colStart:  5, colSpan: 22, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_trash',     name: 'Trash',     icon: '✕', colStart: 27, colSpan:  4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
  ],
  scoreTracks: [
    { count: 9, position: 'center-right', yStart: 0.39, yEnd: 0.62, upsideDown: true, name: '', orbScale: 0.95 },
    { count: 9, position: 'center-left',  yStart: 0.39, yEnd: 0.62, name: '', orbScale: 0.95 },
  ],
};

const RIFTBOUND_2P_BATTLEFIELD_ALT = {
  canvas: { width: 2040, height: 2040 },
  gridCols: 30,
  gridRows: 7,
  rowHeights: [16, 16, 7, 14, 7, 16, 16],
  zones: [
    { id: 'p1_rune_deck', name: 'Rune Deck', icon: '◈', colStart: 27, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_runes',     name: 'Runes',     icon: '',  colStart:  5, colSpan: 22, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_trash',     name: 'Trash',     icon: '✕', colStart:  1, colSpan:  4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_hero',      name: 'Hero',      icon: '♟', colStart: 27, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_legend',    name: 'Legend',    icon: '✦', colStart: 23, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_base',      name: 'Base',      icon: '',  colStart:  5, colSpan: 18, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_main_deck', name: 'Main Deck', icon: '▣', colStart:  1, colSpan:  4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_bf',        name: 'Battlefield', icon: '⚔', colStart: 16, colSpan: 15, rowStart: 3, rowSpan: 3, locked: true, upsideDown: true, text: mkZoneText() },

    { id: 'p2_bf',        name: 'Battlefield', icon: '⚔', colStart:  1, colSpan: 15, rowStart: 3, rowSpan: 3, locked: true, text: mkZoneText() },
    { id: 'p2_hero',      name: 'Hero',      icon: '♟', colStart:  1, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_legend',    name: 'Legend',    icon: '✦', colStart:  5, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_base',      name: 'Base',      icon: '',  colStart:  9, colSpan: 18, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_main_deck', name: 'Main Deck', icon: '▣', colStart: 27, colSpan:  4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_rune_deck', name: 'Rune Deck', icon: '◈', colStart:  1, colSpan:  4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_runes',     name: 'Runes',     icon: '',  colStart:  5, colSpan: 22, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_trash',     name: 'Trash',     icon: '✕', colStart: 27, colSpan:  4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
  ],
  scoreTracks: [
    { count: 9, position: 'right', yStart: 0.04, yEnd: 0.33, upsideDown: true, name: '', edgeRunnerXShift: 5, orbScale: 0.95 },
    { count: 9, position: 'left', yStart: 0.67, yEnd: 0.96, name: '', edgeRunnerXShift: 5, orbScale: 0.95 },
  ],
};

const RIFTBOUND_2P_BATTLEFIELD_ALT_2 = {
  canvas: { width: 2040, height: 2040 },
  gridCols: 30,
  gridRows: 7,
  rowHeights: [16, 16, 7, 14, 7, 16, 16],
  zones: [
    { id: 'p1_rune_deck', name: 'Rune Deck', icon: '◈', colStart: 27, colSpan: 4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_runes', name: 'Runes', icon: '', colStart: 5, colSpan: 22, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_trash', name: 'Trash', icon: '✕', colStart: 1, colSpan: 4, rowStart: 1, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_champion', name: 'Champion', icon: '♟', colStart: 27, colSpan: 4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_legend', name: 'Legend', icon: '✦', colStart: 23, colSpan: 4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_base', name: 'Base', icon: '', colStart: 5, colSpan: 18, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_main_deck', name: 'Main Deck', icon: '▣', colStart: 1, colSpan: 4, rowStart: 2, rowSpan: 1, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p1_bf', name: 'Battlefield', icon: '⚔', colStart: 1, colSpan: 12, rowStart: 3, rowSpan: 3, locked: true, text: mkZoneText() },
    { id: 'p2_bf', name: 'Battlefield', icon: '⚔', colStart: 19, colSpan: 12, rowStart: 3, rowSpan: 3, locked: true, upsideDown: true, text: mkZoneText() },
    { id: 'p2_champion', name: 'Champion', icon: '♟', colStart: 1, colSpan: 4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_legend', name: 'Legend', icon: '✦', colStart: 5, colSpan: 4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_base', name: 'Base', icon: '', colStart: 9, colSpan: 18, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_main_deck', name: 'Main Deck', icon: '▣', colStart: 27, colSpan: 4, rowStart: 6, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_rune_deck', name: 'Rune Deck', icon: '◈', colStart: 1, colSpan: 4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_runes', name: 'Runes', icon: '', colStart: 5, colSpan: 22, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
    { id: 'p2_trash', name: 'Trash', icon: '✕', colStart: 27, colSpan: 4, rowStart: 7, rowSpan: 1, locked: true, text: mkZoneText() },
  ],
  scoreTracks: [
    {
      position: 'center-left',
      orbScale: 1.1,
      yEnd: 0.59,
      points: [
        { xPct: 0.44, yPct: 0.78, label: 3 },
        { xPct: 0.48, yPct: 0.78, label: 2 },
        { xPct: 0.52, yPct: 0.78, label: 1 },
        { xPct: 0.56, yPct: 0.78, label: 0 },
        { xPct: 0.44, yPct: 0.72, label: 7 },
        { xPct: 0.48, yPct: 0.72, label: 6 },
        { xPct: 0.52, yPct: 0.72, label: 5 },
        { xPct: 0.56, yPct: 0.72, label: 4 },
      ],
    },
    {
      position: 'center-left',
      orbScale: 1.1,
      upsideDown: true,
      yEnd: 0.41,
      points: [
        { xPct: 0.44, yPct: 0.48, label: 4 },
        { xPct: 0.48, yPct: 0.48, label: 5 },
        { xPct: 0.52, yPct: 0.48, label: 6 },
        { xPct: 0.56, yPct: 0.48, label: 7 },
        { xPct: 0.44, yPct: 0.42, label: 0 },
        { xPct: 0.48, yPct: 0.42, label: 1 },
        { xPct: 0.52, yPct: 0.42, label: 2 },
        { xPct: 0.56, yPct: 0.42, label: 3 },
      ],
    },
    {
      count: 1,
      startValue: 8,
      x: 1020,
      yStart: 0.41,
      yEnd: 0.41,
      orbScale: 1.5,
    },
  ],
};

export const RIFTBOUND_LAYOUTS = [
  { id: '1p-with-battlefield', label: '1P Battlefield', config: RIFTBOUND_1P_WITH_BATTLEFIELD },
  { id: '1p-no-battlefield', label: '1P No Battlefield', config: RIFTBOUND_1P_NO_BATTLEFIELD },
  { id: '2p-with-battlefield', label: '2P Battlefield', config: RIFTBOUND_2P_WITH_BATTLEFIELD },
  { id: '2p-battlefield-alt', label: '2P Battlefield Alt', config: RIFTBOUND_2P_BATTLEFIELD_ALT },
  { id: '2p-battlefield-alt-2', label: '2P Battlefield Alt 2', config: RIFTBOUND_2P_BATTLEFIELD_ALT_2 },
];

function cloneConfig(config) {
  return JSON.parse(JSON.stringify(config));
}

export function getRiftboundPreset(layoutId = '1p-with-battlefield') {
  const layout = RIFTBOUND_LAYOUTS.find((entry) => entry.id === layoutId) ?? RIFTBOUND_LAYOUTS[0];
  return cloneConfig(layout.config);
}

export const RIFTBOUND_PRESET = getRiftboundPreset('1p-with-battlefield');

export const DEFAULT_CUSTOM_CONFIG = {
  canvas: { width: MAT_W, height: MAT_H },
  gridCols: 4,
  gridRows: 3,
  zones: [
    { id: 'z1', name: 'Zone 1', icon: '▣', colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 1, text: mkZoneText() },
    { id: 'z2', name: 'Zone 2', icon: '◌', colStart: 3, colSpan: 2, rowStart: 1, rowSpan: 1, text: mkZoneText() },
    { id: 'z3', name: 'Zone 3', icon: '✦', colStart: 1, colSpan: 1, rowStart: 2, rowSpan: 2, text: mkZoneText() },
    { id: 'z4', name: 'Zone 4', icon: '◈', colStart: 2, colSpan: 2, rowStart: 2, rowSpan: 2, text: mkZoneText() },
    { id: 'z5', name: 'Zone 5', icon: '⚔', colStart: 4, colSpan: 1, rowStart: 2, rowSpan: 2, text: mkZoneText() },
  ],
  scoreTrack: null,
};

// ─── Drawing helpers ──────────────────────────────────────────────────────────

function rr(ctx, x, y, w, h, r = 12) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);    ctx.arcTo(x + w, y,     x + w, y + r,     r);
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);    ctx.arcTo(x,     y + h, x,     y + h - r, r);
    ctx.lineTo(x, y + r);         ctx.arcTo(x,     y,     x + r, y,         r);
    ctx.closePath();
  }
}

function corners(ctx, x, y, w, h, rounded) {
  const L = Math.min(w, h) * 0.18;
  const r = rounded ? Math.min(L * 0.35, 10) : 0;
  ctx.beginPath();
  if (r > 0) {
    ctx.moveTo(x + L, y);         ctx.lineTo(x + r, y);         ctx.arcTo(x, y, x, y + r, r);             ctx.lineTo(x, y + L);
    ctx.moveTo(x + w - L, y);     ctx.lineTo(x + w - r, y);     ctx.arcTo(x + w, y, x + w, y + r, r);     ctx.lineTo(x + w, y + L);
    ctx.moveTo(x + w, y + h - L); ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + w - L, y + h);
    ctx.moveTo(x + L, y + h);     ctx.lineTo(x + r, y + h);     ctx.arcTo(x, y + h, x, y + h - r, r);     ctx.lineTo(x, y + h - L);
  } else {
    ctx.moveTo(x + L, y);     ctx.lineTo(x, y);     ctx.lineTo(x, y + L);
    ctx.moveTo(x + w - L, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + L);
    ctx.moveTo(x + w, y + h - L); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - L, y + h);
    ctx.moveTo(x + L, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - L);
  }
  ctx.stroke();
}

// When mirrored: apply extra scale(-1,1) then negate x so text reads correctly.
function iconLabel(ctx, icon, name, x, y, w, h, iconSz, nameSz, showIcons, showNames, mirrored) {
  const effIcon = showIcons ? icon : '';
  const effName = showNames ? name : '';
  if (!effIcon && !effName) return;
  ctx.save();
  if (mirrored) ctx.scale(-1, 1);
  const cx = mirrored ? -(x + w / 2) : x + w / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const midY = y + h / 2;
  if (effIcon) {
    ctx.font = `${iconSz}px serif`;
    ctx.globalAlpha = 0.8;
    ctx.fillText(effIcon, cx, effName ? midY - nameSz * 0.65 : midY);
  }
  if (effName) {
    ctx.font = `bold ${nameSz}px 'Funnel Sans','Inter',system-ui,sans-serif`;
    ctx.globalAlpha = 1;
    ctx.fillText(effName, cx, effIcon ? midY + iconSz * 0.45 : midY);
  }
  ctx.restore();
}

// ─── Zone primitive ───────────────────────────────────────────────────────────
//
// opts = { borderStyle, rounded, showIcons, showNames }

function drawZonePrimitive(ctx, x, y, w, h, zone, opts, mirrored) {
  const { borderStyle = 'full', rounded = true, showIcons = true, showNames = true } = opts;
  const { name = '', icon = '' } = zone;
  const isSmall = w < 400 && h < 500;
  const iconSz  = isSmall ? 42 : 56;
  const nameSz  = isSmall ? 26 : 34;

  if (borderStyle === 'full') {
    if (rounded) {
      rr(ctx, x, y, w, h, 14);
    } else {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
    }
    ctx.save(); ctx.globalAlpha = 0.07; ctx.fill(); ctx.restore();
    ctx.stroke();
  } else if (borderStyle === 'corners') {
    corners(ctx, x, y, w, h, rounded);
  }
  // 'none' → no border drawn

  iconLabel(ctx, icon, name, x, y, w, h, iconSz, nameSz, showIcons, showNames, mirrored);
}

function withZoneRotation(ctx, zone, x, y, w, h, fn) {
  if (!zone?.upsideDown) {
    fn();
    return;
  }
  const cx = x + w / 2;
  const cy = y + h / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI);
  ctx.translate(-cx, -cy);
  fn();
  ctx.restore();
}

// ─── Giant zone text ──────────────────────────────────────────────────────────

function wrapText(ctx, text, maxW) {
  const lines = [];
  for (const para of text.split('\n')) {
    if (para === '') { lines.push(''); continue; }
    const words = para.split(/\s+/);
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(test).width <= maxW) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

function drawTextInRect(ctx, x, y, w, h, textCfg, mirrored) {
  if (!textCfg?.enabled || !textCfg?.content) return;

  ctx.save();
  if (mirrored) ctx.scale(-1, 1);

  const padX = Math.max(16, w * 0.05);
  const padY = Math.max(16, h * 0.08);
  const maxW = w - padX * 2;
  const maxH = h - padY * 2;

  const requestedSize = textCfg.fontSize > 0 ? textCfg.fontSize : Math.min(w * 0.12, h * 0.55, 110);
  let fontSize = Math.max(10, requestedSize);
  let lines = [];
  let lineH = 0;
  let emptyLineH = 0;
  let totalH = 0;

  const layoutAtSize = (size) => {
    ctx.font = `bold ${size}px 'Funnel Sans','Inter',system-ui,sans-serif`;
    const ls = wrapText(ctx, textCfg.content, maxW);
    const lh = size * 1.08;
    const elh = size * 0.55;
    let th = 0;
    let maxLine = 0;
    ls.forEach((line) => {
      if (line === '') {
        th += elh;
      } else {
        th += lh;
        maxLine = Math.max(maxLine, ctx.measureText(line).width);
      }
    });
    return { ls, lh, elh, th, maxLine };
  };

  let fitted = layoutAtSize(fontSize);
  while (fontSize > 10 && (fitted.th > maxH || fitted.maxLine > maxW)) {
    fontSize = Math.max(10, fontSize * 0.94);
    fitted = layoutAtSize(fontSize);
  }
  ({ ls: lines, lh: lineH, elh: emptyLineH, th: totalH } = fitted);

  if (textCfg.color) ctx.fillStyle = textCfg.color;
  ctx.globalAlpha = 0.92;
  ctx.textBaseline = 'top';
  const align = textCfg.align || 'center';
  ctx.textAlign = align;

  let tx;
  if (mirrored) {
    if (align === 'left')       tx = -(x + w - padX);
    else if (align === 'right') tx = -(x + padX);
    else                        tx = -(x + w / 2);
  } else {
    if (align === 'left')       tx = x + padX;
    else if (align === 'right') tx = x + w - padX;
    else                        tx = x + w / 2;
  }

  const valign = textCfg.valign || 'middle';
  let startY;
  if (valign === 'top')         startY = y + padY;
  else if (valign === 'bottom') startY = y + h - padY - totalH;
  else                          startY = y + (h - totalH) / 2;
  let cy = startY;
  lines.forEach((line) => {
    if (line === '') {
      cy += emptyLineH;
      return;
    }
    ctx.fillText(line, tx, cy);
    cy += lineH;
  });
  ctx.restore();
}

function drawZoneTexts(ctx, x, y, w, h, zone, mirrored) {
  const entries = Array.isArray(zone.textEntries)
    ? zone.textEntries
    : (zone.text ? [zone.text] : []);

  if (!entries.length) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  entries.forEach((entry) => {
    const xPct = clamp01((entry.xPct ?? 0) / 100);
    const yPct = clamp01((entry.yPct ?? 0) / 100);
    const wPct = clamp01((entry.wPct ?? 100) / 100);
    const hPct = clamp01((entry.hPct ?? 100) / 100);
    const ex = x + w * xPct;
    const ey = y + h * yPct;
    const ew = Math.max(8, w * wPct);
    const eh = Math.max(8, h * hPct);
    drawTextInRect(ctx, ex, ey, ew, eh, entry, mirrored);
  });
  ctx.restore();
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// ─── Score track ──────────────────────────────────────────────────────────────

function drawScoreTrack(ctx, scoreTrack, mirrored, matSize, options = {}) {
  const { width: matW, height: matH } = matSize;
  const hasOwn = (key) => Object.prototype.hasOwnProperty.call(scoreTrack, key);
  const {
    count = 9,
    startValue = 0,
    points = null,
    position = 'left',
    yStart = 0.08,
    yEnd = 0.92,
    x = null,
    upsideDown = false,
    name = '',
    edgeRunnerXShift = 0,
    orbScale = 1,
  } = scoreTrack;
  const edgeInset = options.edgeRunner?.enabled ? (options.edgeRunner.inset ?? 18) : 0;
  const sideInnerPad = 30 + SIDE_SCORE_PAD;
  const sideLane = (side) => {
    if (side === 'left') {
      const outer = edgeInset;
      const inner = sideInnerPad;
      return { outer, inner, cx: (outer + inner) / 2, width: Math.max(24, inner - outer) };
    }
    const outer = matW - edgeInset;
    const inner = matW - sideInnerPad;
    return { outer, inner, cx: (outer + inner) / 2, width: Math.max(24, outer - inner) };
  };

  const posToCx = () => {
    if (typeof x === 'number') return x;
    if (position === 'left') return sideLane('left').cx;
    if (position === 'right') return sideLane('right').cx;
    if (position === 'center-left') return matW * 0.47;
    if (position === 'center-right') return matW * 0.53;
    return SCORE_CX;
  };
  let cx = posToCx();
  if (mirrored) cx = matW - cx;
  if (options.edgeRunner?.enabled && edgeRunnerXShift) cx += edgeRunnerXShift;

  const drawOrb = (ox, oy, label) => {
    const baseR = Math.max(11, Math.min(SCORE_R_MAX, 26 * (orbScale || 1)));
    const r = Math.max(11, Math.min(SCORE_R_MAX, baseR));
    ctx.beginPath();
    ctx.arc(ox, oy, r, 0, Math.PI * 2);
    ctx.save(); ctx.globalAlpha = 0.12; ctx.fill(); ctx.restore();
    ctx.stroke();
    ctx.save();
    ctx.font = `bold ${Math.round(r * 0.9)}px 'Funnel Sans','Inter',system-ui,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.85;
    if (upsideDown) {
      ctx.translate(ox, oy);
      ctx.rotate(Math.PI);
      ctx.translate(-ox, -oy);
    }
    if (mirrored) { ctx.scale(-1, 1); ctx.fillText(String(label), -ox, oy); }
    else ctx.fillText(String(label), ox, oy);
    ctx.restore();
  };

  if (Array.isArray(points) && points.length > 0) {
    // For custom point layouts, allow editor controls to move the whole cluster.
    // X uses absolute pixels; Y Start/Y End define a target center line.
    const resolved = points.map((point) => {
      const px = typeof point?.xPct === 'number'
        ? matW * clamp01(point.xPct)
        : (typeof point?.x === 'number' ? point.x : cx);
      const py = typeof point?.yPct === 'number'
        ? matH * clamp01(point.yPct)
        : (typeof point?.y === 'number' ? point.y : matH * 0.5);
      return { px, py, label: point?.label };
    });

    const baseCx = resolved.reduce((sum, p) => sum + p.px, 0) / resolved.length;
    const baseCy = resolved.reduce((sum, p) => sum + p.py, 0) / resolved.length;
    const targetCx = hasOwn('x') && typeof x === 'number' ? x : baseCx;

    let targetCy = baseCy;
    if (hasOwn('yStart') && hasOwn('yEnd')) targetCy = matH * ((yStart + yEnd) / 2);
    else if (hasOwn('yStart')) targetCy = matH * yStart;
    else if (hasOwn('yEnd')) targetCy = matH * yEnd;

    const dx = targetCx - baseCx;
    const dy = targetCy - baseCy;

    resolved.forEach((point, i) => {
      const oxBase = point.px + dx;
      const oy = point.py + dy;
      const ox = mirrored ? (matW - oxBase) : oxBase;
      const label = point.label ?? (startValue + i);
      drawOrb(ox, oy, label);
    });
    return;
  }

  const yA = matH * yStart;
  const yB = matH * yEnd;
  const yMin = Math.min(yA, yB);
  const yMax = Math.max(yA, yB);
  const totalAvail = Math.max(20, yMax - yMin);
  const step = Math.min(SCORE_STEP, totalAvail / Math.max(1, count - 1));
  const baseR = Math.max(11, Math.min(SCORE_R_MAX, step * 0.42));
  let r = Math.max(11, Math.min(SCORE_R_MAX, baseR * (orbScale || 1)));
  if (typeof x !== 'number' && (position === 'left' || position === 'right')) {
    const lane = sideLane(position);
    const maxByLane = Math.max(11, lane.width / 2 - 4);
    r = Math.min(r, maxByLane);
  }
  const totalH = (count - 1) * step;
  const startY = count <= 1
    ? (yMin + yMax) / 2
    : (yMin + Math.max(0, (totalAvail - totalH) / 2));

  for (let i = 0; i < count; i++) {
    const index = upsideDown ? i : (count - 1 - i);
    const cy = startY + index * step;
    const labelValue = startValue + i;
    drawOrb(cx, cy, labelValue);
  }

  if (name) {
    const labelY = (yMin + yMax) / 2;
    let labelX = cx;
    let align = 'center';

    if (position === 'left') {
      labelX = cx + 26;
      align = 'left';
    } else if (position === 'right') {
      labelX = cx - 26;
      align = 'right';
    }

    ctx.save();
    if (upsideDown) {
      ctx.translate(labelX, labelY);
      ctx.rotate(Math.PI);
      ctx.translate(-labelX, -labelY);
    }
    if (mirrored) {
      ctx.scale(-1, 1);
      labelX = -labelX;
      if (align === 'left') align = 'right';
      else if (align === 'right') align = 'left';
    }
    ctx.font = `bold 20px 'Funnel Sans','Inter',system-ui,sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.9;
    ctx.fillText(name, labelX, labelY);
    ctx.restore();
  }
}

// ─── Outer border / Edge Runner ───────────────────────────────────────────────

function drawOuterBorder(ctx, opts) {
  const { edgeRunner } = opts;
  const { width: matW, height: matH } = opts.matSize;
  if (!edgeRunner?.enabled) return;

  const inset   = edgeRunner.inset   ?? 18;
  const pointed = edgeRunner.pointed ?? false;
  const x = inset, y = inset;
  const w = matW - inset * 2;
  const h = matH - inset * 2;

  ctx.save();
  ctx.lineWidth   = 3.5;
  ctx.globalAlpha = 0.4;

  if (pointed) {
    const c = Math.min(50, Math.min(w, h) * 0.04);
    ctx.beginPath();
    ctx.moveTo(x + c, y);
    ctx.lineTo(x + w - c, y);
    ctx.lineTo(x + w, y + c);
    ctx.lineTo(x + w, y + h - c);
    ctx.lineTo(x + w - c, y + h);
    ctx.lineTo(x + c, y + h);
    ctx.lineTo(x, y + h - c);
    ctx.lineTo(x, y + c);
    ctx.closePath();
    ctx.stroke();
  } else {
    rr(ctx, x, y, w, h, 28);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── Mirror transform ─────────────────────────────────────────────────────────

function applyMirror(ctx, matW) {
  ctx.translate(matW, 0);
  ctx.scale(-1, 1);
}

// ─── Main layout renderer ─────────────────────────────────────────────────────
//
// options = {
//   borderStyle:      'full' | 'corners' | 'none'
//   rounded:          boolean
//   showNames:        boolean
//   showIcons:        boolean
//   giantTextEnabled: boolean
//   mirrored:         boolean
// }

function drawLayout(ctx, config, options) {
  const { width: matW, height: matH } = options.matSize;
  const { gridCols, gridRows, zones, scoreTrack, scoreTracks, rowHeights } = config;
  const {
    borderStyle     = 'full',
    rounded         = true,
    showNames       = true,
    showIcons       = true,
    giantTextEnabled = true,
    mirrored        = false,
    zoneGap         = 20,
  } = options;

  const tracks = Array.isArray(scoreTracks) && scoreTracks.length > 0
    ? scoreTracks
    : (scoreTrack ? [scoreTrack] : []);

  const areaY = 30;
  const areaH = matH - 60;
  const gap   = zoneGap;

  // Variable row heights
  let rowYStarts, rowHArr;
  if (rowHeights && rowHeights.length === gridRows) {
    const total = rowHeights.reduce((s, v) => s + v, 0);
    rowHArr    = rowHeights.map((v) => (v / total) * areaH);
    rowYStarts = [];
    let y = areaY;
    for (const h of rowHArr) { rowYStarts.push(y); y += h; }
  } else {
    const cellH = areaH / gridRows;
    rowHArr    = Array.from({ length: gridRows }, () => cellH);
    rowYStarts = Array.from({ length: gridRows }, (_, i) => areaY + i * cellH);
  }

  const zoneOpts = { borderStyle, rounded, showIcons, showNames };

  const sideForTrack = (track) => {
    if (!track || (track.position !== 'left' && track.position !== 'right')) return null;
    if (!mirrored) return track.position;
    return track.position === 'left' ? 'right' : 'left';
  };

  const overlapsScoreTrackY = (track, zoneY0, zoneY1) => {
    const tStart = (track.yStart ?? 0.08) * matH;
    const tEnd = (track.yEnd ?? 0.92) * matH;
    const a0 = Math.min(tStart, tEnd);
    const a1 = Math.max(tStart, tEnd);
    return zoneY0 < a1 && zoneY1 > a0;
  };

  zones.forEach((zone) => {
    const r0 = zone.rowStart - 1;
    const zy = rowYStarts[r0] + gap / 2;
    const zh = rowHArr.slice(r0, r0 + zone.rowSpan).reduce((s, v) => s + v, 0) - gap;
    const zoneY0 = zy;
    const zoneY1 = zy + zh;

    let padL = 30;
    let padR = 30;
    tracks.forEach((track) => {
      if (!overlapsScoreTrackY(track, zoneY0, zoneY1)) return;
      const side = sideForTrack(track);
      if (side === 'left') padL = 30 + SIDE_SCORE_PAD;
      if (side === 'right') padR = 30 + SIDE_SCORE_PAD;
    });

    const areaX = padL;
    const areaW = matW - padL - padR;
    const cellW = areaW / gridCols;
    const zx = areaX + (zone.colStart - 1) * cellW + gap / 2;
    const zw = zone.colSpan * cellW - gap;

    withZoneRotation(ctx, zone, zx, zy, zw, zh, () => {
      drawZonePrimitive(ctx, zx, zy, zw, zh, zone, zoneOpts, mirrored);
      if (giantTextEnabled) {
        drawZoneTexts(ctx, zx, zy, zw, zh, zone, mirrored);
      }
    });
  });

  tracks.forEach((track) => drawScoreTrack(ctx, { ...track, name: showNames ? (track.name || '') : '' }, mirrored, options.matSize, options));
}

// ─── Public API ───────────────────────────────────────────────────────────────
//
// drawOverlay(ctx, color, config, options)
//
// options = { borderStyle, rounded, showNames, showIcons, giantTextEnabled, mirrored,
//             zoneGap, edgeRunner: { enabled, inset, pointed } }

export function drawOverlay(ctx, color, config, options = {}) {
  const matSize = getMatSize(config);
  ctx.clearRect(0, 0, matSize.width, matSize.height);
  ctx.save();

  const { mirrored = false } = options;

  ctx.strokeStyle = color;
  ctx.fillStyle   = color;
  ctx.lineWidth   = 3;
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';

  if (mirrored) applyMirror(ctx, matSize.width);

  drawOuterBorder(ctx, { ...options, matSize });
  drawLayout(ctx, config, { ...options, matSize });

  ctx.restore();
}

export function createOverlayCanvas(color, config, options) {
  const matSize = getMatSize(config);
  const oc = document.createElement('canvas');
  oc.width  = matSize.width;
  oc.height = matSize.height;
  drawOverlay(oc.getContext('2d'), color, config, options);
  return oc;
}

export function getMatSize(config) {
  const width = config?.canvas?.width ?? MAT_W;
  const height = config?.canvas?.height ?? MAT_H;
  return { width, height };
}
