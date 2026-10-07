import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { fetchCurrentWeather, fetchForecast } from './api/weather';
import './App.css';

function App() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrent(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setCurrent(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather('Chennai');
  }, [loadWeather]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Live Weather Forecast</h1>
        <SearchBar onSearch={loadWeather} />
      </header>

      <main className="app__main">
        {loading && <Loading />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && current && (
          <>
            <CurrentWeather data={current} />
            {forecast && <Forecast data={forecast} />}
          </>
        )}
      </main>

      <footer className="app__footer">
        <p>Weather data by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
