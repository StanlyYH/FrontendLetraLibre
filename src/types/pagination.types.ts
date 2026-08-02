
// Cualquier módulo en donde el backend devuelva listas paginadas (Libros, Pedidos, etc.) lo reutiliza
export interface PageResult<T>{
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    items: T;
}