import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';

const quantityButton =
    'min-h-11 min-w-11 cursor-pointer rounded-lg border border-market-line bg-white px-3 font-semibold text-market hover:bg-market/10 disabled:cursor-not-allowed disabled:opacity-60';

export default function CartPage() {
    const { articles, cart, addToCart, removeFromCart } = useInventory();
    const articlesById = new Map(articles.map((article) => [article.id, article]));
    const totalUnits = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <section className="py-9 md:py-12">
            <p className="eyebrow">GESTIÓN DE INVENTARIO</p>
            <h1 className="mb-3 text-4xl md:text-5xl">
                Carrito<span>.</span>
            </h1>
            <p role="status" className="mb-4 text-sm text-market-muted">
                {cart.length === 0
                    ? 'El carrito está vacío.'
                    : `Unidades en el carrito: ${totalUnits}`}
            </p>
            <Link to="/inventario" className="text-sm underline underline-offset-4">
                Ver inventario
            </Link>

            <ul className="mt-6 grid gap-4">
                {cart.map(({ articleId, quantity }) => {
                    const article = articlesById.get(articleId);

                    return (
                        <li
                            key={articleId}
                            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-market-line bg-market-paper p-4 sm:p-5"
                        >
                            <div className="min-w-0 flex-1 basis-48">
                                <h2 className="text-xl wrap-break-word">
                                    <Link
                                        to={`/inventario/${articleId}`}
                                        className="underline underline-offset-4"
                                    >
                                        {article.name}
                                    </Link>
                                </h2>
                                <p className="mt-1 text-sm text-market-muted wrap-break-word">
                                    {article.brand} · {article.type}
                                </p>
                                <p className="mt-1 text-sm text-market-muted">
                                    Cantidad: {quantity}. Stock disponible: {article.stock}.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label={`Quitar una unidad de ${article.name}`}
                                    className={quantityButton}
                                    onClick={() => removeFromCart(articleId)}
                                >
                                    −
                                </button>
                                <button
                                    type="button"
                                    aria-label={`Agregar una unidad de ${article.name}`}
                                    className={quantityButton}
                                    onClick={() => addToCart(articleId)}
                                    disabled={article.stock === 0}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
