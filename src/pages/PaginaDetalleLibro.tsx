import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { obtenerLibroPorId } from '../api/librosApi';
import { formateadorPrecio } from '../components/libros';
import { useCarrito } from '../hooks/useCarrito';

import type { Libro } from '../types';

function PaginaDetalleLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarProducto } = useCarrito();

  const [libro, setLibro] = useState<Libro | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenConError, setImagenConError] = useState(false);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No se recibió el identificador del libro.');
      setCargando(false);
      return;
    }

    setCargando(true);
    setError(null);
    setAgregado(false);

    obtenerLibroPorId(id)
      .then((respuesta) => {
        if (!respuesta.status || !respuesta.data) {
          throw new Error(
            respuesta.message ||
              'No fue posible obtener la información del libro.',
          );
        }

        setLibro(respuesta.data);
      })
      .catch((errorDesconocido: unknown) => {
        const mensaje =
          errorDesconocido instanceof Error
            ? errorDesconocido.message
            : 'No fue posible consultar el libro.';

        setLibro(null);
        setError(mensaje);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  const agregarLibroAlCarrito = (): void => {
    if (!libro || libro.stock <= 0) {
      return;
    }

    agregarProducto({
      libroId: libro.id,
      titulo: libro.titulo,
      imagenUrl: libro.imagenUrl ?? '',
      precio: libro.precio,
      stock: libro.stock,
    });

    setAgregado(true);
  };

  const sinStock = libro ? libro.stock <= 0 : false;

  return (
    <main className="catalogo">
      {cargando && <p>Cargando libro...</p>}

      {!cargando && error && (
        <section className="detalle-libro__no-encontrado">
          <h1>No pudimos encontrar este libro</h1>

          <p>{error}</p>

          <Link
            to="/catalogo"
            className="libro-card__boton-detalle"
          >
            Volver al catálogo
          </Link>
        </section>
      )}

      {!cargando && !error && libro && (
        <section className="detalle-libro">
          <button
            type="button"
            className="detalle-libro__volver"
            onClick={() => navigate('/catalogo')}
          >
            ← Volver al catálogo
          </button>

          <div className="detalle-libro__contenido">
            <div className="detalle-libro__portada">
              {!imagenConError && libro.imagenUrl ? (
                <img
                  src={libro.imagenUrl}
                  alt={`Portada de ${libro.titulo}`}
                  onError={() => setImagenConError(true)}
                />
              ) : (
                <div
                  className="libro-card__portada-alt"
                  aria-hidden="true"
                >
                  <span>
                    {libro.titulo.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="detalle-libro__info">
              <h1>{libro.titulo}</h1>

              <p className="detalle-libro__autor">
                {libro.autor}
              </p>

              <p className="detalle-libro__precio">
                {formateadorPrecio.format(libro.precio)}
              </p>

              {sinStock && (
                <span className="libro-card__badge-sin-stock">
                  Agotado
                </span>
              )}

              <p className="detalle-libro__descripcion">
                {libro.descripcion}
              </p>

              <dl className="detalle-libro__meta">
                <dt>Editorial</dt>
                <dd>{libro.editorial}</dd>

                <dt>Categoría</dt>
                <dd>{libro.categoria}</dd>

                <dt>ISBN</dt>
                <dd>{libro.isbn}</dd>

                <dt>Existencias</dt>
                <dd>{libro.stock}</dd>
              </dl>

              <button
                type="button"
                className="detalle-libro__boton-agregar"
                disabled={sinStock}
                onClick={agregarLibroAlCarrito}
              >
                {sinStock
                  ? 'Libro agotado'
                  : agregado
                    ? 'Agregado al carrito'
                    : 'Agregar al carrito'}
              </button>

              {agregado && (
                <Link
                  className="button button--secondary"
                  to="/carrito"
                  style={{ marginTop: '12px' }}
                >
                  Ver carrito
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default PaginaDetalleLibro;
