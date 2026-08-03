import type { ResultadoPago } from '../../types/pago.types';
import PagoEstado from './PagoEstado';

interface PagoResultadoProps {
  resultado: ResultadoPago;
}

function formatearMonto(monto: number, moneda: string): string {
  const codigoMoneda = moneda.toUpperCase();

  try {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: codigoMoneda,
    }).format(monto);
  } catch {
    return `${monto.toFixed(2)} ${codigoMoneda}`;
  }
}

function formatearFecha(fecha: string | null): string {
  if (!fecha) {
    return 'No disponible';
  }

  const fechaPago = new Date(fecha);

  if (Number.isNaN(fechaPago.getTime())) {
    return fecha;
  }

  return new Intl.DateTimeFormat('es-HN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(fechaPago);
}

function PagoResultado({ resultado }: PagoResultadoProps) {
  return (
    <section className="pago-resultado surface">
      <div className="pago-resultado__encabezado">
        <div>
          <p className="pago-resultado__etiqueta">Resultado del pago</p>
          <h2 className="pago-resultado__titulo">
            {resultado.pagoCompletado
              ? 'Pago confirmado'
              : 'Pago no completado'}
          </h2>
        </div>

        <PagoEstado estado={resultado.estadoPago} />
      </div>

      <dl className="pago-resultado__datos">
        <div className="pago-resultado__dato">
          <dt>Pedido</dt>
          <dd>{resultado.pedidoId}</dd>
        </div>

        <div className="pago-resultado__dato">
          <dt>Monto pagado</dt>
          <dd>
            {formatearMonto(resultado.montoPagado, resultado.moneda)}
          </dd>
        </div>

        <div className="pago-resultado__dato">
          <dt>Fecha del pago</dt>
          <dd>{formatearFecha(resultado.fechaPago)}</dd>
        </div>

        <div className="pago-resultado__dato">
          <dt>Referencia</dt>
          <dd>{resultado.referenciaPago || 'No disponible'}</dd>
        </div>
      </dl>
    </section>
  );
}

export default PagoResultado;