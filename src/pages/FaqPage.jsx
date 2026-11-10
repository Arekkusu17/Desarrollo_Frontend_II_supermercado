const questions = [
    [
        '¿Qué es Mercado Vecino?',
        'Es una propuesta ficticia de supermercado desarrollada como proyecto académico. Su identidad está inspirada en la cercanía de un mercado de barrio.',
    ],
    [
        '¿Qué productos forman parte de la propuesta?',
        'La selección se organiza en frutas y verduras, despensa y panadería. Los departamentos presentados en el inicio son ilustrativos.',
    ],
    [
        '¿Puedo comprar productos desde este sitio?',
        'Esta versión es informativa y no permite realizar compras, pagos ni pedidos en línea.',
    ],
    [
        '¿Dónde puedo conocer más sobre el supermercado?',
        'En la sección Quiénes somos encontrarás nuestra propuesta, los valores de la marca y el propósito del proyecto. Puedes acceder desde el menú inferior.',
    ],
    [
        '¿Los productos, locales y servicios son reales?',
        'No. Mercado Vecino es una marca de demostración y no representa una tienda operativa. No se publican direcciones ni canales de atención reales.',
    ],
];

export default function FaqPage() {
    return (
        <>
            <section className="page-intro">
                <p className="eyebrow">PREGUNTAS FRECUENTES</p>
                <h1>
                    Las cosas claras,
                    <br />
                    desde el principio<span>.</span>
                </h1>
                <p>
                    Conoce nuestra propuesta y encuentra respuestas antes de recorrer Mercado
                    Vecino.
                </p>
            </section>
            <section className="faq-layout section-space" aria-labelledby="faq-title">
                <div>
                    <p className="eyebrow">TE AYUDAMOS</p>
                    <h2 id="faq-title">Lo que necesitas saber.</h2>
                </div>
                <div className="faq-list">
                    {questions.map(([question, answer], index) => (
                        <details key={question}>
                            <summary>
                                <span className="question-number">0{index + 1}</span>
                                {question}
                                <span className="question-toggle" aria-hidden="true">
                                    +
                                </span>
                            </summary>
                            <p>{answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
