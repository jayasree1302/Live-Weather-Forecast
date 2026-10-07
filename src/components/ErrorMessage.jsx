function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon" aria-hidden="true">!</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
