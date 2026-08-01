interface LoadingProps {
  message?: string;
}

function Loading({ message = 'Cargando información...' }: LoadingProps) {
  return (
    <div className="common-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />

      <p className="common-state__description">{message}</p>
    </div>
  );
}

export default Loading;