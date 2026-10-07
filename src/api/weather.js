const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function buildIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function formatTime(unixSeconds, timezoneOffset) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

function formatLocalDateTime(timezoneOffset) {
  const now = new Date(Date.now() + timezoneOffset * 1000);
  return now.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

function dayName(unixSeconds, timezoneOffset) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

export async function fetchCurrentWeather(city) {
  if (!API_KEY) {
    throw new Error('Missing API key. Add VITE_WEATHER_API_KEY to your .env file.');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);

  if (res.status === 404) {
    throw new Error(`Could not find "${city}". Please check the spelling and try again.`);
  }
  if (res.status === 401) {
    throw new Error('Invalid API key. Check your VITE_WEATHER_API_KEY in the .env file.');
  }
  if (!res.ok) {
    throw new Error('Something went wrong fetching the weather. Please try again.');
  }

  const data = await res.json();
  const tz = data.timezone;

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: buildIconUrl(data.weather[0].icon),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    pressure: data.main.pressure,
    visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
    sunrise: formatTime(data.sys.sunrise, tz),
    sunset: formatTime(data.sys.sunset, tz),
    localDateTime: formatLocalDateTime(tz),
  };
}

export async function fetchForecast(city) {
  if (!API_KEY) {
    throw new Error('Missing API key. Add VITE_WEATHER_API_KEY to your .env file.');
  }

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);

  if (res.status === 404) {
    throw new Error(`Could not find "${city}". Please check the spelling and try again.`);
  }
  if (res.status === 401) {
    throw new Error('Invalid API key. Check your VITE_WEATHER_API_KEY in the .env file.');
  }
  if (!res.ok) {
    throw new Error('Something went wrong fetching the forecast. Please try again.');
  }

  const data = await res.json();
  const tz = data.city.timezone;

  // Group forecast entries by day, keep one per day (midday-ish reading)
  const dailyMap = new Map();
  for (const entry of data.list) {
    const day = dayName(entry.dt, tz);
    if (!dailyMap.has(day)) {
      dailyMap.set(day, {
        day,
        icon: buildIconUrl(entry.weather[0].icon),
        condition: entry.weather[0].main,
        max: Math.round(entry.main.temp_max),
        min: Math.round(entry.main.temp_min),
      });
    } else {
      const existing = dailyMap.get(day);
      existing.max = Math.max(existing.max, Math.round(entry.main.temp_max));
      existing.min = Math.min(existing.min, Math.round(entry.main.temp_min));
    }
  }

  return Array.from(dailyMap.values()).slice(0, 5);
}
