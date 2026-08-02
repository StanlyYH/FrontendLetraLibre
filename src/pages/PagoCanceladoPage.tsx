import { Link, useSearchParams } from 'react-router-dom';

function PagoCanceladoPage() {
  const [searchParams] = useSearchParams();
  const pedidoId = searchParams.get('pedidoId');

  const rutaReintento = pedidoId
    ? `/pago/${encodeURIComponent(pedidoId)}`
    : null;

  return (
    <div className="page">
      <div className="container">
        <section
          className="pago-cancelado surface"
          aria-labelledby="pago-cancelado-titulo"
        >
          <div className="pago-cancelado__icono" aria-hidden="true">
            ×
          </div>

          <p className="pago-cancelado__etiqueta">Proceso interrumpido</p>

          <h1
            className="pago-cancelado__titulo"
            id="pago-cancelado-titulo"
          >
            El pago fue cancelado
          </h1>

          <p className="pago-cancelado__descripcion">
            No se confirmó el pago con el servidor. Los productos de tu
            carrito permanecen disponibles para que puedas intentarlo
            nuevamente.
          </p>

          {pedidoId && (
            <p className="pago-cancelado__pedido">
              Pedido relacionado: <strong>{pedidoId}</strong>
            </p>
          )}

          <div className="pago-cancelado__acciones">
            <Link className="button button--secondary" to="/carrito">
              Regresar al carrito
            </Link>

            {rutaReintento ? (
              <Link className="button button--primary" to={rutaReintento}>
                Intentar pagar nuevamente
              </Link>
            ) : (
              <Link className="button button--primary" to="/pedidos">
                Ver pedidos
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PagoCanceladoPage;