import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../components/layout/Layout';

import InicioPage from '../pages/InicioPage';
import NotFoundPage from '../pages/NotFoundPage';

import PaginaCatalogo from '../pages/PaginaCatalogo';
import PaginaDetalleLibro from '../pages/PaginaDetalleLibro';

import CarritoPage from '../pages/CarritoPage';
import CheckoutPage from '../pages/CheckoutPage';
import PedidosPage from '../pages/PedidosPage';
import DetallePedidoPage from '../pages/DetallePedidoPage';

import PagoPage from '../pages/PagoPage';
import PagoExitosoPage from '../pages/PagoExitosoPage';
import PagoCanceladoPage from '../pages/PagoCanceladoPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InicioPage />} />

          <Route
            path="/catalogo"
            element={<PaginaCatalogo />}
          />

          <Route
            path="/libros/:id"
            element={<PaginaDetalleLibro />}
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
            element={<PagoPage />}
          />

          <Route
            path="/pago-exitoso"
            element={<PagoExitosoPage />}
          />

          <Route
            path="/pago-cancelado"
            element={<PagoCanceladoPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
