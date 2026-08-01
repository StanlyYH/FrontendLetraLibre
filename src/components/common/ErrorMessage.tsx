interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="common-state common-state--error" role="alert">
      <h2 className="common-state__title">Ocurrió un problema</h2>

      <p className="common-state__description">{message}</p>

      {onRetry && (
        <button
          className="button button--primary"
          type="button"
          onClick={onRetry}
        >
          Intentar nuevamente
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;