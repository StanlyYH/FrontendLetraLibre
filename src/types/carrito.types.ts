export interface ProductoParaCarrito {
  libroId: string;
  titulo: string;
  imagenUrl: string;
  precio: number;
  stock: number;
}

export interface CarritoItem extends ProductoParaCarrito {
  cantidad: number;
}

export interface CarritoContextValue {
  items: CarritoItem[];
  cantidadTotal: number;
  subtotal: number;
  estaVacio: boolean;

  agregarProducto: (
    producto: ProductoParaCarrito,
    cantidad?: number,
  ) => void;

  aumentarCantidad: (libroId: string) => void;
  disminuirCantidad: (libroId: string) => void;
  eliminarProducto: (libroId: string) => void;
  vaciarCarrito: () => void;
}