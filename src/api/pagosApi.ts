import apiClient from './apiClient';
import type { ApiResponse } from '../types/api.types';
import type {
  PedidoParaPago,
  ResultadoPago,
  SesionPago,
  SolicitudPago,
} from '../types/pago.types';

export async function obtenerPedidoParaPago(
  pedidoId: string,
): Promise<ApiResponse<PedidoParaPago>> {
  const pedidoIdSeguro = encodeURIComponent(pedidoId);

  const response = await apiClient.get<ApiResponse<PedidoParaPago>>(
    `/api/pedidos/${pedidoIdSeguro}`,
  );

  return response.data;
}

export async function crearSesionPago(
  solicitud: SolicitudPago,
): Promise<ApiResponse<SesionPago>> {
  const response = await apiClient.post<ApiResponse<SesionPago>>(
    '/api/pagos/crear-sesion',
    solicitud,
  );

  return response.data;
}

export async function confirmarPago(
  sessionId: string,
): Promise<ApiResponse<ResultadoPago>> {
  const sessionIdSeguro = encodeURIComponent(sessionId);

  const response = await apiClient.get<ApiResponse<ResultadoPago>>(
    `/api/pagos/confirmar/${sessionIdSeguro}`,
  );

  return response.data;
}