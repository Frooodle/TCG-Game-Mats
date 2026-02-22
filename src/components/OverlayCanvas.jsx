import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { drawOverlay, getMatSize } from '../overlays/renderer';

const TOOLS = { NONE: 'none', ERASER: 'eraser', RESTORE: 'restore', FADE: 'fade' };
export { TOOLS };

const OverlayCanvas = forwardRef(function OverlayCanvas(
  {
    imageData,
    plainBackgroundColor = '#0e0e1a',
    overlayColor = '#c89b3c',
    overlayOpacity = 0.85,
    showOverlay = true,
    activeTool = TOOLS.NONE,
    brushSize = 40,
    fadeOpacity = 0.4,
    // unified config (either RIFTBOUND_PRESET or custom)
    config,
    overlayOptions = {},
    onDragOver,
    onDragLeave,
    onDrop,
  },
  ref
) {
  const matSize = getMatSize(config);
  const { width: matW, height: matH } = matSize;

  const displayCanvasRef = useRef(null);
  const maskCanvasRef    = useRef(null);
  const overlayCanvasRef = useRef(null);
  const bgImageRef       = useRef(null);

  const isDrawingRef = useRef(false);
  const lastPosRef   = useRef(null);

  const [cursorStyle, setCursorStyle] = useState('default');

  // ── Re-create overlay ──────────────────────────────────────────────────────
  useEffect(() => {
    const oc = document.createElement('canvas');
    oc.width  = matW;
    oc.height = matH;
    if (config) {
      drawOverlay(oc.getContext('2d'), overlayColor, config, overlayOptions);
    }
    overlayCanvasRef.current = oc;
    composite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayColor, config, overlayOptions, matW, matH]);

  // ── Composite ─────────────────────────────────────────────────────────────
  const composite = useCallback(() => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, matW, matH);

    // Layer 1 – background image (cover-fit)
    if (bgImageRef.current) {
      const img = bgImageRef.current;
      const scale = Math.max(matW / img.naturalWidth, matH / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (matW - w) / 2, (matH - h) / 2, w, h);
    } else {
      ctx.fillStyle = plainBackgroundColor;
      ctx.fillRect(0, 0, matW, matH);
    }

    if (!showOverlay || !overlayCanvasRef.current) return;

    // Layer 2 – overlay + eraser mask applied via destination-out
    const tmp = document.createElement('canvas');
    tmp.width  = matW;
    tmp.height = matH;
    const tCtx = tmp.getContext('2d');
    tCtx.drawImage(overlayCanvasRef.current, 0, 0);

    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas) {
      tCtx.globalCompositeOperation = 'destination-out';
      tCtx.drawImage(maskCanvas, 0, 0);
      tCtx.globalCompositeOperation = 'source-over';
    }

    ctx.globalAlpha = overlayOpacity;
    ctx.drawImage(tmp, 0, 0);
    ctx.globalAlpha = 1;
  }, [showOverlay, overlayOpacity, matW, matH, plainBackgroundColor]);

  // ── Load background image ─────────────────────────────────────────────────
  useEffect(() => {
    if (!imageData) { bgImageRef.current = null; composite(); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { bgImageRef.current = img; composite(); };
    img.onerror = () => {
      const img2 = new Image();
      img2.onload = () => { bgImageRef.current = img2; composite(); };
      img2.src = imageData;
    };
    img.src = imageData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  useEffect(() => { composite(); }, [composite, overlayOpacity, showOverlay]);

  // ── Cursor ────────────────────────────────────────────────────────────────
  useEffect(() => {
    setCursorStyle(activeTool === TOOLS.NONE ? 'default' : 'crosshair');
  }, [activeTool]);

  // ── Canvas coords ─────────────────────────────────────────────────────────
  const getCanvasPos = useCallback((e) => {
    const canvas = displayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const client = e.touches ? e.touches[0] : e;
    return {
      x: ((client.clientX - rect.left)  / rect.width)  * matW,
      y: ((client.clientY - rect.top)   / rect.height) * matH,
    };
  }, [matW, matH]);

  // ── Paint on mask ─────────────────────────────────────────────────────────
  const paintMask = useCallback(
    (from, to) => {
      const mask = maskCanvasRef.current;
      if (!mask) return;
      const mCtx = mask.getContext('2d');
      mCtx.lineWidth  = brushSize;
      mCtx.lineCap    = 'round';
      mCtx.lineJoin   = 'round';

      if (activeTool === TOOLS.ERASER) {
        mCtx.globalCompositeOperation = 'source-over';
        mCtx.strokeStyle = 'rgba(0,0,0,1)';
      } else if (activeTool === TOOLS.FADE) {
        mCtx.globalCompositeOperation = 'source-over';
        mCtx.strokeStyle = `rgba(0,0,0,${fadeOpacity})`;
      } else if (activeTool === TOOLS.RESTORE) {
        mCtx.globalCompositeOperation = 'destination-out';
        mCtx.strokeStyle = 'rgba(0,0,0,1)';
      }

      mCtx.beginPath();
      mCtx.moveTo(from.x, from.y);
      mCtx.lineTo(to.x, to.y);
      mCtx.stroke();
      mCtx.globalCompositeOperation = 'source-over';
    },
    [activeTool, brushSize, fadeOpacity]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (activeTool === TOOLS.NONE) return;
      e.preventDefault();
      isDrawingRef.current = true;
      const pos = getCanvasPos(e);
      lastPosRef.current = pos;
      paintMask(pos, pos);
      composite();
    },
    [activeTool, getCanvasPos, paintMask, composite]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const pos = getCanvasPos(e);
      paintMask(lastPosRef.current, pos);
      lastPosRef.current = pos;
      composite();
    },
    [getCanvasPos, paintMask, composite]
  );

  const handlePointerUp = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const clearMask = useCallback(() => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    mask.getContext('2d').clearRect(0, 0, matW, matH);
    composite();
  }, [composite, matW, matH]);

  useImperativeHandle(ref, () => ({
    getCanvas: () => displayCanvasRef.current,
    clearMask,
    toDataURL: () => displayCanvasRef.current?.toDataURL('image/png'),
  }));

  return (
    <div
      className="canvas-outer"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <canvas
        ref={displayCanvasRef}
        width={matW}
        height={matH}
        className="mat-canvas"
        style={{ cursor: cursorStyle }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />
      <canvas ref={maskCanvasRef} width={matW} height={matH} style={{ display: 'none' }} />
    </div>
  );
});

export default OverlayCanvas;
