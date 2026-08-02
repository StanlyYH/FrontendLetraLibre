import { useCarrito } from '../hooks/useCarrito';
import type { ProductoParaCarrito } from '../types/carrito.types';

const libroPruebaUno: ProductoParaCarrito = {
  libroId: 'libro-prueba-001',
  titulo: 'Cien años de soledad',
  imagenUrl: 'https://placehold.co/160x220?text=Libro+1',
  precio: 350,
  stock: 3,
};

const libroPruebaDos: ProductoParaCarrito = {
  libroId: 'libro-prueba-002',
  titulo: 'El principito',
  imagenUrl: 'https://placehold.co/160x220?text=Libro+2',
  precio: 225,
  stock: 2,
};

function formatearMoneda(valor: number): string {
  return new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL',
    minimumFractionDigits: 2,
  }).format(valor);
}

function CarritoPruebaPage() {
  const {
    items,
    cantidadTotal,
    subtotal,
    estaVacio,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const confirmarVaciado = (): void => {
    const confirmado = window.confirm(
      '¿Seguro que deseas vaciar el carrito de prueba?',
    );

    if (confirmado) {
      vaciarCarrito();
    }
  };

  return (
    <main className="page">
      <div className="container">
        <header className="page__header">
          <h1 className="page__title">
            Prueba del carrito
          </h1>

          <p className="page__description">
            Esta pantalla es temporal y sirve para comprobar el
            funcionamiento del CarritoContext.
          </p>
        </header>

        <section
          className="surface"
          style={{
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2>Agregar productos de prueba</h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              className="button button--primary"
              type="button"
              onClick={() =>
                agregarProducto(libroPruebaUno)
              }
            >
              Agregar Cien años de soledad
            </button>

            <button
              className="button button--primary"
              type="button"
              onClick={() =>
                agregarProducto(libroPruebaDos)
              }
            >
              Agregar El principito
            </button>

            <button
              className="button button--secondary"
              type="button"
              disabled={estaVacio}
              onClick={confirmarVaciado}
            >
              Vaciar carrito
            </button>
          </div>
        </section>

        <section
          className="surface"
          style={{
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2>Resumen del contexto</h2>

          <p>
            Productos diferentes: <strong>{items.length}</strong>
          </p>

          <p>
            Unidades totales: <strong>{cantidadTotal}</strong>
          </p>

          <p>
            Subtotal:{' '}
            <strong>{formatearMoneda(subtotal)}</strong>
          </p>

          <p>
            Estado:{' '}
            <strong>
              {estaVacio
                ? 'Carrito vacío'
                : 'Carrito con productos'}
            </strong>
          </p>
        </section>

        {estaVacio ? (
          <section
            className="surface"
            style={{ padding: '24px' }}
          >
            <h2>El carrito está vacío</h2>

            <p>
              Agrega uno de los productos de prueba para comenzar.
            </p>
          </section>
        ) : (
          <section>
            <h2>Productos almacenados</h2>

            <div
              style={{
                display: 'grid',
                gap: '16px',
              }}
            >
              {items.map((item) => (
                <article
                  className="surface"
                  key={item.libroId}
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'minmax(100px, 140px) 1fr',
                    gap: '20px',
                    padding: '20px',
                  }}
                >
                  <img
                    src={item.imagenUrl}
                    alt={`Portada de ${item.titulo}`}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                    }}
                  />

                  <div>
                    <h3>{item.titulo}</h3>

                    <p>
                      ID: <code>{item.libroId}</code>
                    </p>

                    <p>
                      Precio unitario:{' '}
                      <strong>
                        {formatearMoneda(item.precio)}
                      </strong>
                    </p>

                    <p>
                      Cantidad:{' '}
                      <strong>{item.cantidad}</strong>
                    </p>

                    <p>
                      Stock disponible:{' '}
                      <strong>{item.stock}</strong>
                    </p>

                    <p>
                      Total del producto:{' '}
                      <strong>
                        {formatearMoneda(
                          item.precio * item.cantidad,
                        )}
                      </strong>
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      <button
                        className="button button--secondary"
                        type="button"
                        disabled={item.cantidad <= 1}
                        onClick={() =>
                          disminuirCantidad(item.libroId)
                        }
                      >
                        −
                      </button>

                      <button
                        className="button button--secondary"
                        type="button"
                        disabled={
                          item.cantidad >= item.stock
                        }
                        onClick={() =>
                          aumentarCantidad(item.libroId)
                        }
                      >
                        +
                      </button>

                      <button
                        className="button button--secondary"
                        type="button"
                        onClick={() =>
                          eliminarProducto(item.libroId)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default CarritoPruebaPage;