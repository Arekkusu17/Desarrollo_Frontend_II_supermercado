import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <>
            <section className="page-intro">
                <p className="eyebrow">QUIÉNES SOMOS</p>
                <h1>
                    Un mercado con
                    <br />
                    espíritu de barrio<span>.</span>
                </h1>
                <p>
                    Mercado Vecino nace de una idea sencilla: hacer que las compras de cada día se
                    sientan más cercanas.
                </p>
            </section>
            <section className="story section-space">
                <div className="story-heading">
                    <span className="large-flower" aria-hidden="true">
                        ✳
                    </span>
                    <h2>Lo que nos mueve.</h2>
                </div>
                <div>
                    <p>
                        Somos una propuesta de supermercado pensada para acompañar la vida
                        cotidiana. Reunimos productos de despensa, frutas, verduras y panadería en
                        un espacio que invita a elegir con calma.
                    </p>
                    <p>
                        Creemos en la información clara, en una selección fácil de recorrer y en el
                        trato amable. Nuestra identidad combina lo práctico de un supermercado con
                        la calidez de un negocio de barrio.
                    </p>
                    <p className="academic-note">
                        Mercado Vecino es una marca ficticia creada para un proyecto académico. La
                        información de este sitio es demostrativa.
                    </p>
                </div>
            </section>
            <section className="values section-space" aria-label="Nuestros valores">
                <article>
                    <span>01 /</span>
                    <h3>Cercanía</h3>
                    <p>Una experiencia sencilla, con lenguaje claro y atención a los detalles.</p>
                </article>
                <article>
                    <span>02 /</span>
                    <h3>Selección</h3>
                    <p>
                        Departamentos organizados para encontrar lo que necesitas en tu día a día.
                    </p>
                </article>
                <article>
                    <span>03 /</span>
                    <h3>Transparencia</h3>
                    <p>
                        Información accesible para que puedas conocer nuestra propuesta antes de tu
                        visita.
                    </p>
                </article>
            </section>
            <section className="help-strip">
                <h2>Conócenos un poco más.</h2>
                <Link className="text-link" to="/preguntas-frecuentes">
                    Ver preguntas frecuentes <span aria-hidden="true">↗</span>
                </Link>
            </section>
        </>
    );
}
