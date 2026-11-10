import { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';
import { formatPrice } from '../utils/inventory.js';
import NotFoundPage from './NotFoundPage.jsx';

function ArticleDetailDialog({ title, onDismiss, children }) {
    const dialogRef = useRef(null);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        dialog.showModal();
        return () => dialog.close();
    }, []);

    return (
        <dialog
            ref={dialogRef}
            aria-label={title}
            onCancel={(event) => {
                event.preventDefault();
                onDismiss();
            }}
            className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-market-line bg-market-paper p-5 text-market shadow-xl backdrop:bg-market/50 sm:p-8"
        >
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onDismiss}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-medium text-market hover:bg-market/10"
                >
                    Cerrar <span aria-hidden="true">×</span>
                </button>
            </div>
            {children}
        </dialog>
    );
}

export default function ArticleDetailPage({ asDialog = false }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { articles, cart, addToCart } = useInventory();
    const article = articles.find((item) => item.id === id);
    const quantity = cart.find((item) => item.articleId === id)?.quantity ?? 0;

    const content = article ? (
        <>
            <p className="eyebrow">DETALLE DEL ARTÍCULO</p>
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
                <div className="min-w-0">
                    <dt className="text-sm text-market-muted">Precio unitario</dt>
                    <dd className="font-medium tabular-nums wrap-break-word">
                        {formatPrice(article.price)}
                    </dd>
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
                <Link
                    to="/carrito"
                    replace={asDialog}
                    className="text-sm underline underline-offset-4"
                >
                    Ver carrito
                </Link>
            </div>
        </>
    ) : (
        <NotFoundPage
            title="Artículo no encontrado"
            description="Este artículo no está en el inventario de la sesión actual."
            backTo="/inventario"
            backLabel="Volver al inventario"
        />
    );

    if (asDialog) {
        return (
            <ArticleDetailDialog
                title={article?.name ?? 'Artículo no encontrado'}
                onDismiss={() => navigate(-1)}
            >
                {content}
            </ArticleDetailDialog>
        );
    }

    if (!article) {
        return content;
    }

    return (
        <section className="max-w-2xl py-9 md:py-12">
            <Link
                to="/inventario"
                className="mb-6 inline-block text-sm underline underline-offset-4"
            >
                Volver al inventario
            </Link>
            {content}
        </section>
    );
}
