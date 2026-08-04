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
          <svg
            className="header__brand-icon"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="14" fill="currentColor" />
            <path
              d="M32 20c-4.5-3.2-10.5-4.2-16-3v26c5.5-1.2 11.5-0.2 16 3
                 4.5-3.2 10.5-4.2 16-3V17c-5.5-1.2-11.5-0.2-16 3z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <line x1="32" y1="20" x2="32" y2="46" stroke="#ffffff" strokeWidth="4" />
          </svg>

          <span>Letra Libre</span>
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