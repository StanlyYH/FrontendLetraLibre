import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../../styles/layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <Header />

      <main className="app-layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;