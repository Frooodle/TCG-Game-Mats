/**
 * Script to generate og-image.png for social sharing
 * Run: npm install canvas --save-dev && node generate-og-image.js
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

// Image dimensions (standard OG image size)
const width = 1200;
const height = 630;

// Create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient (dark to lighter gold)
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#0f1117');
gradient.addColorStop(1, '#1f2233');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add decorative border
ctx.strokeStyle = '#c89b3c';
ctx.lineWidth = 4;
ctx.strokeRect(20, 20, width - 40, height - 40);

// Inner decorative line
ctx.strokeStyle = 'rgba(200, 155, 60, 0.3)';
ctx.lineWidth = 2;
ctx.strokeRect(40, 40, width - 80, height - 80);

// Main title
ctx.font = 'bold 72px Arial, sans-serif';
ctx.fillStyle = '#c89b3c';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
ctx.fillText('TCG Game Mats', width / 2, 80);

// Subtitle
ctx.font = '40px Arial, sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('Free Playmat Designer', width / 2, 170);

// Draw sample grid (simplified playmat preview)
const gridX = 150;
const gridY = 260;
const gridW = 900;
const gridH = 280;

// Draw grid border
ctx.strokeStyle = '#c89b3c';
ctx.lineWidth = 3;
ctx.strokeRect(gridX, gridY, gridW, gridH);

// Draw sample zones (simplified 6-zone layout)
const zones = [
  { x: 50, y: 20, w: 130, h: 260, label: 'Zone 1' },
  { x: 190, y: 20, w: 130, h: 260, label: 'Zone 2' },
  { x: 330, y: 20, w: 130, h: 260, label: 'Zone 3' },
  { x: 470, y: 20, w: 130, h: 260, label: 'Zone 4' },
  { x: 610, y: 20, w: 130, h: 260, label: 'Zone 5' },
  { x: 750, y: 20, w: 130, h: 260, label: 'Zone 6' },
];

zones.forEach((zone, i) => {
  // Draw zone box
  ctx.strokeStyle = 'rgba(200, 155, 60, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(gridX + zone.x, gridY + zone.y, zone.w, zone.h);

  // Fill with semi-transparent color (alternating)
  ctx.fillStyle = i % 2 === 0 ? 'rgba(200, 155, 60, 0.1)' : 'rgba(200, 155, 60, 0.05)';
  ctx.fillRect(gridX + zone.x, gridY + zone.y, zone.w, zone.h);

  // Zone label
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = 'rgba(200, 155, 60, 0.8)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(zone.label, gridX + zone.x + zone.w / 2, gridY + zone.y + zone.h / 2);
});

// Bottom CTA
ctx.font = 'bold 32px Arial, sans-serif';
ctx.fillStyle = '#c89b3c';
ctx.textAlign = 'center';
ctx.fillText('⚔ Design Yours Free', width / 2, height - 60);

// Save to public folder
const outputPath = path.join(process.cwd(), 'public', 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);

console.log(`✅ og-image.png generated at: ${outputPath}`);
console.log(`📏 Size: ${width}x${height}px`);
