import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { CarritoContext } from './carritoContextBase';

import type {
  CarritoContextValue,
  CarritoItem,
  ProductoParaCarrito,
} from '../types/carrito.types';

import {
  cargarCarrito,
  eliminarCarritoGuardado,
  guardarCarrito,
} from '../utils/carritoStorage';

interface CarritoProviderProps {
  children: ReactNode;
}

const esProductoValido = (
  producto: ProductoParaCarrito,
): boolean => {
  return (
    typeof producto.libroId === 'string' &&
    producto.libroId.trim().length > 0 &&
    typeof producto.titulo === 'string' &&
    typeof producto.imagenUrl === 'string' &&
    Number.isFinite(producto.precio) &&
    producto.precio >= 0 &&
    Number.isInteger(producto.stock) &&
    producto.stock > 0
  );
};

const normalizarCantidad = (
  cantidad: number,
  stock: number,
): number => {
  const cantidadEntera = Number.isFinite(cantidad)
    ? Math.trunc(cantidad)
    : 1;

  return Math.min(
    Math.max(cantidadEntera, 1),
    stock,
  );
};

export function CarritoProvider({
  children,
}: CarritoProviderProps) {
  const [items, setItems] = useState<CarritoItem[]>(
    cargarCarrito,
  );

  useEffect(() => {
    if (items.length === 0) {
      eliminarCarritoGuardado();
      return;
    }

    guardarCarrito(items);
  }, [items]);

  const agregarProducto = useCallback(
    (
      producto: ProductoParaCarrito,
      cantidad = 1,
    ): void => {
      if (!esProductoValido(producto)) {
        console.warn(
          'No se pudo agregar el producto porque sus datos no son válidos.',
          producto,
        );

        return;
      }

      const cantidadSolicitada = normalizarCantidad(
        cantidad,
        producto.stock,
      );

      setItems((itemsActuales) => {
        const productoExistente = itemsActuales.find(
          (item) => item.libroId === producto.libroId,
        );

        if (!productoExistente) {
          const nuevoItem: CarritoItem = {
            ...producto,
            cantidad: cantidadSolicitada,
          };

          return [...itemsActuales, nuevoItem];
        }

        return itemsActuales.map((item) => {
          if (item.libroId !== producto.libroId) {
            return item;
          }

          const cantidadActualAjustada = Math.min(
            item.cantidad,
            producto.stock,
          );

          const nuevaCantidad = Math.min(
            cantidadActualAjustada + cantidadSolicitada,
            producto.stock,
          );

          return {
            ...item,
            titulo: producto.titulo,
            imagenUrl: producto.imagenUrl,
            precio: producto.precio,
            stock: producto.stock,
            cantidad: nuevaCantidad,
          };
        });
      });
    },
    [],
  );

  const aumentarCantidad = useCallback(
    (libroId: string): void => {
      setItems((itemsActuales) =>
        itemsActuales.map((item) => {
          if (item.libroId !== libroId) {
            return item;
          }

          if (item.cantidad >= item.stock) {
            return item;
          }

          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }),
      );
    },
    [],
  );

  const disminuirCantidad = useCallback(
    (libroId: string): void => {
      setItems((itemsActuales) =>
        itemsActuales.map((item) => {
          if (item.libroId !== libroId) {
            return item;
          }

          if (item.cantidad <= 1) {
            return item;
          }

          return {
            ...item,
            cantidad: item.cantidad - 1,
          };
        }),
      );
    },
    [],
  );

  const eliminarProducto = useCallback(
    (libroId: string): void => {
      setItems((itemsActuales) =>
        itemsActuales.filter(
          (item) => item.libroId !== libroId,
        ),
      );
    },
    [],
  );

  const vaciarCarrito = useCallback((): void => {
    setItems([]);
  }, []);

  const cantidadTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.cantidad,
        0,
      ),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.precio * item.cantidad,
        0,
      ),
    [items],
  );

  const estaVacio = items.length === 0;

  const valorContexto = useMemo<CarritoContextValue>(
    () => ({
      items,
      cantidadTotal,
      subtotal,
      estaVacio,
      agregarProducto,
      aumentarCantidad,
      disminuirCantidad,
      eliminarProducto,
      vaciarCarrito,
    }),
    [
      items,
      cantidadTotal,
      subtotal,
      estaVacio,
      agregarProducto,
      aumentarCantidad,
      disminuirCantidad,
      eliminarProducto,
      vaciarCarrito,
    ],
  );

  return (
    <CarritoContext.Provider value={valorContexto}>
      {children}
    </CarritoContext.Provider>
  );
}
