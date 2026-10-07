function ForecastCard({ data }) {
  return (
    <div className="forecast-card">
      <span className="forecast-card__day">{data.day}</span>
      <img src={data.icon} alt={data.condition} className="forecast-card__icon" />
      <span className="forecast-card__condition">{data.condition}</span>
      <div className="forecast-card__temps">
        <span className="forecast-card__max">{data.max}°</span>
        <span className="forecast-card__min">{data.min}°</span>
      </div>
    </div>
  );
}

export default ForecastCard;
