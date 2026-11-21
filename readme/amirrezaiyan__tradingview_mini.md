# TradingView Mini — Chart UI refresh

This update focuses on the chart workspace only. It keeps the current API calls, historical candle loading, live-price polling, drawing persistence/editing, and RSI/MACD/SMA/EMA logic in place.

## Files

Replace these files in your project:

- `frontend/src/components/ChartContainer.jsx`
- `frontend/src/components/ChartToolbar.jsx`

Add this new stylesheet:

- `frontend/src/components/ChartContainer.css`

The new `ChartContainer.jsx` imports its stylesheet using `./ChartContainer.css`, so keep the CSS beside the component.

## What changed

- Replaced the neon green/red candlestick palette with softer teal/red market colors.
- Refined chart background, grid, crosshair, typography, price scale and time scale.
- Added responsive candle spacing and a more useful initial viewport (last ~58 candles on narrow screens and ~105 on wider screens).
- Resizes the Lightweight Charts instance only when its container has a real visible size, which is safer when switching mobile tabs.
- Increased the plot area height and made it more adaptive to viewport height.
- Restyled the drawing toolbar and stopped it from dispatching three duplicate tool-selection events.
- Improved price formatting for the Last Close and Live Price values.
- Kept existing candle API, latest-price API, drawings storage and indicator calculations/panes.

## Install

Extract the ZIP at the repository root (`G:\tradingview-mini`) and allow these two component files to be replaced. The CSS file is new and should be added beside them.

Then from PowerShell:

```powershell
cd G:\tradingview-mini\frontend
npm run build
```

If the build succeeds, restart Vite:

```powershell
npm run dev -- --host 127.0.0.1 --port 5174
```

## Notes

- No backend, API endpoint, environment, or database files are changed.
- No fake or mock market data is added.
- This update was syntax-checked locally, but it has not been run against your local Vite project or browser. Please check the chart at desktop and mobile widths after replacing the files.