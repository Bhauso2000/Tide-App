🌊 Tides Information App

A React + TypeScript single-page app that shows:

Nearest coast based on user location

Next High/Low tide times

Time until next tide (using moment.js)

Tide timeline chart (Chart.js + react-chartjs-2)

Mini map (Leaflet.js)

Safe Time Window recommendation (novel feature)

LocalStorage for saving last known location

React Query for API fetching & caching

TailwindCSS for responsive, modern UI



---

🚀 Features

📍 Geolocation: fetches user location (or uses last saved location)

🌊 Tide data: fetched from WorldTides.info API

⏳ Time display: formatted with moment-timezone, timezone-aware

📊 Timeline chart: shows tide height over time

🗺 Map view: interactive map with nearest coast marker

💾 LocalStorage: stores last known location, with option to clear


🛠 Tech Stack

React 19 + TypeScript (Vite)

TailwindCSS for styling

React Query for data fetching & caching

Axios for API requests

Moment + moment-timezone for date/time

Leaflet + react-leaflet for map

Chart.js + react-chartjs-2 for tide timeline


📂 Project Structure

tides-app/
 ├── public/                # Static assets
 ├── src/                   # Main source code
 │   ├── assets/            # (Optional) images, icons, etc.
 │   ├── components/        # Reusable UI components
 │   │   ├── Loader.tsx
 │   │   ├── MapView.tsx
 │   │   ├── TideInfo.tsx
 │   │   └── TideTimeline.tsx
 │   ├── constants/         # App constants & configuration
 │   │   └── constants.ts
 │   ├── hooks/             # Custom React hooks
 │   │   └── useTideQuery.ts
 │   ├── plugins/           # External library setups (e.g., Axios instance)
 │   │   └── axios.ts
 │   ├── types/             # Global TypeScript types & enums
 │   │   ├── chartjs-adapter-date-fns.d.ts
 │   │   └── types.ts
 │   ├── utils/             # Utility functions
 │   │   ├── tideApi.ts
 │   │   └── timeUtils.ts
 │   ├── App.tsx            # Main app component
 │   ├── index.css          # Tailwind CSS entry
 │   ├── main.tsx           # App entry point
 │   └── vite-env.d.ts      # Vite TypeScript definitions
 ├── .env                   # Local environment variables
 ├── .env.example           # Example environment config
 ├── .gitignore             # Git ignore rules
 ├── eslint.config.js       # ESLint configuration
 ├── index.html             # Vite HTML entry
 ├── package.json           # Dependencies & scripts
 ├── package-lock.json      # Lockfile
 ├── README.md              # Documentation
 ├── tsconfig.json          # TypeScript configuration
 ├── tsconfig.app.json      # TS config for app
 ├── tsconfig.node.json     # TS config for node
 └── vite.config.ts         # Vite bundler config

---

⚙ Environment Variables

Create a .env file in the root:

For reference, copy this file to `.env` and fill in your own API keys:

cp .env.example .env

Then edit `.env` to add your credentials:

VITE_WORLDTIDES_API_KEY=your_worldtides_api_key_here

Get an API key from WorldTides.

This is used in src/utils/tideApi.ts.

---

🏃 Getting Started

1. Clone the repo

cd tides-app

2. Install dependencies

npm install

3. Run dev server

npm run dev

Visit: http://localhost:5173

4. Build for production

npm run build
npm run preview


---

📖 Usage

1. Open the app.


2. Allow geolocation access.


3. App will:

Get your location

Fetch nearest tide station data from WorldTides API

Show next high/low tide times, countdown, map, and tide timeline



4. Use “Clear Location” to reset saved location.


5. “Refresh Data” button refetches from API.


🔔 Novel Feature: Safe Time Window

The app highlights safe periods when tide height is below a threshold (SAFE_TIDE_HEIGHT_THRESHOLD = 1.2m in constants.ts).
This is helpful for beachgoers to know when conditions are calmer.

---

📜 License

MIT — free to use, modify, and share.

 