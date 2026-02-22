# TCG Game Mats

A modern web-based designer for creating custom trading card game playmat overlays. Design zone layouts, customize visual styles, and export high-quality PNG mats ready for print.

## Features

- **Preset & Custom Modes** — Choose from pre-built game layouts (e.g., Riftbound) or design a custom grid layout
- **Visual Customization**
  - Overlay border styles (full, corners, none)
  - Adjustable rounded corners
  - Customizable zone colors and opacity
  - Zone gaps and edge runner (outer rim) borders
- **Zone Management**
  - Add text labels to zones with alignment options
  - Display point values per zone
  - Show/hide zone icons and names
  - Lock zones in preset mode
- **Painting Tools**
  - Eraser — remove overlay areas
  - Fade — partially erase with opacity control
  - Restore — undo painting changes
- **Export** — Download your finished mat design as PNG

## Tech Stack

- **React 19** — Modern UI framework
- **Vite 7** — Fast build tool with HMR
- **Canvas API** — High-performance rendering
- **CSS** — Dark gold theme styling

## Setup

### Prerequisites

- Node.js 22+ (Vite 7 requirement)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/tcg-game-mats.git
cd tcg-game-mats
npm install
```

### Development

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build output goes to the `dist/` directory.

## Usage

1. **Select a mode** — Choose between preset (Riftbound) or custom grid layout
2. **Upload a background** — Drag and drop an image or use a plain color
3. **Configure zones** — Add, edit, or remove zones to define your playmat areas
4. **Customize visuals** — Adjust colors, borders, gaps, and other styling options
5. **Paint (optional)** — Use the eraser, fade, or restore tools to refine the overlay
6. **Export** — Download your finished mat as PNG

## Project Structure

```
src/
├── components/         # React components (Canvas, Sidebar, etc.)
├── overlays/          # Canvas rendering logic
├── domain/            # Business logic (rules, config)
├── App.jsx            # Main app component & state
├── App.css            # Styling
└── main.jsx           # Entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
