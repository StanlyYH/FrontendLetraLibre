import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InicioPage from '../pages/InicioPage';
import NotFoundPage from '../pages/NotFoundPage';
import PaginaTemporal from '../pages/PaginaTemporal';
import PaginaCatalogo from '../pages/PaginaCatalogo';
import CarritoPage from '../pages/CarritoPage';
import CheckoutPage from '../pages/CheckoutPage';
import DetallePedidoPage from '../pages/DetallePedidoPage';
import PedidosPage from '../pages/PedidosPage';

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
              element={<CarritoPage />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/pedidos"
            element={<PedidosPage />}
          />

          <Route
            path="/pedidos/:id"
            element={<DetallePedidoPage />}
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