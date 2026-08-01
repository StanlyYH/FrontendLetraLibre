function App() {
  return (
    <main className="page">
      <div className="container">
        <section className="page__header">
          <p className="page__description">Proyecto universitario</p>

          <h1 className="page__title">Letra Libre</h1>

          <p className="page__description">
            Una tienda digital para descubrir, comprar y disfrutar nuevos
            libros.
          </p>
        </section>

        <section className="surface" style={{ padding: '32px' }}>
          <h2>Frontend configurado correctamente</h2>

          <p className="page__description">
            React, TypeScript, Vite, Axios y React Router DOM están listos para
            comenzar.
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;