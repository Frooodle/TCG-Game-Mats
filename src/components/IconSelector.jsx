import { useState, useRef, useEffect } from 'react';
import { getIconSuggestions, validateIconImageUpload, fileToDataUrl } from '../utils/icons';
import '../styles/IconSelector.css';

export default function IconSelector({ value, onChange, zones = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const suggestions = getIconSuggestions(zones);
  const isImageData = value?.startsWith('data:image/');

  // Update menu position when opened or window resizes
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 150,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen]);

  const handleSelectPreset = (icon) => {
    onChange(icon);
    setIsOpen(false);
    setCustomText('');
  };

  const handleCustomText = (text) => {
    setCustomText(text);
    onChange(text);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateIconImageUpload(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
      setIsOpen(false);
      setCustomText('');
    } catch (error) {
      alert('Failed to upload image');
      console.error(error);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const displayValue = isImageData ? '🖼' : value || '○';

  return (
    <>
      <div className="icon-selector">
        <button
          ref={triggerRef}
          className="icon-selector-trigger"
          onClick={() => setIsOpen(!isOpen)}
          title="Click to select icon"
        >
          <span className="icon-display">{displayValue}</span>
        </button>
      </div>

      {isOpen && (
        <>
          {/* Backdrop to close menu */}
          <div className="icon-selector-backdrop" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div
            ref={menuRef}
            className="icon-selector-menu"
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 9999,
            }}
          >
            {/* Preset icons grid */}
            <div className="icon-menu-section">
              <div className="icon-menu-label">Presets</div>
              <div className="icon-grid">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className={`icon-option ${value === suggestion.icon ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(suggestion.icon)}
                    title={suggestion.label}
                    type="button"
                  >
                    <span className="icon-opt-display">{suggestion.icon || '∅'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom text input */}
            <div className="icon-menu-section">
              <label className="icon-menu-label">Custom</label>
              <input
                type="text"
                className="icon-custom-input"
                placeholder="Type emoji/text"
                value={customText}
                onChange={(e) => handleCustomText(e.target.value.slice(0, 2))}
                maxLength={2}
              />
            </div>

            {/* Image upload */}
            <div className="icon-menu-section">
              <button className="icon-upload-btn" type="button" onClick={triggerImageUpload}>
                📤 Upload Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
