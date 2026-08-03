import { NavLink } from 'react-router-dom';

import { useCarrito } from '../../hooks/useCarrito';

const getLinkClassName = ({
  isActive,
}: {
  isActive: boolean;
}) =>
  isActive
    ? 'header__link header__link--active'
    : 'header__link';

const getCartLinkClassName = ({
  isActive,
}: {
  isActive: boolean;
}) =>
  isActive
    ? 'header__link header__link--cart header__link--active'
    : 'header__link header__link--cart';

function Header() {
  const { cantidadTotal } = useCarrito();

  const indicadorCarrito =
    cantidadTotal > 9 ? '9+' : cantidadTotal.toString();

  return (
    <header className="header">
      <div className="container header__content">
        <NavLink className="header__brand" to="/">
          Letra Libre
        </NavLink>

        <nav
          className="header__navigation"
          aria-label="Navegación principal"
        >
          <NavLink className={getLinkClassName} to="/" end>
            Inicio
          </NavLink>

          <NavLink
            className={getLinkClassName}
            to="/catalogo"
          >
            Catálogo
          </NavLink>

          <NavLink
            className={getLinkClassName}
            to="/pedidos"
          >
            Pedidos
          </NavLink>

          <NavLink
            className={getCartLinkClassName}
            to="/carrito"
          >
            <span>Carrito</span>

            {cantidadTotal > 0 && (
              <span
                className="header__cart-count"
                aria-label={`${cantidadTotal} unidades en el carrito`}
              >
                {indicadorCarrito}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
