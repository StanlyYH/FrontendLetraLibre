import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';

function InicioPage() {
  return (
    <div className="page">
      <div className="container">
        <header className="page__header">
          <p className="page__description">Componentes reutilizables</p>

          <h1 className="page__title">Estados de la aplicación</h1>

          <p className="page__description">
            Estos componentes serán utilizados en catálogo, carrito, pedidos y
            pagos.
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gap: '24px',
          }}
        >
          <Loading message="Consultando libros..." />

          <ErrorMessage
            message="No fue posible comunicarse con el servidor."
            onRetry={() => window.alert('Prueba del botón de reintento')}
          />

          <EmptyState
            title="No hay resultados"
            description="No encontramos información para mostrar."
            action={
              <Link className="button button--primary" to="/catalogo">
                Ir al catálogo
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default InicioPage;