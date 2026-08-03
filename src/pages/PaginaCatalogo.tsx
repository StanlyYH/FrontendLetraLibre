import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import { obtenerLibros } from '../api/librosApi';
import { TarjetaLibro } from '../components/libros/TarjetaLibro';
import { useCarrito } from '../hooks/useCarrito';

import type { Libro } from '../types';

const LIBROS_POR_PAGINA = 5;

interface CriteriosCatalogo {
  termino: string;
  pagina: number;
}

function PaginaCatalogo() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [textoBusqueda, setTextoBusqueda] = useState('');

  const [criterios, setCriterios] =
    useState<CriteriosCatalogo>({
      termino: '',
      pagina: 1,
    });

  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalLibros, setTotalLibros] = useState(0);

  const { agregarProducto } = useCarrito();

  useEffect(() => {
    let consultaCancelada = false;

    obtenerLibros(
      criterios.termino,
      criterios.pagina,
      LIBROS_POR_PAGINA,
    )
      .then((respuesta) => {
        if (consultaCancelada) {
          return;
        }

        if (!respuesta.status || !respuesta.data) {
          throw new Error(
            respuesta.message ||
              'No fue posible consultar el catálogo.',
          );
        }

        setLibros(respuesta.data.items ?? []);
        setTotalLibros(respuesta.data.totalItems);
        setTotalPaginas(
          Math.max(respuesta.data.totalPages, 1),
        );
      })
      .catch((errorDesconocido: unknown) => {
        if (consultaCancelada) {
          return;
        }

        const mensaje =
          errorDesconocido instanceof Error
            ? errorDesconocido.message
            : 'No fue posible consultar el catálogo.';

        const sinResultados = mensaje
          .toLowerCase()
          .includes('registro no encontrado');

        if (sinResultados) {
          setLibros([]);
          setTotalLibros(0);
          setTotalPaginas(1);
          setError(null);
          return;
        }

        setLibros([]);
        setTotalLibros(0);
        setTotalPaginas(1);
        setError(mensaje);
      })
      .finally(() => {
        if (!consultaCancelada) {
          setCargando(false);
        }
      });

    return () => {
      consultaCancelada = true;
    };
  }, [criterios]);

  const buscarLibros = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    setCargando(true);
    setError(null);

    setCriterios({
      termino: textoBusqueda.trim(),
      pagina: 1,
    });
  };

  const limpiarBusqueda = (): void => {
    setCargando(true);
    setError(null);
    setTextoBusqueda('');

    setCriterios({
      termino: '',
      pagina: 1,
    });
  };

  const cambiarPagina = (pagina: number): void => {
    if (pagina < 1 || pagina > totalPaginas) {
      return;
    }

    setCargando(true);
    setError(null);

    setCriterios((criteriosActuales) => ({
      ...criteriosActuales,
      pagina,
    }));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const agregarLibroAlCarrito = (
    libro: Libro,
  ): void => {
    agregarProducto({
      libroId: libro.id,
      titulo: libro.titulo,
      imagenUrl: libro.imagenUrl ?? '',
      precio: libro.precio,
      stock: libro.stock,
    });
  };

  return (
    <main className="catalogo">
      <header>
        <h1>Catálogo</h1>

        <p>
          Explora todos los libros disponibles en Letra Libre.
        </p>
      </header>

      <form
        className="catalogo__busqueda"
        onSubmit={buscarLibros}
      >
        <label
          className="catalogo__busqueda-etiqueta"
          htmlFor="busqueda-libros"
        >
          Buscar libros
        </label>

        <div className="catalogo__busqueda-controles">
          <input
            id="busqueda-libros"
            className="catalogo__busqueda-input"
            type="search"
            value={textoBusqueda}
            placeholder="Buscar por título, autor o categoría"
            autoComplete="off"
            onChange={(event) =>
              setTextoBusqueda(event.target.value)
            }
          />

          <button
            className="button button--primary"
            type="submit"
          >
            Buscar
          </button>

          {(textoBusqueda || criterios.termino) && (
            <button
              className="button button--secondary"
              type="button"
              onClick={limpiarBusqueda}
            >
              Limpiar
            </button>
          )}
        </div>
      </form>

      {!cargando && !error && (
        <p className="catalogo__resultados-info">
          {criterios.termino ? (
            <>
              {totalLibros}{' '}
              {totalLibros === 1
                ? 'resultado encontrado'
                : 'resultados encontrados'}{' '}
              para <strong>“{criterios.termino}”</strong>
            </>
          ) : (
            <>
              {totalLibros}{' '}
              {totalLibros === 1
                ? 'libro disponible'
                : 'libros disponibles'}
            </>
          )}
        </p>
      )}

      {cargando && (
        <section className="common-state">
          <div
            className="loading-spinner"
            aria-hidden="true"
          />

          <h2 className="common-state__title">
            Cargando libros
          </h2>

          <p className="common-state__description">
            Estamos consultando el catálogo.
          </p>
        </section>
      )}

      {!cargando && error && (
        <section className="common-state common-state--error">
          <h2 className="common-state__title">
            No se pudo cargar el catálogo
          </h2>

          <p className="common-state__description">
            {error}
          </p>

          <button
            className="button button--primary common-state__action"
            type="button"
            onClick={() => {
              setCargando(true);
              setError(null);

              setCriterios((criteriosActuales) => ({
                ...criteriosActuales,
              }));
            }}
          >
            Intentar nuevamente
          </button>
        </section>
      )}

      {!cargando && !error && libros.length === 0 && (
        <section className="common-state">
          <h2 className="common-state__title">
            No encontramos libros
          </h2>

          <p className="common-state__description">
            Prueba con otro título, autor o categoría.
          </p>

          <button
            className="button button--primary common-state__action"
            type="button"
            onClick={limpiarBusqueda}
          >
            Ver todo el catálogo
          </button>
        </section>
      )}

      {!cargando && !error && libros.length > 0 && (
        <>
          <section
            className="catalogo__grid"
            aria-label="Libros del catálogo"
          >
            {libros.map((libro) => (
              <TarjetaLibro
                key={libro.id}
                libro={libro}
                alAgregarCarrito={
                  agregarLibroAlCarrito
                }
              />
            ))}
          </section>

          <nav
            className="catalogo__paginacion"
            aria-label="Paginación del catálogo"
          >
            <button
              className="button button--secondary"
              type="button"
              disabled={criterios.pagina === 1}
              onClick={() =>
                cambiarPagina(criterios.pagina - 1)
              }
            >
              ← Anterior
            </button>

            <span className="catalogo__pagina-actual">
              Página <strong>{criterios.pagina}</strong> de{' '}
              <strong>{totalPaginas}</strong>
            </span>

            <button
              className="button button--secondary"
              type="button"
              disabled={
                criterios.pagina === totalPaginas
              }
              onClick={() =>
                cambiarPagina(criterios.pagina + 1)
              }
            >
              Siguiente →
            </button>
          </nav>
        </>
      )}
    </main>
  );
}

export default PaginaCatalogo;
