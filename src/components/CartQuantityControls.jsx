import { useInventory } from '../context/InventoryContext.jsx';

const quantityButton =
    'min-h-11 min-w-11 cursor-pointer rounded-lg border border-market-line bg-white px-3 font-semibold text-market hover:bg-market/10 disabled:cursor-not-allowed disabled:opacity-60';

export default function CartQuantityControls({ article, quantity }) {
    const { addToCart, removeFromCart } = useInventory();

    return (
        <div className="inline-flex items-center gap-2">
            <button
                type="button"
                aria-label={`Quitar una unidad de ${article.name}`}
                className={quantityButton}
                onClick={() => removeFromCart(article.id)}
                disabled={quantity === 0}
            >
                −
            </button>
            <span className="relative min-w-6 text-center text-sm font-medium tabular-nums">
                <span className="sr-only">Unidades en el carrito: </span>
                {quantity}
            </span>
            <button
                type="button"
                aria-label={`Agregar una unidad de ${article.name}`}
                className={quantityButton}
                onClick={() => addToCart(article.id)}
                disabled={article.stock === 0}
            >
                +
            </button>
        </div>
    );
}
