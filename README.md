# Live Weather Forecast

A modern, responsive weather dashboard built with React + Vite. Search any city to see current conditions and a 5-day forecast, powered by the OpenWeatherMap API.

## Features

- Search by city name (button or Enter key)
- Current weather: temperature, condition, icon, feels-like, humidity, wind speed, pressure, visibility, sunrise/sunset, local date/time
- 5-day forecast with day, icon, high/low temperatures, and condition
- Loading spinner while fetching
- Friendly error message for invalid or empty searches
- Default city (Chennai) on first load
- Fully responsive (mobile, tablet, desktop)

## Setup

### 1. Get a free API key

Go to <https://openweathermap.org/api>, sign up, and create a free API key.

### 2. Add your API key

Create a file named `.env` in the project root (next to `package.json`) and add:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

The key is read from the environment variable at build time — it is never hardcoded in the source.

### 3. Install dependencies

```
npm install
```

### 4. Run the dev server

```
npm run dev
```

Open the URL shown in your terminal (usually <http://localhost:5173>).

### 5. Build for production

```
npm run build
```

## Project structure

```
src/
  App.jsx                 Main app, orchestrates state + data fetching
  index.css               Global styles + theme variables
  api/
    weather.js            OpenWeatherMap API helper functions
  components/
    SearchBar.jsx          City search input + button
    CurrentWeather.jsx     Main current-conditions card
    WeatherDetails.jsx     Grid of detail metrics (humidity, wind, etc.)
    Forecast.jsx           5-day forecast container
    ForecastCard.jsx       Single forecast day card
    Loading.jsx            Spinner shown while fetching
    ErrorMessage.jsx       Error message display
```

## Notes

- The app uses the free OpenWeatherMap endpoints (`/weather` and `/forecast`).
- If the API key is missing or invalid, the app shows an error explaining what to do.
- No static/fake data is used — all weather data is live.
