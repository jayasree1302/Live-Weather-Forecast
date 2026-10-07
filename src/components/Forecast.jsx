import ForecastCard from './ForecastCard';

function Forecast({ data }) {
  return (
    <div className="forecast">
      <h3 className="forecast__title">5-Day Forecast</h3>
      <div className="forecast__list">
        {data.map((day) => (
          <ForecastCard key={day.day} data={day} />
        ))}
      </div>
    </div>
  );
}

export default Forecast;
