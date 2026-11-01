import { useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav.jsx';
import InventoryNav from './InventoryNav.jsx';

const pageTitles = {
    '/': 'Inicio',
    '/inventario': 'Inventario',
    '/inventario/nuevo': 'Ingresar artículo',
    '/quienes-somos': 'Quiénes somos',
    '/preguntas-frecuentes': 'Preguntas frecuentes',
};

export default function Layout() {
    const { pathname } = useLocation();
    const mainRef = useRef(null);
    const previousPath = useRef(pathname);

    useEffect(() => {
        document.title = `${pageTitles[pathname] ?? 'Página no encontrada'} | Mercado Vecino`;
        if (previousPath.current !== pathname) {
            window.scrollTo(0, 0);
            mainRef.current?.focus({ preventScroll: true });
            previousPath.current = pathname;
        }
    }, [pathname]);

    return (
        <>
            <a className="skip-link" href="#main-content">
                Saltar al contenido
            </a>
            <header className="site-header">
                <Link className="brand" to="/" aria-label="Mercado Vecino, inicio">
                    <img src="/favicon.svg" width="42" height="42" alt="" />
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
                <span>Proyecto académico · Supermercado ficticio</span>
            </footer>
            <BottomNav />
        </>
    );
}
