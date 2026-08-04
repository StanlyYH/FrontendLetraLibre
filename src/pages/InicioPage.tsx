import { Link } from 'react-router-dom';

function InicioPage() {
  return (
    <div className="page">
      <div className="container">
        <section className="page__header page__header--hero">
          <svg
            className="page__watermark"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <path
              d="M32 20c-4.5-3.2-10.5-4.2-16-3v26c5.5-1.2 11.5-0.2 16 3
                 4.5-3.2 10.5-4.2 16-3V17c-5.5-1.2-11.5-0.2-16 3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line x1="32" y1="20" x2="32" y2="46" stroke="currentColor" strokeWidth="2" />
          </svg>

          <p className="page__description">
            Tu próxima historia comienza aquí
          </p>

          <h1 className="page__title">
            Descubre nuevos <span className="page__title-accent">libros</span>.
          </h1>

          <p className="page__description">
            Explora nuestro catálogo, crea tu pedido y realiza
            tu pago de forma sencilla y segura.
          </p>
        </section>

        <section
          className="surface"
          style={{ padding: '32px' }}
        >
          <h2>Bienvenido a Letra Libre</h2>

          <p className="page__description">
            Encuentra libros para aprender, imaginar y disfrutar.
            Revisa las opciones disponibles, agrégalas al carrito
            y completa tu compra mediante nuestro proceso de pago
            seguro.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <Link
              className="button button--primary"
              to="/catalogo"
            >
              Explorar catálogo
            </Link>

            <Link
              className="button button--secondary"
              to="/pedidos"
            >
              Ver mis pedidos
            </Link>
          </div>
        </section>

        <ul className="trust-badges">
          <li className="trust-badges__item">
            <svg className="trust-badges__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 16V6a1 1 0 0 1 1-1h9v11H3z" />
              <path d="M13 10h4l3 3v3h-7z" />
              <circle cx="7" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
            </svg>
            Envío a todo el país
          </li>
          <li className="trust-badges__item">
            <svg className="trust-badges__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" />
            </svg>
            Pago seguro
          </li>
          <li className="trust-badges__item">
            <svg className="trust-badges__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 5c3-1 6-1 8 0v14c-2-1-5-1-8 0V5z" />
              <path d="M20 5c-3-1-6-1-8 0v14c2-1 5-1 8 0V5z" />
            </svg>
            Catálogo variado
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InicioPage;