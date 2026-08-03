import { createContext } from 'react';

import type { CarritoContextValue } from '../types/carrito.types';

export const CarritoContext = createContext<
  CarritoContextValue | undefined
>(undefined);