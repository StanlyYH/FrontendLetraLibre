import type { CarritoItem } from '../types/carrito.types';

const CARRITO_STORAGE_KEY = 'letra-libre-carrito';

const esNumeroValido = (valor: unknown): valor is number =>
  typeof valor === 'number' && Number.isFinite(valor);

const esCarritoItemValido = (valor: unknown): valor is CarritoItem => {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }

  const item = valor as Record<string, unknown>;

  return (
    typeof item.libroId === 'string' &&
    item.libroId.trim().length > 0 &&
    typeof item.titulo === 'string' &&
    typeof item.imagenUrl === 'string' &&
    esNumeroValido(item.precio) &&
    item.precio >= 0 &&
    esNumeroValido(item.stock) &&
    Number.isInteger(item.stock) &&
    item.stock > 0 &&
    esNumeroValido(item.cantidad) &&
    Number.isInteger(item.cantidad) &&
    item.cantidad >= 1 &&
    item.cantidad <= item.stock
  );
};

export const cargarCarrito = (): CarritoItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const carritoGuardado = window.localStorage.getItem(
      CARRITO_STORAGE_KEY,
    );

    if (!carritoGuardado) {
      return [];
    }

    const datos: unknown = JSON.parse(carritoGuardado);

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos.filter(esCarritoItemValido);
  } catch (error) {
    console.error(
      'No se pudo cargar el carrito desde localStorage.',
      error,
    );

    return [];
  }
};

export const guardarCarrito = (items: CarritoItem[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      CARRITO_STORAGE_KEY,
      JSON.stringify(items),
    );
  } catch (error) {
    console.error(
      'No se pudo guardar el carrito en localStorage.',
      error,
    );
  }
};

export const eliminarCarritoGuardado = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(CARRITO_STORAGE_KEY);
  } catch (error) {
    console.error(
      'No se pudo eliminar el carrito de localStorage.',
      error,
    );
  }
};