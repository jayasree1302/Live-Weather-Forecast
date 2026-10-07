import WeatherDetails from './WeatherDetails';

function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <div className="current-weather__header">
        <div className="current-weather__location">
          <h2>{data.city}, {data.country}</h2>
          <p className="current-weather__datetime">{data.localDateTime}</p>
        </div>
        <img
          src={data.icon}
          alt={data.condition}
          className="current-weather__icon"
        />
      </div>

      <div className="current-weather__main">
        <div className="current-weather__temp">{data.temp}°C</div>
        <div className="current-weather__condition">
          <span className="current-weather__condition-main">{data.condition}</span>
          <span className="current-weather__condition-desc">{data.description}</span>
        </div>
      </div>

      <div className="current-weather__feels">
        Feels like {data.feelsLike}°C
      </div>

      <WeatherDetails data={data} />
    </div>
  );
}

export default CurrentWeather;
