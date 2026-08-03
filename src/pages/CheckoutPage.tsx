import {
  useState,
  type FormEvent,
} from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { crearPedido } from '../api/pedidosApi';
import { useCarrito } from '../hooks/useCarrito';

import type { PedidoCreate } from '../types/pedido.types';

const COSTO_ENVIO = 120;
const USUARIO_TEMPORAL_ID = 'usuario-prueba-001';

const formateadorMoneda = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
});

function CheckoutPage() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    cantidadTotal,
    estaVacio,
    vaciarCarrito,
  } = useCarrito();

  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [departamentoEnvio, setDepartamentoEnvio] =
    useState('');
  const [direccionEnvio, setDireccionEnvio] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const montoEstimado = subtotal + COSTO_ENVIO;

  const enviarPedido = async (
    evento: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    evento.preventDefault();

    if (estaVacio) {
      setError(
        'No puedes crear un pedido porque el carrito está vacío.',
      );
      return;
    }

    if (
      !nombreCliente.trim() ||
      !correoCliente.trim() ||
      !departamentoEnvio.trim() ||
      !direccionEnvio.trim()
    ) {
      setError(
        'Completa todos los datos del cliente y del envío.',
      );
      return;
    }

    const datosPedido: PedidoCreate = {
      nombreCliente: nombreCliente.trim(),
      correoCliente: correoCliente.trim(),
      usuarioId: USUARIO_TEMPORAL_ID,
      departamentoEnvio: departamentoEnvio.trim(),
      direccionEnvio: direccionEnvio.trim(),
      costoEnvio: COSTO_ENVIO,

      detallesPedido: items.map((item) => ({
        libroId: item.libroId,
        cantidad: item.cantidad,

        // El backend consultará el precio real del libro.
        precioUnitario: 0,
      })),
    };

    try {
      setEnviando(true);
      setError(null);

      const respuesta = await crearPedido(datosPedido);

      if (!respuesta.status || !respuesta.data) {
        throw new Error(
          respuesta.message ||
            'No se pudo crear el pedido.',
        );
      }

      const pedidoCreado = respuesta.data;

      vaciarCarrito();

      navigate(`/pedidos/${pedidoCreado.id}`, {
        state: {
          pedidoCreado,
        },
      });
    } catch (errorDesconocido) {
      const mensaje =
        errorDesconocido instanceof Error
          ? errorDesconocido.message
          : 'Ocurrió un error al crear el pedido.';

      setError(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  if (estaVacio) {
    return (
      <main className="page">
        <div className="container">
          <section className="common-state">
            <h1 className="common-state__title">
              No hay productos para comprar
            </h1>

            <p className="common-state__description">
              Agrega al menos un libro al carrito antes de
              continuar con el checkout.
            </p>

            <Link
              className="button button--primary common-state__action"
              to="/catalogo"
            >
              Ir al catálogo
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
            Finalizar pedido
          </h1>

          <p className="page__description">
            Completa tus datos para registrar el pedido y
            preparar el envío.
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
          <form
            className="surface"
            style={{ padding: '24px' }}
            onSubmit={enviarPedido}
          >
            <h2>Información del cliente</h2>

            <div
              style={{
                display: 'grid',
                gap: '18px',
              }}
            >
              <label>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Nombre completo
                </span>

                <input
                  type="text"
                  value={nombreCliente}
                  onChange={(evento) =>
                    setNombreCliente(evento.target.value)
                  }
                  disabled={enviando}
                  required
                  autoComplete="name"
                  style={{
                    width: '100%',
                    minHeight: '46px',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-small)',
                  }}
                />
              </label>

              <label>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Correo electrónico
                </span>

                <input
                  type="email"
                  value={correoCliente}
                  onChange={(evento) =>
                    setCorreoCliente(evento.target.value)
                  }
                  disabled={enviando}
                  required
                  autoComplete="email"
                  style={{
                    width: '100%',
                    minHeight: '46px',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-small)',
                  }}
                />
              </label>

              <h2
                style={{
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                Información de envío
              </h2>

              <label>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Departamento
                </span>

                <input
                  type="text"
                  value={departamentoEnvio}
                  onChange={(evento) =>
                    setDepartamentoEnvio(
                      evento.target.value,
                    )
                  }
                  disabled={enviando}
                  required
                  placeholder="Ejemplo: Copán"
                  style={{
                    width: '100%',
                    minHeight: '46px',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-small)',
                  }}
                />
              </label>

              <label>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Dirección completa
                </span>

                <textarea
                  value={direccionEnvio}
                  onChange={(evento) =>
                    setDireccionEnvio(
                      evento.target.value,
                    )
                  }
                  disabled={enviando}
                  required
                  rows={4}
                  placeholder="Ciudad, barrio, calle y referencias"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-small)',
                    resize: 'vertical',
                  }}
                />
              </label>

              {error && (
                <div
                  role="alert"
                  style={{
                    padding: '14px',
                    border:
                      '1px solid rgba(255, 59, 48, 0.25)',
                    borderRadius:
                      'var(--radius-small)',
                    backgroundColor:
                      'rgba(255, 59, 48, 0.05)',
                    color: 'var(--danger)',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                className="button button--primary"
                type="submit"
                disabled={enviando}
              >
                {enviando
                  ? 'Creando pedido...'
                  : 'Confirmar pedido'}
              </button>
            </div>
          </form>

          <aside
            className="surface"
            style={{
              position: 'sticky',
              top: 'calc(var(--header-height) + 24px)',
              padding: '24px',
            }}
          >
            <h2>Resumen</h2>

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
                <span>Unidades</span>
                <strong>{cantidadTotal}</strong>
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
                  {formateadorMoneda.format(COSTO_ENVIO)}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginTop: '8px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '1.15rem',
                }}
              >
                <span>Total estimado</span>

                <strong>
                  {formateadorMoneda.format(
                    montoEstimado,
                  )}
                </strong>
              </div>

              <Link
                className="button button--secondary"
                to="/carrito"
              >
                Volver al carrito
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;