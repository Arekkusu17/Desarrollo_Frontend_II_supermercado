import { useEffect, useRef } from 'react';
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav.jsx';
import InventoryNav from './InventoryNav.jsx';

const pageTitles = {
    '/': 'Inicio',
    '/inventario': 'Inventario',
    '/inventario/nuevo': 'Ingresar artículo',
    '/carrito': 'Carrito',
    '/quienes-somos': 'Quiénes somos',
    '/preguntas-frecuentes': 'Preguntas frecuentes',
};

export default function Layout() {
    const { pathname } = useLocation();
    const mainRef = useRef(null);
    const previousPath = useRef(pathname);

    useEffect(() => {
        const title =
            pageTitles[pathname] ??
            (matchPath('/inventario/:id', pathname)
                ? 'Detalle del artículo'
                : 'Página no encontrada');
        document.title = `${title} | Mercado Vecino`;
        if (previousPath.current !== pathname) {
            window.scrollTo(0, 0);
            mainRef.current?.focus({ preventScroll: true });
            previousPath.current = pathname;
        }
    }, [pathname]);

    return (
        <>
            <a
                className="skip-link"
                href="#main-content"
                onClick={(event) => {
                    event.preventDefault();
                    mainRef.current?.focus();
                }}
            >
                Saltar al contenido
            </a>
            <header className="site-header">
                <Link className="brand" to="/" aria-label="Mercado Vecino, inicio">
                    <img
                        src={`${import.meta.env.BASE_URL}favicon.svg`}
                        width="42"
                        height="42"
                        alt=""
                    />
                    <span>
                        mercado<span className="brand-light">vecino</span>
                        <small>BUENO, FRESCO Y CERCANO</small>
                    </span>
                </Link>
                <span className="header-note">Lo cotidiano, bien elegido.</span>
            </header>
            <InventoryNav />
            <main id="main-content" ref={mainRef} tabIndex={-1}>
                <Outlet />
            </main>
            <footer className="site-footer">
                <span>Mercado Vecino</span>
            </footer>
            <BottomNav />
        </>
    );
}
