import apiClient from './apiClient';
import { manejarErrorApi } from './manejarErrorApi';

import type { ApiResponse } from '../types/api.types';
import type { PageResult } from '../types/pagination.types';
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

export async function obtenerPedidoPorId(
  pedidoId: string,
): Promise<ApiResponse<Pedido>> {
  try {
    const { data } = await apiClient.get<ApiResponse<Pedido>>(
      `/api/pedidos/${encodeURIComponent(pedidoId)}`,
    );

    return data;
  } catch (error) {
    manejarErrorApi(error);
  }
}

export async function obtenerPedidos(
  pagina = 1,
  cantidadPorPagina = 10,
): Promise<ApiResponse<PageResult<Pedido[]>>> {
  try {
    const { data } = await apiClient.get<
      ApiResponse<PageResult<Pedido[]>>
    >('/api/pedidos', {
      params: {
        page: pagina,
        pageSize: cantidadPorPagina,
      },
    });

    return data;
  } catch (error) {
    manejarErrorApi(error);
  }
}