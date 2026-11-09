import { Link, useParams } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ArticleDetailPage() {
    const { id } = useParams();
    const { articles, cart, addToCart } = useInventory();
    const article = articles.find((item) => item.id === id);

    if (!article) {
        return (
            <NotFoundPage
                title="Artículo no encontrado"
                description="Este artículo no está en el inventario de la sesión actual."
                backTo="/inventario"
                backLabel="Volver al inventario"
            />
        );
    }

    const quantity = cart.find((item) => item.articleId === id)?.quantity ?? 0;

    return (
        <section className="max-w-2xl py-9 md:py-12">
            <Link to="/inventario" className="text-sm underline underline-offset-4">
                Volver al inventario
            </Link>
            <p className="eyebrow mt-6">DETALLE DEL ARTÍCULO</p>
            <h1 className="mb-6 text-4xl wrap-break-word md:text-5xl">{article.name}</h1>
            <dl className="grid gap-4 rounded-xl border border-market-line bg-market-paper p-5 sm:grid-cols-2">
                <div className="min-w-0">
                    <dt className="text-sm text-market-muted">Marca</dt>
                    <dd className="font-medium wrap-break-word">{article.brand}</dd>
                </div>
                <div className="min-w-0">
                    <dt className="text-sm text-market-muted">Tipo de producto</dt>
                    <dd className="font-medium wrap-break-word">{article.type}</dd>
                </div>
            </dl>
            <p role="status" className="mt-6 text-sm text-market-muted">
                Stock disponible: <strong>{article.stock}</strong>. En el carrito:{' '}
                <strong>{quantity}</strong>.{article.stock === 0 && ' Producto agotado.'}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                    type="button"
                    disabled={article.stock === 0}
                    onClick={() => addToCart(id)}
                    className="min-h-12 cursor-pointer rounded-lg bg-market px-5 py-3 text-sm font-medium text-white hover:bg-market/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Agregar al carrito
                </button>
                <Link to="/carrito" className="text-sm underline underline-offset-4">
                    Ver carrito
                </Link>
            </div>
        </section>
    );
}
