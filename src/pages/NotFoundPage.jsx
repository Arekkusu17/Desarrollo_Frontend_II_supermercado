import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <section className="page-intro not-found">
            <p className="eyebrow">ERROR 404</p>
            <h1>
                Por aquí no era<span>.</span>
            </h1>
            <p>
                La página que buscas no está disponible. Vuelve al inicio para seguir recorriendo
                Mercado Vecino.
            </p>
            <Link className="button" to="/">
                Volver al inicio <span aria-hidden="true">↗</span>
            </Link>
        </section>
    );
}
