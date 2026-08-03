import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import PagoResumen from '../components/pagos/PagoResumen';
import {
  crearSesionPago,
  obtenerPedidoParaPago,
} from '../api/pagosApi';
import type { ApiResponse } from '../types/api.types';
import type { PedidoParaPago } from '../types/pago.types';
import '../styles/pago-page.css';

function obtenerMensajeError(
  error: unknown,
  mensajePredeterminado: string,
): string {
  if (isAxiosError<ApiResponse<unknown>>(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      mensajePredeterminado
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return mensajePredeterminado;
}

function PagoPage() {
  const { pedidoId } = useParams<{ pedidoId: string }>();

  const [pedido, setPedido] = useState<PedidoParaPago | null>(null);
  const [cargando, setCargando] = useState(true);
  const [creandoSesion, setCreandoSesion] = useState(false);
  const [errorPedido, setErrorPedido] = useState<string | null>(null);
  const [errorSesion, setErrorSesion] = useState<string | null>(null);

  const cargarPedido = useCallback(async () => {
    if (!pedidoId) {
      setPedido(null);
      setErrorPedido(
        'No se recibió el identificador del pedido que se desea pagar.',
      );
      setCargando(false);
      return;
    }

    setCargando(true);
    setErrorPedido(null);

    try {
      const respuesta = await obtenerPedidoParaPago(pedidoId);

      if (!respuesta.status || !respuesta.data) {
        throw new Error(
          respuesta.message || 'No fue posible obtener el pedido.',
        );
      }

      setPedido(respuesta.data);
    } catch (error) {
      setPedido(null);
      setErrorPedido(
        obtenerMensajeError(
          error,
          'No fue posible consultar el pedido.',
        ),
      );
    } finally {
      setCargando(false);
    }
  }, [pedidoId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void cargarPedido();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [cargarPedido]);

  const iniciarPago = async () => {
    if (!pedido) {
      return;
    }

    if (pedido.estadoPago === 'Pagado') {
      setErrorSesion('Este pedido ya se encuentra pagado.');
      return;
    }

    setCreandoSesion(true);
    setErrorSesion(null);

    try {
      const respuesta = await crearSesionPago({
        pedidoId: pedido.id,
        urlExito: `${window.location.origin}/pago-exitoso`,
        urlCancelacion: `${window.location.origin}/pago-cancelado?pedidoId=${encodeURIComponent(
  pedido.id,
)}`,
      });

      if (!respuesta.status || !respuesta.data?.urlPago) {
        throw new Error(
          respuesta.message ||
            'No fue posible obtener la dirección de pago.',
        );
      }

      window.location.assign(respuesta.data.urlPago);
    } catch (error) {
      setErrorSesion(
        obtenerMensajeError(
          error,
          'No fue posible crear la sesión de pago.',
        ),
      );
      setCreandoSesion(false);
    }
  };

  if (cargando) {
    return (
      <div className="page">
        <div className="container">
          <Loading message="Consultando información del pedido..." />
        </div>
      </div>
    );
  }

  if (errorPedido) {
    return (
      <div className="page">
        <div className="container">
          <ErrorMessage
            message={errorPedido}
            onRetry={() => {
              void cargarPedido();
            }}
          />
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="page">
        <div className="container">
          <ErrorMessage message="No se encontró información del pedido." />
        </div>
      </div>
    );
  }

  const pedidoPagado = pedido.estadoPago === 'Pagado';

  return (
    <div className="page">
      <div className="container">
        <header className="page__header">
          <p className="page__description">Pago seguro</p>

          <h1 className="page__title">Revisa tu pedido</h1>

          <p className="page__description">
            Confirma la información de la compra antes de continuar con
            Stripe.
          </p>
        </header>

        <div className="pago-page__contenido">
          <PagoResumen
            pedidoId={pedido.id}
            nombreCliente={pedido.nombreCliente}
            correoCliente={pedido.correoCliente}
            estadoPago={pedido.estadoPago}
            montoTotal={pedido.montoTotal}
            costoEnvio={pedido.costoEnvio}
            detallesPedido={pedido.detallesPedido}
          />

          {errorSesion && <ErrorMessage message={errorSesion} />}

          <section className="pago-page__acciones surface">
            <div>
              <h2 className="pago-page__acciones-titulo">
                {pedidoPagado
                  ? 'Este pedido ya fue pagado'
                  : 'Continuar con el pago'}
              </h2>

              <p className="pago-page__acciones-descripcion">
                {pedidoPagado
                  ? 'No es necesario crear otra sesión de pago para este pedido.'
                  : 'Serás redirigido al sitio seguro de Stripe para completar la transacción.'}
              </p>
            </div>

            <div className="pago-page__botones">
              <Link
                className="button button--secondary"
                to={`/pedidos/${pedido.id}`}
              >
                Ver pedido
              </Link>

              <button
                className="button button--primary"
                type="button"
                disabled={creandoSesion || pedidoPagado}
                aria-busy={creandoSesion}
                onClick={() => {
                  void iniciarPago();
                }}
              >
                {creandoSesion
                  ? 'Creando sesión...'
                  : pedidoPagado
                    ? 'Pedido pagado'
                    : 'Pagar con Stripe'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PagoPage;