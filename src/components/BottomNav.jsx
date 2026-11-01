import { NavLink } from 'react-router-dom';

const navigation = [
    { to: '/', label: 'Inicio', symbol: '⌂', end: true },
    { to: '/quienes-somos', label: 'Quiénes somos', symbol: '❋' },
    { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes', symbol: '?' },
];

export default function BottomNav() {
    return (
        <nav className="bottom-nav" aria-label="Navegación principal">
            {navigation.map(({ to, label, symbol, end }) => (
                <NavLink key={to} to={to} end={end}>
                    <span className="nav-symbol" aria-hidden="true">
                        {symbol}
                    </span>
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
