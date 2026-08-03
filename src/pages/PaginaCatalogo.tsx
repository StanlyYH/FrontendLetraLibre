import { useEffect, useState } from "react";

import { obtenerLibros } from "../api/librosApi";
import { TarjetaLibro } from "../components/libros/TarjetaLibro";
import { useCarrito } from "../hooks/useCarrito";

import type { Libro } from "../types";

function PaginaCatalogo() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const { agregarProducto } = useCarrito();

  useEffect(() => {
    obtenerLibros("", paginaActual, 10)
      .then((respuesta) => {
        setLibros(respuesta.data?.items ?? []);
        setTotalPaginas(respuesta.data?.totalPages ?? 1);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setCargando(false));
  }, [paginaActual]);

  const agregarLibroAlCarrito = (libro: Libro): void => {
    agregarProducto({
      libroId: libro.id,
      titulo: libro.titulo,
      imagenUrl: libro.imagenUrl ?? "",
      precio: libro.precio,
      stock: libro.stock,
    });
  };

  return (
    <div className="catalogo">
      <h1>Catálogo</h1>

      <p>Explora todos los libros disponibles en Letra Libre</p>

      {cargando && <p>Cargando libros...</p>}

      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {!cargando && !error && libros.length === 0 && (
        <p>No hay libros disponibles por ahora.</p>
      )}

      {!cargando && !error && libros.length > 0 && (
        <div className="catalogo__grid">
          {libros.map((libro) => (
            <TarjetaLibro
              key={libro.id}
              libro={libro}
              alAgregarCarrito={agregarLibroAlCarrito}
            />
          ))}
        </div>
      )}

      {!cargando && !error && totalPaginas > 1 && (
        <div className="catalogo__paginacion">
          <button
            onClick={() => setPaginaActual((pagina) => pagina - 1)}
            disabled={paginaActual === 1}
          >
            ← Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaActual((pagina) => pagina + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default PaginaCatalogo;
