function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
}

export default Loading;
