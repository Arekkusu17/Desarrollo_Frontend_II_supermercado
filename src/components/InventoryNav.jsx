import { NavLink } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';

const linkClasses = ({ isActive }) =>
    `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        isActive ? 'bg-market text-white' : 'text-market-muted hover:bg-white hover:text-market'
    }`;

export default function InventoryNav() {
    const { articles, cart } = useInventory();
    const totalUnits = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-b border-market-line px-5 py-4 min-[641px]:px-7 min-[901px]:px-12">
            <span className="text-[10px] font-bold tracking-[0.18em] text-market-muted">
                GESTIÓN DE INVENTARIO
            </span>
            <nav className="flex flex-wrap gap-2" aria-label="Gestión de inventario">
                <NavLink className={linkClasses} to="/inventario" end>
                    Inventario
                    <span className="rounded-full border border-current/25 px-2 text-xs">
                        {articles.length}
                    </span>
                </NavLink>
                <NavLink className={linkClasses} to="/inventario/nuevo">
                    <span aria-hidden="true">+</span> Ingresar artículo
                </NavLink>
                <NavLink
                    className={linkClasses}
                    to="/carrito"
                    aria-label={`Carrito, ${totalUnits} ${totalUnits === 1 ? 'unidad' : 'unidades'}`}
                >
                    Carrito
                    <span className="relative" aria-hidden="true">
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M2 3h3l3 12h11l2-8H6" />
                            <circle cx="9" cy="20" r="1.25" />
                            <circle cx="18" cy="20" r="1.25" />
                        </svg>
                        {totalUnits > 0 && (
                            <span className="absolute -top-2 right-0 flex h-4 min-w-4 translate-x-1/2 items-center justify-center rounded-full bg-market-accent px-1 text-[10px] leading-none font-bold text-white tabular-nums ring-2 ring-market-paper">
                                {totalUnits}
                            </span>
                        )}
                    </span>
                </NavLink>
            </nav>
        </div>
    );
}
