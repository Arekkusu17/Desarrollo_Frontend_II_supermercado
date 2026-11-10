import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';

export default function InventoryPage() {
    const { articles } = useInventory();
    const location = useLocation();
    const [category, setCategory] = useState('');
    const categories = new Map(articles.map(({ type }) => [type.toLocaleLowerCase('es'), type]));
    const visibleArticles = category
        ? articles.filter(({ type }) => type.toLocaleLowerCase('es') === category)
        : articles;

    return (
        <>
            <section className="flex flex-wrap items-end justify-between gap-5 border-b border-market-line py-9 md:py-12">
                <div>
                    <p className="eyebrow">ARTÍCULOS DEL SUPERMERCADO</p>
                    <h1 className="text-4xl tracking-tight md:text-5xl">
                        Nuestro inventario<span>.</span>
                    </h1>
                    <p className="text-sm text-market-muted md:text-base">
                        Consulta las existencias de los productos de muestra y los artículos que
                        registres.
                    </p>
                </div>
                <Link
                    to="/inventario/nuevo"
                    className="inline-flex min-h-12 items-center gap-5 rounded-lg bg-market px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-market/90"
                >
                    Ingresar artículo <span aria-hidden="true">+</span>
                </Link>
            </section>
            <section className="py-9 md:py-12" aria-labelledby="inventory-list-title">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 id="inventory-list-title" className="text-2xl">
                        Artículos registrados
                    </h2>
                    <span
                        className="rounded-full bg-[#e8eddc] px-4 py-2 text-xs font-medium"
                        role="status"
                    >
                        {visibleArticles.length}{' '}
                        {visibleArticles.length === 1 ? 'artículo' : 'artículos'}
                    </span>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <label htmlFor="inventory-category" className="text-sm font-medium">
                        Filtrar por categoría
                    </label>
                    <select
                        id="inventory-category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="min-h-11 max-w-full rounded-lg border border-market-line bg-white px-3 py-2 text-sm"
                    >
                        <option value="">Todas</option>
                        {[...categories].map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className="overflow-x-auto rounded-xl border border-market-line bg-market-paper"
                    role="region"
                    aria-label="Tabla de inventario"
                    tabIndex={0}
                >
                    <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                        <caption className="sr-only">
                            Artículos con nombre, marca, tipo de producto y stock disponible
                        </caption>
                        <thead className="bg-market text-white">
                            <tr>
                                <th scope="col" className="w-16 px-5 py-4 font-medium">
                                    N.º
                                </th>
                                <th scope="col" className="px-5 py-4 font-medium">
                                    Nombre
                                </th>
                                <th scope="col" className="px-5 py-4 font-medium">
                                    Marca
                                </th>
                                <th scope="col" className="px-5 py-4 font-medium">
                                    Tipo de producto
                                </th>
                                <th scope="col" className="px-5 py-4 font-medium">
                                    Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleArticles.map((article, index) => (
                                <tr
                                    key={article.id}
                                    className="border-t border-market-line even:bg-[#f0f2e9]"
                                >
                                    <td className="px-5 py-5 text-xs text-market-muted tabular-nums">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <th
                                        scope="row"
                                        className="max-w-64 break-words px-5 py-5 font-medium"
                                    >
                                        <Link
                                            to={`/inventario/${article.id}`}
                                            state={{ inventoryLocation: location }}
                                            aria-haspopup="dialog"
                                            className="underline underline-offset-4"
                                        >
                                            {article.name}
                                        </Link>
                                    </th>
                                    <td className="max-w-56 break-words px-5 py-5 text-market-muted">
                                        {article.brand}
                                    </td>
                                    <td className="max-w-56 break-words px-5 py-5 text-market-muted">
                                        {article.type}
                                    </td>
                                    <td className="px-5 py-5 tabular-nums">{article.stock}</td>
                                </tr>
                            ))}
                            {articles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <p className="font-medium">
                                            Aún no hay artículos en el inventario.
                                        </p>
                                        <p className="mt-2 text-market-muted">
                                            Ingresa tu primer artículo para comenzar.
                                        </p>
                                        <Link
                                            to="/inventario/nuevo"
                                            className="mt-5 inline-block underline underline-offset-4"
                                        >
                                            Agregar el primer artículo ↗
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="mt-5 text-xs text-market-muted">
                    Al recargar la página, se restablece el inventario de muestra y se vacía el
                    carrito.
                </p>
            </section>
        </>
    );
}
