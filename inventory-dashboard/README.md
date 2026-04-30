# Inventory Dashboard

A real-time low stock inventory tracking dashboard built with React + Vite, powered by DummyJSON via Google Apps Script.

## Features

- Real-time inventory data fetched via Google Apps Script backend
- Low stock alerts (threshold: < 20 units)
- Priority score calculation: (100 − stock) × price
- Search by product name or ID
- Filter by stock status (All / Low Stock / In Stock)
- Sortable columns (click any column header)
- Summary metrics: total products, low stock count, average stock, total inventory value

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Google Apps Script
- **Data Source:** DummyJSON API
- **Deployment:** Vercel

## Project Structure
src/
├── App.jsx        # Main dashboard component
├── main.jsx       # React entry point
└── index.css      # Global styles

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Built By

**Mohit Dharwadkar**  
dharwadkarmohit@gmail.com