import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { obtenerPedidos } from '../api/pedidosApi';

import type { PageResult } from '../types/pagination.types';
import type { Pedido } from '../types/pedido.types';

const PEDIDOS_POR_PAGINA = 10;

const formateadorMoneda = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
});

function obtenerColorEstado(estadoPago: string): string {
  switch (estadoPago.toLowerCase()) {
    case 'pagado':
      return 'var(--success)';

    case 'fallido':
    case 'cancelado':
      return 'var(--danger)';

    default:
      return 'var(--warning)';
  }
}

function PedidosPage() {
  const [pagina, setPagina] = useState(1);
  const [recarga, setRecarga] = useState(0);

  const [resultado, setResultado] =
    useState<PageResult<Pedido[]> | null>(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  let consultaCancelada = false;

  obtenerPedidos(
    pagina,
    PEDIDOS_POR_PAGINA,
  )
    .then((respuesta) => {
      if (consultaCancelada) {
        return;
      }

      if (!respuesta.status || !respuesta.data) {
        throw new Error(
          respuesta.message ||
            'No se pudo obtener el historial de pedidos.',
        );
      }

      setResultado(respuesta.data);
      setError(null);
    })
    .catch((errorDesconocido: unknown) => {
      if (consultaCancelada) {
        return;
      }

      const mensaje =
        errorDesconocido instanceof Error
          ? errorDesconocido.message
          : 'Ocurrió un error al consultar los pedidos.';

      setError(mensaje);
      setResultado(null);
    })
    .finally(() => {
      if (!consultaCancelada) {
        setCargando(false);
      }
    });

  return () => {
    consultaCancelada = true;
  };
}, [pagina, recarga]);

  if (cargando) {
    return (
      <main className="page">
        <div className="container">
          <section className="common-state">
            <div
              className="loading-spinner"
              aria-hidden="true"
            />

            <h1 className="common-state__title">
              Cargando pedidos
            </h1>

            <p className="common-state__description">
              Estamos consultando el historial de pedidos.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container">
          <section className="common-state common-state--error">
            <h1 className="common-state__title">
              No se pudieron cargar los pedidos
            </h1>

            <p className="common-state__description">
              {error}
            </p>

            <button
              className="button button--primary common-state__action"
              type="button"
              onClick={() => {
                setCargando(true);
                setError(null);
                setRecarga((valorActual) => valorActual + 1);
                }}
            >
              Intentar nuevamente
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (!resultado || resultado.items.length === 0) {
    return (
      <main className="page">
        <div className="container">
          <section className="common-state">
            <h1 className="common-state__title">
              No hay pedidos registrados
            </h1>

            <p className="common-state__description">
              Los pedidos que realices aparecerán en esta
              sección.
            </p>

            <Link
              className="button button--primary common-state__action"
              to="/catalogo"
            >
              Explorar catálogo
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <header className="page__header">
          <h1 className="page__title">
            Mis pedidos
          </h1>

          <p className="page__description">
            Consulta los pedidos registrados y revisa el estado
            de sus pagos.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gap: '16px',
          }}
          aria-label="Historial de pedidos"
        >
          {resultado.items.map((pedido) => {
            const unidades = pedido.detallesPedido.reduce(
              (total, detalle) =>
                total + detalle.cantidad,
              0,
            );

            return (
              <article
                className="surface"
                key={pedido.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'minmax(0, 1fr) auto',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '14px',
                    }}
                  >
                    <h2
                      style={{
                        marginBottom: 0,
                        fontSize: '1.25rem',
                      }}
                    >
                      Pedido de {pedido.nombreCliente}
                    </h2>

                    <span
                      style={{
                        padding: '6px 10px',
                        borderRadius: '999px',
                        backgroundColor:
                          'var(--background)',
                        color: obtenerColorEstado(
                          pedido.estadoPago,
                        ),
                        fontSize: '0.86rem',
                        fontWeight: 700,
                      }}
                    >
                      {pedido.estadoPago}
                    </span>
                  </div>

                  <p
                    style={{
                      marginBottom: '8px',
                      color: 'var(--text-secondary)',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    Código: <strong>{pedido.id}</strong>
                  </p>

                  <p
                    style={{
                      marginBottom: '8px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Envío: {pedido.departamentoEnvio}
                  </p>

                  <p
                    style={{
                      marginBottom: 0,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {pedido.detallesPedido.length}{' '}
                    {pedido.detallesPedido.length === 1
                      ? 'producto'
                      : 'productos'}
                    {' · '}
                    {unidades}{' '}
                    {unidades === 1
                      ? 'unidad'
                      : 'unidades'}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  <strong
                    style={{
                      fontSize: '1.25rem',
                    }}
                  >
                    {formateadorMoneda.format(
                      pedido.montoTotal,
                    )}
                  </strong>

                  <Link
                    className="button button--secondary"
                    to={`/pedidos/${pedido.id}`}
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <nav
          aria-label="Paginación de pedidos"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '28px',
          }}
        >
          <button
            className="button button--secondary"
            type="button"
            disabled={!resultado.hasPreviousPage}
            onClick={() =>
              setPagina((paginaActual) =>
                Math.max(paginaActual - 1, 1),
              )
            }
          >
            Anterior
          </button>

          <span>
            Página <strong>{resultado.currentPage}</strong> de{' '}
            <strong>{resultado.totalPages}</strong>
          </span>

          <button
            className="button button--secondary"
            type="button"
            disabled={!resultado.hasNextPage}
            onClick={() =>
              setPagina((paginaActual) =>
                paginaActual + 1,
              )
            }
          >
            Siguiente
          </button>
        </nav>

        <p
          style={{
            marginTop: '18px',
            marginBottom: 0,
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          Total de pedidos: {resultado.totalItems}
        </p>
      </div>
    </main>
  );
}

export default PedidosPage;