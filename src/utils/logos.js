// ─── Logo Registry ────────────────────────────────────────────────────────

export const SAMPLE_LOGOS = {
  circle: {
    id: 'circle',
    label: 'Circle',
    type: 'shape',
    shape: 'circle',
    size: 60,
  },
  diamond: {
    id: 'diamond',
    label: 'Diamond',
    type: 'shape',
    shape: 'diamond',
    size: 60,
  },
  star: {
    id: 'star',
    label: 'Star',
    type: 'shape',
    shape: 'star',
    points: 5,
    size: 60,
  },
  shield: {
    id: 'shield',
    label: 'Shield',
    type: 'shape',
    shape: 'shield',
    size: 70,
  },
};

export function renderShapeCircle(ctx, x, y, size) {
  const r = size / 2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

export function renderShapeDiamond(ctx, x, y, size) {
  const r = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function renderShapeStar(ctx, x, y, points, size) {
  const r1 = size / 2;
  const r2 = r1 * 0.4;
  const angleStep = (Math.PI * 2) / (points * 2);

  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const r = i % 2 === 0 ? r1 : r2;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function renderShapeShield(ctx, x, y, size) {
  const w = size * 0.6;
  const h = size;
  const x1 = x - w / 2;
  const y1 = y - h / 2;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + w, y1);
  ctx.lineTo(x1 + w, y1 + h * 0.6);
  ctx.quadraticCurveTo(x1 + w / 2, y1 + h, x1, y1 + h * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function renderLogo(ctx, logoConfig, centerX, centerY, width, height, fillColor = '#c89b3c', strokeColor = '#c89b3c') {
  if (!logoConfig || logoConfig.type === 'none') return;

  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;

  if (logoConfig.type === 'shape') {
    const shape = logoConfig.shape;
    const size = logoConfig.size || 60;

    if (shape === 'circle') {
      renderShapeCircle(ctx, centerX, centerY, size);
    } else if (shape === 'diamond') {
      renderShapeDiamond(ctx, centerX, centerY, size);
    } else if (shape === 'star') {
      renderShapeStar(ctx, centerX, centerY, logoConfig.points || 5, size);
    } else if (shape === 'shield') {
      renderShapeShield(ctx, centerX, centerY, size);
    }
  } else if (logoConfig.type === 'image') {
    // For custom images: render from dataUrl
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, centerX - w / 2, centerY - h / 2, w, h);
    };
    img.src = logoConfig.value;
  } else if (logoConfig.type === 'text') {
    // For custom text
    ctx.font = `bold ${logoConfig.fontSize || 40}px 'Funnel Sans','Inter',system-ui,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(logoConfig.value, centerX, centerY);
  }

  ctx.restore();
}

export function validateLogoUpload(file) {
  if (!file) return { valid: false, error: 'No file selected' };
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image too large (max 5MB)' };
  }
  return { valid: true };
}
