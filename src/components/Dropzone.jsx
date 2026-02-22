import { useRef, useState } from 'react';

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export default function Dropzone({
  isDragging, onDragOver, onDragLeave, onDrop, onImageLoad,
  plainBackgroundColor, onPlainBackgroundColorChange, onUsePlainBackground,
  matSize,
}) {
  const fileInputRef = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onImageLoad(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const url = urlValue.trim();
    if (!url) return;
    setUrlError('');
    // Basic sanity check
    try {
      new URL(url);
    } catch {
      setUrlError('Enter a valid URL');
      return;
    }
    onImageLoad(url);
  };

  return (
    <div
      className={`dropzone ${isDragging ? 'dragging' : ''}`}
      style={matSize ? { aspectRatio: `${matSize.width}/${matSize.height}` } : undefined}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="dropzone-inner">
        <div className="dropzone-icon">⚔</div>
        <h2 className="dropzone-heading">Design Your Riftbound Mat</h2>
        <p className="dropzone-sub">
          Upload your artwork — we&apos;ll overlay the playmat zones for you
        </p>

        <div className="dropzone-actions">
          <button
            className="btn-upload"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse Files
          </button>
          <span className="or-divider">or</span>
          <form className="url-form" onSubmit={handleUrlSubmit}>
            <input
              type="text"
              className="url-input"
              placeholder="Paste image URL…"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
            <button type="submit" className="btn-url">Load</button>
          </form>
        </div>

        <div className="plain-bg-row">
          <span className="or-divider">or</span>
          <div className="plain-bg-controls">
            <label className="plain-bg-color-wrap" title="Plain background color">
              <input
                type="color"
                value={plainBackgroundColor}
                onChange={(e) => onPlainBackgroundColorChange(e.target.value)}
                className="plain-bg-color"
              />
            </label>
            <button className="btn-plain-bg" onClick={() => onUsePlainBackground(plainBackgroundColor)}>
              Use Plain Color
            </button>
          </div>
        </div>

        {urlError && <p className="url-error">{urlError}</p>}

        <p className="dropzone-hint">
          {isDragging ? '✦ Drop it!' : 'Drag & drop an image, paste a URL, or start from a plain color'}
        </p>

        <p className="dropzone-formats">JPG · PNG · GIF · WebP</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
