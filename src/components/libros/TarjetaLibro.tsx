import { useState } from "react";
import type { Libro } from "../../types";
import { Link } from "react-router-dom";
import '../../styles/libros.css'; 
import { formateadorPrecio } from "./formato";


interface PropiedadesTarjetaLibro{
    libro: Libro;
    alAgregarCarrito?: (libro: Libro) => void;
}


export function TarjetaLibro({libro, alAgregarCarrito,}: PropiedadesTarjetaLibro){
    const[imagenConError, setImagenConError] = useState(false);
    const sinStock = libro.stock <= 0;

    return(
        <article className="libro-card">
            <div className="libro-card__portada">
                {sinStock && <span className="libro-card__badge-sin-stock">Agotado</span>}
                {!imagenConError && libro.imagenUrl ? (
                    <img 
                        src= {libro.imagenUrl}
                        alt={`Portada de ${libro.titulo}`} 
                        onError={() => setImagenConError(true)}   
                    />
                ) : (
                    <div className="libro-card__portada-alt" aria-hidden = "true">
                        <span>{libro.titulo.charAt(0).toUpperCase()}</span>
                    </div>
                )}
            </div>

            <div className="libro-card__info">
                <h3 className="libro-card__titulo">{libro.titulo}</h3>
                <p className="libro-card__autor">{libro.autor}</p>
                <p className="libro-card__precio">{formateadorPrecio.format(libro.precio)}</p>


                <div className="libro-card__acciones">
  <Link to={`/libros/${libro.id}`} className="libro-card__boton-detalle">
    Ver detalles
  </Link>
  <button
    type="button"
    className="libro-card__boton-carrito"
    disabled={sinStock}
    onClick={() => alAgregarCarrito?.(libro)}
    aria-label="Agregar al carrito"
  >
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  </button>
</div>
            </div>
        </article>
    )

}