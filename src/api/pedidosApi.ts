import apiClient from './apiClient';
import { manejarErrorApi } from './manejarErrorApi';

import type { ApiResponse } from '../types/api.types';
import type {
  Pedido,
  PedidoCreate,
} from '../types/pedido.types';

export async function crearPedido(
  datosPedido: PedidoCreate,
): Promise<ApiResponse<Pedido>> {
  try {
    const { data } = await apiClient.post<ApiResponse<Pedido>>(
      '/api/pedidos',
      datosPedido,
    );

    return data;
  } catch (error) {
    manejarErrorApi(error);
  }
}