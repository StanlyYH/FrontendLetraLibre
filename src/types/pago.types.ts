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