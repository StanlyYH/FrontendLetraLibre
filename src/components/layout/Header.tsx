import { NavLink } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'header__link header__link--active' : 'header__link';

function Header() {
  return (
    <header className="header">
      <div className="container header__content">
        <NavLink className="header__brand" to="/">
          Letra Libre
        </NavLink>

        <nav className="header__navigation" aria-label="Navegación principal">
          <NavLink className={getLinkClassName} to="/" end>
            Inicio
          </NavLink>

          <NavLink className={getLinkClassName} to="/catalogo">
            Catálogo
          </NavLink>

          <NavLink className={getLinkClassName} to="/pedidos">
            Pedidos
          </NavLink>

          <NavLink className={getLinkClassName} to="/carrito">
            Carrito
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;