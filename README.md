# Letra Libre — Frontend

Frontend de una tienda virtual de libros desarrollado con React, TypeScript y Vite.

La aplicación permite consultar libros, realizar búsquedas, administrar un carrito, crear pedidos y completar pagos de prueba mediante Stripe.

## Funcionalidades

- Página principal.
- Catálogo con portadas.
- Búsqueda por título, autor y categoría.
- Paginación del catálogo.
- Detalle de libros.
- Carrito persistente mediante `localStorage`.
- Control de cantidades según el stock.
- Checkout y creación de pedidos.
- Historial y detalle de pedidos.
- Recuperación de pagos pendientes.
- Integración con Stripe Checkout.
- Pago exitoso y pago cancelado.
- Importes mostrados en lempiras.
- Diseño adaptable a dispositivos móviles.

## Tecnologías

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS
- Context API

## Requisitos

- Node.js
- npm
- Backend de Letra Libre ejecutándose en:

```text
http://localhost:5168