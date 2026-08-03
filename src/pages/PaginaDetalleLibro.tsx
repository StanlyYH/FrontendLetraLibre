import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Libro } from "../types";
import { obtenerLibroPorId } from "../api/librosApi";
import { formateadorPrecio } from "../components/libros";


function PaginaDetalleLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [libro, setLibro] = useState<Libro | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenConError, setImagenConError] = useState(false);

  useEffect(() => {
    if(!id) return;
    obtenerLibroPorId(id)
      .then((respuesta) => {
        setLibro(respuesta.data ?? null);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  const sinStock = libro ? libro.stock <= 0 : false;

  return (
    <div className="catalogo">
        {cargando && <p> Cargando libro...</p>}

        {error && (
            <div className="detalle-libro__no-encontrado">
                <h1>No pudimos encontrar este libro</h1>
                <p>{error}</p>
                <Link to="/catalogo" className="libro-card__boton-detalle">
                    Volver al catálogo
                </Link>
            </div>
        )}

        {!cargando && !error && libro &&(
            <div className="detalle-libro">
                <button
                    type="button"
                    className="detalle-libro__volver"
                    onClick={() => navigate('/catalogo')}
                >
                    ← Volver al catálogo
                </button>

                <div className="detalle-libro__contenido">
                    <div className="detalle-libro__portada">
                        {!imagenConError && libro.imagenUrl ?(
                            <img 
                                src={libro.imagenUrl} 
                                alt={`Portada ed ${libro.titulo}`}
                                onError={() => setImagenConError(true)} 
                            />
                        ) : (
                            <div className="libro-card__portada-alt" aria-hidden="true">
                                <span>{libro.titulo.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                    </div>

                    <div className="detalle-libro__info">
                        <h1>{libro.titulo}</h1>
                        <p className="detalle-libro__autor">{libro.autor}</p>

                        <p className="detalle-libro__precio">
                            {formateadorPrecio.format(libro.precio)}
                        </p>

                        {sinStock && <span className="libro-card__badge-sin-stock">Agotado</span>}

                        <p className="detalle-libro__descripcion">{libro.descripcion}</p>

                        <dl className="detalle-libro__meta">
                            <dt>Editorial</dt>
                            <dt>{libro.editorial}</dt>
                            <dt>Categoria</dt>
                            <dt>{libro.categoria}</dt>
                            <dt>ISBN</dt>
                            <dt>{libro.isbn}</dt>
                        </dl>

                        <button
                            type="button"
                            className="detalle-libro__boton-agregar"
                            disabled={sinStock}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default PaginaDetalleLibro;
