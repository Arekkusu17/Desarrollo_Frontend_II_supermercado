import { Link } from 'react-router-dom';

export default function NotFoundPage({
    title = 'Por aquí no era',
    description = 'La página que buscas no está disponible. Vuelve al inicio para seguir recorriendo Mercado Vecino.',
    backTo = '/',
    backLabel = 'Volver al inicio',
} = {}) {
    return (
        <section className="page-intro not-found">
            <p className="eyebrow">ERROR 404</p>
            <h1>
                {title}
                <span>.</span>
            </h1>
            <p>{description}</p>
            <Link className="button" to={backTo}>
                {backLabel} <span aria-hidden="true">↗</span>
            </Link>
        </section>
    );
}
