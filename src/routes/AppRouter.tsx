import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InicioPage from '../pages/InicioPage';
import NotFoundPage from '../pages/NotFoundPage';
import PaginaTemporal from '../pages/PaginaTemporal';
import PaginaCatalogo from '../pages/PaginaCatalogo';
import CarritoPruebaPage from '../pages/CarritoPruebaPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InicioPage />} />

          <Route
            path="/catalogo" 
            element={<PaginaCatalogo/>}
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
              element={<CarritoPruebaPage />}
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

          <Route
            path="/pago/:pedidoId"
            element={
              <PaginaTemporal
                title="Realizar pago"
                description="Revisa el resumen y continúa con el pago seguro."
              />
            }
          />

          <Route
            path="/pago-exitoso"
            element={
              <PaginaTemporal
                title="Confirmando pago"
                description="Estamos verificando el resultado del pago con el servidor."
              />
            }
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