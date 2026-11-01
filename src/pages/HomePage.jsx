import { Link } from 'react-router-dom';

const departments = [
    {
        number: '01',
        name: 'Frutas y verduras',
        description: 'Color y frescura para tu mesa.',
        className: 'produce',
    },
    {
        number: '02',
        name: 'Despensa',
        description: 'Los básicos que siempre acompañan.',
        className: 'pantry',
    },
    {
        number: '03',
        name: 'Panadería',
        description: 'Una pausa con sabor a hogar.',
        className: 'bakery',
    },
];

export default function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <p className="eyebrow">TU MERCADO DE TODOS LOS DÍAS</p>
                    <h1>
                        Lo bueno empieza
                        <br />
                        cerca de ti<span>.</span>
                    </h1>
                    <p>
                        Ingredientes para compartir, básicos para tu hogar y una forma más cercana
                        de vivir el supermercado.
                    </p>
                    <Link className="button" to="/quienes-somos">
                        Conoce Mercado Vecino <span aria-hidden="true">↗</span>
                    </Link>
                    <span className="hero-caption">De nuestra selección a tu mesa.</span>
                </div>
                <div className="hero-art" aria-hidden="true">
                    <div className="art-label">
                        SELECCIÓN VECINA <span>✳</span>
                    </div>
                    <div className="leaf leaf-one" />
                    <div className="leaf leaf-two" />
                    <div className="leaf leaf-three" />
                    <div className="bag">
                        <span>
                            mercado
                            <br />
                            <strong>vecino</strong>
                        </span>
                        <div className="bag-mark">✳</div>
                    </div>
                    <div className="orange orange-one" />
                    <div className="orange orange-two" />
                    <div className="art-stamp">
                        FRESCO
                        <br />Y SIMPLE
                    </div>
                    <span className="art-caption">UN POCO DE TODO. MUCHO DE LO BUENO.</span>
                </div>
            </section>
            <section className="departments section-space" aria-labelledby="departments-title">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">PARA CADA MOMENTO</p>
                        <h2 id="departments-title">Todo parte con una buena selección.</h2>
                    </div>
                    <span className="section-aside">Explora nuestros departamentos</span>
                </div>
                <div className="department-grid">
                    {departments.map((department) => (
                        <article
                            className={`department ${department.className}`}
                            key={department.number}
                        >
                            <span className="department-number">{department.number} /</span>
                            <h3>{department.name}</h3>
                            <p>{department.description}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="help-strip">
                <div>
                    <p className="eyebrow">ESTAMOS PARA ORIENTARTE</p>
                    <h2>Tu próxima visita, más simple.</h2>
                </div>
                <Link className="text-link" to="/preguntas-frecuentes">
                    Resuelve tus dudas <span aria-hidden="true">↗</span>
                </Link>
            </section>
        </>
    );
}
