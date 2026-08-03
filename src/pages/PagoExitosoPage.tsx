import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import PagoResultado from '../components/pagos/PagoResultado';
import { confirmarPago } from '../api/pagosApi';
import { useCarrito } from '../hooks/useCarrito';
import type { ApiResponse } from '../types/api.types';
import type { ResultadoPago } from '../types/pago.types';

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

function PagoExitosoPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { vaciarCarrito } = useCarrito();

  const [resultado, setResultado] = useState<ResultadoPago | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const verificarPago = useCallback(async () => {
    if (!sessionId) {
      setResultado(null);
      setError(
        'No se recibió el identificador de la sesión de pago.',
      );
      setCargando(false);
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const respuesta = await confirmarPago(sessionId);

      if (!respuesta.status || !respuesta.data) {
        throw new Error(
          respuesta.message ||
            'El servidor no pudo confirmar el resultado del pago.',
        );
      }

      setResultado(respuesta.data);

      if (respuesta.data.pagoCompletado) {
        vaciarCarrito();
      }
    } catch (errorConfirmacion) {
      setResultado(null);
      setError(
        obtenerMensajeError(
          errorConfirmacion,
          'No fue posible confirmar el pago con el servidor.',
        ),
      );
    } finally {
      setCargando(false);
    }
  }, [sessionId, vaciarCarrito]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void verificarPago();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [verificarPago]);

  if (cargando) {
    return (
      <div className="page">
        <div className="container">
          <Loading message="Confirmando el pago con el servidor..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <header className="page__header">
            <p className="page__description">Verificación del pago</p>

            <h1 className="page__title">
              No pudimos confirmar el resultado
            </h1>
          </header>

          <ErrorMessage
            message={error}
            onRetry={
              sessionId
                ? () => {
                    void verificarPago();
                  }
                : undefined
            }
          />

          <div className="pago-exitoso__acciones">
            <Link className="button button--secondary" to="/pedidos">
              Ver pedidos
            </Link>

            <Link className="button button--primary" to="/carrito">
              Regresar al carrito
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="page">
        <div className="container">
          <ErrorMessage message="El servidor no devolvió información del pago." />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page__header">
          <p className="page__description">Verificación completada</p>

          <h1 className="page__title">
            {resultado.pagoCompletado
              ? 'Gracias por tu compra'
              : 'El pago no fue completado'}
          </h1>

          <p className="page__description">
            {resultado.pagoCompletado
              ? 'El servidor confirmó correctamente la transacción.'
              : 'El servidor indicó que la transacción no se completó.'}
          </p>
        </header>

        <div className="pago-exitoso__contenido">
          <PagoResultado resultado={resultado} />

          <section className="pago-exitoso__acciones surface">
            <Link
              className="button button--secondary"
              to={`/pedidos/${resultado.pedidoId}`}
            >
              Ver pedido
            </Link>

            <Link className="button button--primary" to="/pedidos">
              Ver historial
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PagoExitosoPage;
