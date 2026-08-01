import type { EstadoPago } from '../../types/pago.types';

interface PagoEstadoProps {
  estado: EstadoPago;
}

const estadoClase: Record<EstadoPago, string> = {
  Pendiente: 'pago-estado pago-estado--pendiente',
  Pagado: 'pago-estado pago-estado--pagado',
  Fallido: 'pago-estado pago-estado--fallido',
  Cancelado: 'pago-estado pago-estado--cancelado',
};

function PagoEstado({ estado }: PagoEstadoProps) {
  return (
    <span className={estadoClase[estado]} aria-label={`Estado: ${estado}`}>
      {estado}
    </span>
  );
}

export default PagoEstado;