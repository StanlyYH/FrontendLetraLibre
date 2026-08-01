interface PaginaTemporalProps {
  title: string;
  description: string;
}

function PaginaTemporal({ title, description }: PaginaTemporalProps) {
  return (
    <div className="page">
      <div className="container">
        <header className="page__header">
          <h1 className="page__title">{title}</h1>
          <p className="page__description">{description}</p>
        </header>

        <section className="surface" style={{ padding: '32px' }}>
          <h2>Módulo pendiente</h2>

          <p className="page__description">
            La ruta está configurada correctamente. El contenido será agregado
            en la rama del integrante responsable.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PaginaTemporal;