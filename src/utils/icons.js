// ─── Icon Registry & Management ────────────────────────────────────────────

// Common preset icons (categorized)
export const ICON_PRESETS = {
  // Card Game Icons
  sword: { id: 'sword', label: 'Sword', icon: '⚔' },
  shield: { id: 'shield', label: 'Shield', icon: '🛡' },
  crown: { id: 'crown', label: 'Crown', icon: '👑' },
  star: { id: 'star', label: 'Star', icon: '✦' },

  // Deck & Cards
  cards: { id: 'cards', label: 'Cards', icon: '▣' },
  gem: { id: 'gem', label: 'Gem', icon: '◈' },
  diamond: { id: 'diamond', label: 'Diamond', icon: '◆' },
  circle: { id: 'circle', label: 'Circle', icon: '●' },

  // Game Pieces
  pawn: { id: 'pawn', label: 'Pawn', icon: '♟' },
  rook: { id: 'rook', label: 'Rook', icon: '♜' },
  knight: { id: 'knight', label: 'Knight', icon: '♞' },
  bishop: { id: 'bishop', label: 'Bishop', icon: '♝' },

  // Actions
  trash: { id: 'trash', label: 'Trash', icon: '✕' },
  x: { id: 'x', label: 'X', icon: '✗' },
  check: { id: 'check', label: 'Check', icon: '✔' },
  plus: { id: 'plus', label: 'Plus', icon: '+' },

  // Symbols
  fire: { id: 'fire', label: 'Fire', icon: '🔥' },
  water: { id: 'water', label: 'Water', icon: '💧' },
  leaf: { id: 'leaf', label: 'Leaf', icon: '🍃' },
  gear: { id: 'gear', label: 'Gear', icon: '⚙' },

  // Empty/Blank
  empty: { id: 'empty', label: 'Empty', icon: '' },
};

// Get all icons as a flat array
export function getAllIcons() {
  return Object.values(ICON_PRESETS);
}

// Extract unique icons used in zones
export function getUsedIcons(zones = []) {
  const used = new Set();
  zones.forEach((zone) => {
    if (zone.icon) {
      used.add(zone.icon);
    }
  });
  return Array.from(used);
}

// Get recently used icons (from zones + presets)
export function getIconSuggestions(zones = []) {
  const usedIcons = getUsedIcons(zones);
  const suggestions = [];

  // Add recently used icons (not from presets)
  usedIcons.forEach((icon) => {
    if (icon && !Object.values(ICON_PRESETS).find((p) => p.icon === icon)) {
      suggestions.push({
        id: `custom-${icon}`,
        label: `${icon} (used)`,
        icon,
        isCustom: true,
      });
    }
  });

  // Add preset icons
  suggestions.push(...Object.values(ICON_PRESETS));

  return suggestions;
}

// Validate icon (can be text, unicode, or image data)
export function validateIcon(icon) {
  if (typeof icon !== 'string') {
    return { valid: false, error: 'Icon must be a string' };
  }

  // Empty is valid
  if (icon === '') {
    return { valid: true };
  }

  // Check if it's a data URL (image upload)
  if (icon.startsWith('data:image/')) {
    return { valid: true, isImage: true };
  }

  // Otherwise it's text/unicode
  return { valid: true, isText: true };
}

// Validate image upload for icon
export function validateIconImageUpload(file) {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }
  const maxSize = 2 * 1024 * 1024; // 2MB for icons
  if (file.size > maxSize) {
    return { valid: false, error: 'Image too large (max 2MB)' };
  }
  return { valid: true };
}

// Convert file to data URL
export async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
