import { Link } from 'react-router-dom';
import CartQuantityControls from '../components/CartQuantityControls.jsx';
import { useInventory } from '../context/InventoryContext.jsx';
import { formatPrice } from '../utils/inventory.js';

export default function CartPage() {
    const { articles, cart } = useInventory();
    const articlesById = new Map(articles.map((article) => [article.id, article]));
    const cartItems = cart.map(({ articleId, quantity }) => {
        const article = articlesById.get(articleId);
        const subtotal = BigInt(article.price) * BigInt(quantity);
        return { article, quantity, subtotal };
    });
    const totalUnits = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.subtotal, 0n);

    return (
        <section className="py-9 md:py-12">
            <p className="eyebrow">GESTIÓN DE INVENTARIO</p>
            <h1 className="mb-3 text-4xl md:text-5xl">
                Carrito<span>.</span>
            </h1>
            <Link to="/inventario" className="text-sm underline underline-offset-4">
                Ver inventario
            </Link>

            <div className="mt-6 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_16rem]">
                {cart.length === 0 ? (
                    <p className="rounded-xl border border-market-line bg-market-paper p-5 text-sm text-market-muted">
                        El carrito está vacío.
                    </p>
                ) : (
                    <ul className="divide-y divide-market-line rounded-xl border border-market-line bg-market-paper">
                        {cartItems.map(({ article, quantity, subtotal }) => (
                            <li
                                key={article.id}
                                className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5"
                            >
                                <div className="min-w-0 flex-1 basis-48">
                                    <h2 className="text-xl wrap-break-word">
                                        <Link
                                            to={`/inventario/${article.id}`}
                                            className="underline underline-offset-4"
                                        >
                                            {article.name}
                                        </Link>
                                    </h2>
                                    <p className="mt-1 text-sm text-market-muted wrap-break-word">
                                        {article.brand} · {article.type}
                                    </p>
                                    <p className="mt-1 text-sm text-market-muted">
                                        Stock disponible: {article.stock}.
                                    </p>
                                    <p className="mt-1 text-sm text-market-muted tabular-nums wrap-break-word">
                                        Precio unitario: {formatPrice(article.price)}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold tabular-nums wrap-break-word">
                                        Subtotal: {formatPrice(subtotal)}
                                    </p>
                                </div>
                                <CartQuantityControls article={article} quantity={quantity} />
                            </li>
                        ))}
                    </ul>
                )}
                <aside
                    className="rounded-xl border border-market-line bg-market-paper p-5"
                    aria-labelledby="cart-summary-title"
                >
                    <h2 id="cart-summary-title" className="mt-0 text-xl">
                        Resumen del carrito
                    </h2>
                    <div role="status">
                        <dl className="mt-4 space-y-3 text-sm">
                            <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-market-muted">Productos distintos</dt>
                                <dd className="font-medium tabular-nums">{cart.length}</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-market-muted">Total de unidades</dt>
                                <dd className="font-medium tabular-nums">{totalUnits}</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-3 border-t border-market-line pt-3 font-semibold">
                                <dt>Total</dt>
                                <dd className="min-w-0 text-right text-lg tabular-nums wrap-break-word">
                                    {formatPrice(totalPrice)}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>
        </section>
    );
}
