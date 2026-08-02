import type { EstadoPago } from '../../types/pago.types';
import PagoEstado from './PagoEstado';

interface DetallePedidoResumen {
  libroId: string;
  cantidad: number;
  precioUnitario: number;
}

interface PagoResumenProps {
  pedidoId: string;
  nombreCliente: string;
  correoCliente: string;
  estadoPago: EstadoPago;
  montoTotal: number;
  costoEnvio: number;
  detallesPedido: DetallePedidoResumen[];
}

function formatearMonto(monto: number): string {
  return new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'USD',
  }).format(monto);
}

function PagoResumen({
  pedidoId,
  nombreCliente,
  correoCliente,
  estadoPago,
  montoTotal,
  costoEnvio,
  detallesPedido,
}: PagoResumenProps) {
  return (
    <section
      className="pago-resumen surface"
      aria-labelledby="pago-resumen-titulo"
    >
      <header className="pago-resumen__encabezado">
        <div>
          <p className="pago-resumen__etiqueta">Pedido</p>

          <h2 className="pago-resumen__titulo" id="pago-resumen-titulo">
            Resumen de compra
          </h2>

          <p className="pago-resumen__id">{pedidoId}</p>
        </div>

        <PagoEstado estado={estadoPago} />
      </header>

      <div className="pago-resumen__cliente">
        <div>
          <span className="pago-resumen__campo-etiqueta">Cliente</span>
          <strong>{nombreCliente}</strong>
        </div>

        <div>
          <span className="pago-resumen__campo-etiqueta">
            Correo electrónico
          </span>
          <strong>{correoCliente}</strong>
        </div>
      </div>

      <div className="pago-resumen__productos">
        <h3 className="pago-resumen__subtitulo">Productos</h3>

        {detallesPedido.length === 0 ? (
          <p className="pago-resumen__mensaje">
            Este pedido no contiene productos.
          </p>
        ) : (
          <ul className="pago-resumen__lista">
            {detallesPedido.map((detalle, index) => {
              const totalDetalle =
                detalle.cantidad * detalle.precioUnitario;

              return (
                <li
                  className="pago-resumen__producto"
                  key={`${detalle.libroId}-${index}`}
                >
                  <div className="pago-resumen__producto-informacion">
                    <strong>Libro {index + 1}</strong>

                    <span className="pago-resumen__producto-id">
                      ID: {detalle.libroId}
                    </span>

                    <span className="pago-resumen__producto-cantidad">
                      {detalle.cantidad} ×{' '}
                      {formatearMonto(detalle.precioUnitario)}
                    </span>
                  </div>

                  <strong className="pago-resumen__producto-total">
                    {formatearMonto(totalDetalle)}
                  </strong>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pago-resumen__totales">
        <div className="pago-resumen__total-fila">
          <span>Costo de envío</span>
          <strong>{formatearMonto(costoEnvio)}</strong>
        </div>

        <div className="pago-resumen__total-fila pago-resumen__total-fila--principal">
          <span>Total a pagar</span>
          <strong>{formatearMonto(montoTotal)}</strong>
        </div>
      </div>
    </section>
  );
}

export default PagoResumen;