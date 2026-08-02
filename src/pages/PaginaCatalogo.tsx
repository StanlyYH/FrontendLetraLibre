import { useEffect, useState } from "react";
import type { Libro } from "../types";
import { TarjetaLibro } from "../components/libros/TarjetaLibro";
import { obtenerLibros } from "../api/librosApi";

function PaginaCatalogo(){
    const [libros, setLibros] = useState<Libro[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerLibros()
            .then((respuesta) => {
                setLibros(respuesta.data?.items ?? []);
                setError(null);
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div className="catalogo">
            <h1>Catálogo</h1>
            <p>Explora todos los libros disponibles en Letra Libre</p>

            {cargando && <p>Cargando libros...</p>}
            {error && <p style={{ color: 'var(--danger)'}}>{error}</p>}

            {!cargando && !error && libros.length === 0 &&(
                <p>No hay libros disponibles por ahora.</p>
            )}

            {!cargando &&  !error && libros.length> 0 &&(
                <div className="catalogo__grid">
                    {libros.map((libro) => (
                        <TarjetaLibro key={libro.id} libro={libro}/>
                    ))}
                </div>
            )}
        </div>
    )

}



export default PaginaCatalogo;