function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__content">
        <p className="footer__text">
          © {currentYear} Letra Libre. Proyecto universitario.
        </p>

        <p className="footer__text">
          Desarrollado por Stanly, Darlan y Derick.
        </p>
      </div>
    </footer>
  );
}

export default Footer;