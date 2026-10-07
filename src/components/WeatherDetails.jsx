function WeatherDetails({ data }) {
  const items = [
    { label: 'Humidity', value: `${data.humidity}%` },
    { label: 'Wind Speed', value: `${data.windSpeed} m/s` },
    { label: 'Pressure', value: `${data.pressure} hPa` },
    { label: 'Visibility', value: data.visibility != null ? `${data.visibility} km` : 'N/A' },
    { label: 'Sunrise', value: data.sunrise },
    { label: 'Sunset', value: data.sunset },
  ];

  return (
    <div className="weather-details">
      {items.map((item) => (
        <div className="weather-details__item" key={item.label}>
          <span className="weather-details__label">{item.label}</span>
          <span className="weather-details__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;
