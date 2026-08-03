import apiClient from "./apiClient";
import { manejarErrorApi } from "./manejarErrorApi";
import type { ApiResponse, Libro, PageResult } from "../types";

export async function obtenerLibros(
    searchTerm: string = '',
    page: number = 1,
    pageSize: number = 10
): Promise<ApiResponse<PageResult<Libro[]>>>{
    try {
        const { data } = await apiClient.get<ApiResponse<PageResult<Libro[]>>>('/api/libros', {
            params: { searchTerm, page, pageSize},   
        });
        return data;
    } catch (error) {
        manejarErrorApi(error);
    }
}

export async function obtenerLibroPorId(id: string): Promise<ApiResponse<Libro>> {
   try {
        const { data } = await apiClient.get<ApiResponse<Libro>>(`/api/libros/${id}`);
        return data;
   } catch (error) {
        manejarErrorApi(error);
   } 
}