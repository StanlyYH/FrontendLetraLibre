export interface DetallePedidoCreate {
  libroId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface PedidoCreate {
  nombreCliente: string;
  correoCliente: string;
  usuarioId: string;
  departamentoEnvio: string;
  direccionEnvio: string;
  costoEnvio: number;
  detallesPedido: DetallePedidoCreate[];
}

export interface DetallePedido {
  libroId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  id: string;
  nombreCliente: string;
  correoCliente: string;
  estadoPago: string;
  montoTotal: number;
  referenciaPago: string;
  usuarioId: string;
  departamentoEnvio: string;
  direccionEnvio: string;
  costoEnvio: number;
  detallesPedido: DetallePedido[];
}