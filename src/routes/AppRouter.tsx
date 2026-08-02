import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InicioPage from '../pages/InicioPage';
import NotFoundPage from '../pages/NotFoundPage';
import PaginaTemporal from '../pages/PaginaTemporal';
import PagoExitosoPage from '../pages/PagoExitosoPage';
import PagoPage from '../pages/PagoPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InicioPage />} />

          <Route
            path="/catalogo"
            element={
              <PaginaTemporal
                title="Catálogo"
                description="Explora todos los libros disponibles en Letra Libre."
              />
            }
          />

          <Route
            path="/libros/:id"
            element={
              <PaginaTemporal
                title="Detalle del libro"
                description="Consulta la información completa del libro seleccionado."
              />
            }
          />

          <Route
            path="/carrito"
            element={
              <PaginaTemporal
                title="Carrito"
                description="Revisa los libros agregados antes de continuar."
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <PaginaTemporal
                title="Finalizar pedido"
                description="Completa los datos necesarios para crear tu pedido."
              />
            }
          />

          <Route
            path="/pedidos"
            element={
              <PaginaTemporal
                title="Pedidos"
                description="Consulta el historial de pedidos registrados."
              />
            }
          />

          <Route
            path="/pedidos/:id"
            element={
              <PaginaTemporal
                title="Detalle del pedido"
                description="Consulta los productos, totales y estado del pedido."
              />
            }
          />

          <Route path="/pago/:pedidoId" element={<PagoPage />} />

          <Route
            path="/pago-exitoso"
            element={<PagoExitosoPage />}
          />

          <Route
            path="/pago-cancelado"
            element={
              <PaginaTemporal
                title="Pago cancelado"
                description="El pago fue cancelado y el carrito permanece disponible."
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;