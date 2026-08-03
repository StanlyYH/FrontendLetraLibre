import type { AxiosError } from "axios";
import type { ApiResponse } from "../types";

export function manejarErrorApi(error: unknown): never {
    const apiError = error as AxiosError<ApiResponse<unknown>>;

    console.error(apiError);

    if (apiError.response){
       throw new Error(apiError.response.data.message, {cause: apiError.cause});   
    }else if(apiError.request){
        throw new Error('Error de conexión con el servidor', { cause: apiError.cause});
    }else {
        throw new Error('Error desconocido', { cause: apiError.cause });
    }
}