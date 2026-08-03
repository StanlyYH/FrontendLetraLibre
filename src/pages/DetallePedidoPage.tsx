import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import { obtenerPedidoPorId } from '../api/pedidosApi';

import type { Pedido } from '../types/pedido.types';

const formateadorMoneda = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
});

function DetallePedidoPage() {
  const { id } = useParams<{ id: string }>();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let componenteActivo = true;

    const cargarPedido = async (): Promise<void> => {
      if (!id) {
        setError('No se proporcionó un identificador de pedido.');
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError(null);

        const respuesta = await obtenerPedidoPorId(id);

        if (!respuesta.status || !respuesta.data) {
          throw new Error(
            respuesta.message ||
              'No se pudo obtener la información del pedido.',
          );
        }

        if (componenteActivo) {
          setPedido(respuesta.data);
        }
      } catch (errorDesconocido) {
        if (!componenteActivo) {
          return;
        }

        const mensaje =
          errorDesconocido instanceof Error
            ? errorDesconocido.message
            : 'Ocurrió un error al consultar el pedido.';

        setError(mensaje);
      } finally {
        if (componenteActivo) {
          setCargando(false);
        }
      }
    };

    void cargarPedido();

    return () => {
      componenteActivo = false;
    };
  }, [id]);

  const subtotal = useMemo(() => {
    if (!pedido) {
      return 0;
    }

    return pedido.detallesPedido.reduce(
      (total, detalle) =>
        total +
        detalle.precioUnitario * detalle.cantidad,
      0,
    );
  }, [pedido]);

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
              Cargando pedido
            </h1>

            <p className="common-state__description">
              Estamos consultando la información de tu pedido.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (error || !pedido) {
    return (
      <main className="page">
        <div className="container">
          <section className="common-state common-state--error">
            <h1 className="common-state__title">
              No se pudo mostrar el pedido
            </h1>

            <p className="common-state__description">
              {error ?? 'El pedido solicitado no existe.'}
            </p>

            <Link
              className="button button--primary common-state__action"
              to="/pedidos"
            >
              Volver a pedidos
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
          <p
            style={{
              marginBottom: '8px',
              color: 'var(--text-secondary)',
            }}
          >
            Pedido realizado correctamente
          </p>

          <h1 className="page__title">
            Detalle del pedido
          </h1>

          <p className="page__description">
            Código del pedido:{' '}
            <strong>{pedido.id}</strong>
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0, 1fr) minmax(280px, 360px)',
            alignItems: 'start',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: '24px',
            }}
          >
            <section
              className="surface"
              style={{ padding: '24px' }}
            >
              <h2>Información del cliente</h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <p
                    style={{
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Nombre
                  </p>

                  <strong>{pedido.nombreCliente}</strong>
                </div>

                <div>
                  <p
                    style={{
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Correo electrónico
                  </p>

                  <strong>{pedido.correoCliente}</strong>
                </div>
              </div>
            </section>

            <section
              className="surface"
              style={{ padding: '24px' }}
            >
              <h2>Dirección de envío</h2>

              <p
                style={{
                  marginBottom: '6px',
                  color: 'var(--text-secondary)',
                }}
              >
                Departamento
              </p>

              <p>
                <strong>{pedido.departamentoEnvio}</strong>
              </p>

              <p
                style={{
                  marginBottom: '6px',
                  color: 'var(--text-secondary)',
                }}
              >
                Dirección
              </p>

              <p style={{ marginBottom: 0 }}>
                <strong>{pedido.direccionEnvio}</strong>
              </p>
            </section>

            <section>
              <h2>Libros del pedido</h2>

              <div
                style={{
                  display: 'grid',
                  gap: '14px',
                }}
              >
                {pedido.detallesPedido.map(
                  (detalle, indice) => (
                    <article
                      className="surface"
                      key={`${detalle.libroId}-${indice}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'minmax(0, 1fr) auto',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '20px',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            marginBottom: '8px',
                          }}
                        >
                          Libro
                        </h3>

                        <p
                          style={{
                            marginBottom: '6px',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          ID: {detalle.libroId}
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          Cantidad:{' '}
                          <strong>{detalle.cantidad}</strong>
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <p
                          style={{
                            marginBottom: '6px',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          Precio unitario
                        </p>

                        <strong>
                          {formateadorMoneda.format(
                            detalle.precioUnitario,
                          )}
                        </strong>

                        <p
                          style={{
                            marginTop: '10px',
                            marginBottom: 0,
                          }}
                        >
                          Total:{' '}
                          <strong>
                            {formateadorMoneda.format(
                              detalle.precioUnitario *
                                detalle.cantidad,
                            )}
                          </strong>
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </section>
          </div>

          <aside
            className="surface"
            style={{
              position: 'sticky',
              top: 'calc(var(--header-height) + 24px)',
              padding: '24px',
            }}
          >
            <h2>Resumen del pedido</h2>

            <div
              style={{
                display: 'grid',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <span>Estado del pago</span>

                <strong
                  style={{
                    color:
                      pedido.estadoPago === 'Pagado'
                        ? 'var(--success)'
                        : 'var(--warning)',
                  }}
                >
                  {pedido.estadoPago}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <span>Subtotal</span>

                <strong>
                  {formateadorMoneda.format(subtotal)}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <span>Envío</span>

                <strong>
                  {formateadorMoneda.format(
                    pedido.costoEnvio,
                  )}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '1.15rem',
                }}
              >
                <span>Total</span>

                <strong>
                  {formateadorMoneda.format(
                    pedido.montoTotal,
                  )}
                </strong>
              </div>

              {pedido.referenciaPago && (
                <div>
                  <p
                    style={{
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Referencia de pago
                  </p>

                  <code
                    style={{
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {pedido.referenciaPago}
                  </code>
                </div>
              )}

              {pedido.estadoPago.toLowerCase() ===
                'pendiente' && (
                <Link
                  className="button button--primary"
                  to={`/pago/${pedido.id}`}
                >
                  Continuar con el pago
                </Link>
              )}

              <Link
                className="button button--secondary"
                to="/pedidos"
              >
                Ver todos los pedidos
              </Link>

              <Link
                className="button button--secondary"
                to="/catalogo"
              >
                Volver al catálogo
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DetallePedidoPage;