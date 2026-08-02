export type EstadoPago =
  | 'Pendiente'
  | 'Pagado'
  | 'Fallido'
  | 'Cancelado';

export interface SolicitudPago {
  pedidoId: string;
  urlExito: string;
  urlCancelacion: string;
}

export interface SesionPago {
  pedidoId: string;
  sessionId: string;
  urlPago: string;
  estadoPago: EstadoPago;
  fechaExpiracion: string;
}

export interface ResultadoPago {
  pedidoId: string;
  sessionId: string;
  estadoPago: EstadoPago;
  pagoCompletado: boolean;
  montoPagado: number;
  moneda: string;
  referenciaPago: string;
  fechaPago: string | null;
}

export interface DetallePedidoPago {
  libroId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface PedidoParaPago {
  id: string;
  nombreCliente: string;
  correoCliente: string;
  estadoPago: EstadoPago;
  montoTotal: number;
  referenciaPago: string;
  usuarioId: string;
  departamentoEnvio: string;
  direccionEnvio: string;
  costoEnvio: number;
  detallesPedido: DetallePedidoPago[];
}