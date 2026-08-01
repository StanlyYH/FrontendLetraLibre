import { Link } from 'react-router-dom';

function InicioPage() {
  return (
    <div className="page">
      <div className="container">
        <section className="page__header">
          <p className="page__description">Tu próxima historia comienza aquí</p>

          <h1 className="page__title">Descubre nuevos libros.</h1>

          <p className="page__description">
            Explora nuestro catálogo, crea tu pedido y realiza tu pago de forma
            sencilla y segura.
          </p>
        </section>

        <section className="surface" style={{ padding: '32px' }}>
          <h2>Bienvenido a Letra Libre</h2>

          <p className="page__description">
            El catálogo completo será desarrollado por Darlan. Por ahora, la
            navegación principal ya está preparada.
          </p>

          <div style={{ marginTop: '24px' }}>
            <Link className="button button--primary" to="/catalogo">
              Explorar catálogo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InicioPage;