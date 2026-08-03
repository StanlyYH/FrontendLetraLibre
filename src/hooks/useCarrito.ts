import { useContext } from 'react';

import { CarritoContext } from '../context/carritoContextBase';
import type { CarritoContextValue } from '../types/carrito.types';

export function useCarrito(): CarritoContextValue {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider.',
    );
  }

  return contexto;
}