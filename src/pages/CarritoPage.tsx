import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCarrito } from '../hooks/useCarrito';

import type { CarritoItem } from '../types/carrito.types';

import '../styles/carrito.css';

const formateadorMoneda = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
});

interface PortadaCarritoProps {
  item: CarritoItem;
}

function PortadaCarrito({ item }: PortadaCarritoProps) {
  const [imagenConError, setImagenConError] = useState(false);

  if (!item.imagenUrl || imagenConError) {
    return (
      <div
        className="carrito-item__portada-alternativa"
        aria-hidden="true"
      >
        {item.titulo.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      className="carrito-item__imagen"
      src={item.imagenUrl}
      alt={`Portada de ${item.titulo}`}
      onError={() => setImagenConError(true)}
    />
  );
}

function CarritoPage() {
  const {
    items,
    cantidadTotal,
    subtotal,
    estaVacio,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const confirmarVaciado = (): void => {
    const confirmado = window.confirm(
      '¿Seguro que deseas eliminar todos los productos del carrito?',
    );

    if (confirmado) {
      vaciarCarrito();
    }
  };

  return (
    <main className="page">
      <div className="container">
        <header className="page__header">
          <h1 className="page__title">Tu carrito</h1>

          <p className="page__description">
            Revisa los libros seleccionados y ajusta las cantidades
            antes de continuar con tu pedido.
          </p>
        </header>

        {estaVacio ? (
          <section className="common-state">
            <h2 className="common-state__title">
              Tu carrito está vacío
            </h2>

            <p className="common-state__description">
              Explora nuestro catálogo y agrega los libros que deseas
              comprar.
            </p>

            <Link
              className="button button--primary common-state__action"
              to="/catalogo"
            >
              Explorar catálogo
            </Link>
          </section>
        ) : (
          <div className="carrito-layout">
            <section
              className="carrito-lista"
              aria-label="Productos del carrito"
            >
              {items.map((item) => (
                <article
                  className="surface carrito-item"
                  key={item.libroId}
                >
                  <div className="carrito-item__portada">
                    <PortadaCarrito item={item} />
                  </div>

                  <div className="carrito-item__contenido">
                    <div className="carrito-item__encabezado">
                      <div>
                        <h2 className="carrito-item__titulo">
                          {item.titulo}
                        </h2>

                        <p className="carrito-item__stock">
                          {item.stock} unidades disponibles
                        </p>
                      </div>

                      <strong className="carrito-item__precio">
                        {formateadorMoneda.format(item.precio)}
                      </strong>
                    </div>

                    <div className="carrito-item__pie">
                      <div
                        className="carrito-cantidad"
                        aria-label={`Cantidad de ${item.titulo}`}
                      >
                        <button
                          type="button"
                          className="carrito-cantidad__boton"
                          disabled={item.cantidad <= 1}
                          onClick={() =>
                            disminuirCantidad(item.libroId)
                          }
                          aria-label={`Disminuir cantidad de ${item.titulo}`}
                        >
                          −
                        </button>

                        <span className="carrito-cantidad__valor">
                          {item.cantidad}
                        </span>

                        <button
                          type="button"
                          className="carrito-cantidad__boton"
                          disabled={item.cantidad >= item.stock}
                          onClick={() =>
                            aumentarCantidad(item.libroId)
                          }
                          aria-label={`Aumentar cantidad de ${item.titulo}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="carrito-item__acciones">
                        <span className="carrito-item__total">
                          {formateadorMoneda.format(
                            item.precio * item.cantidad,
                          )}
                        </span>

                        <button
                          type="button"
                          className="carrito-item__eliminar"
                          onClick={() =>
                            eliminarProducto(item.libroId)
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="surface carrito-resumen">
              <h2 className="carrito-resumen__titulo">
                Resumen
              </h2>

              <div className="carrito-resumen__fila">
                <span>Productos diferentes</span>
                <strong>{items.length}</strong>
              </div>

              <div className="carrito-resumen__fila">
                <span>Unidades</span>
                <strong>{cantidadTotal}</strong>
              </div>

              <div className="carrito-resumen__fila">
                <span>Envío</span>
                <span>Se calcula después</span>
              </div>

              <div className="carrito-resumen__total">
                <span>Subtotal</span>
                <strong>
                  {formateadorMoneda.format(subtotal)}
                </strong>
              </div>

              <Link
                className="button button--primary carrito-resumen__accion"
                to="/checkout"
              >
                Continuar al checkout
              </Link>

              <Link
                className="button button--secondary carrito-resumen__accion"
                to="/catalogo"
              >
                Seguir comprando
              </Link>

              <button
                type="button"
                className="carrito-resumen__vaciar"
                onClick={confirmarVaciado}
              >
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CarritoPage;