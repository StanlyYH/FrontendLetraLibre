import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page">
      <div className="container">
        <section className="surface" style={{ padding: '40px' }}>
          <p className="page__description">Error 404</p>

          <h1 className="page__title">Página no encontrada</h1>

          <p className="page__description">
            La dirección ingresada no corresponde a una página disponible.
          </p>

          <div style={{ marginTop: '24px' }}>
            <Link className="button button--primary" to="/">
              Regresar al inicio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NotFoundPage;