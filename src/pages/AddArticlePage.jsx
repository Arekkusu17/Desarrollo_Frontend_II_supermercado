import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.jsx';
import { MAX_ARTICLE_FIELD_LENGTH } from '../utils/inventory.js';

const emptyForm = { name: '', brand: '', type: '', stock: '' };
const fields = [
    { name: 'name', label: 'Nombre del artículo', placeholder: 'Ej. Leche entera' },
    { name: 'brand', label: 'Marca', placeholder: 'Ej. Marca Vecina' },
    { name: 'type', label: 'Tipo de producto', placeholder: 'Ej. Lácteos' },
    { name: 'stock', label: 'Stock inicial', placeholder: 'Ej. 12', type: 'number' },
];

export default function AddArticlePage() {
    const { addArticle, articles } = useInventory();
    const [values, setValues] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [addedName, setAddedName] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((currentValues) => ({ ...currentValues, [name]: value }));
        setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
        setAddedName('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        const result = addArticle(values);
        setErrors(result.errors);
        if (!result.isValid) {
            setAddedName('');
            event.currentTarget.elements.namedItem(Object.keys(result.errors)[0])?.focus();
            return;
        }
        setAddedName(result.article.name);
        setValues(emptyForm);
    }

    return (
        <>
            <section className="border-b border-market-line py-9 md:py-12">
                <p className="eyebrow">INGRESO DE ARTÍCULOS</p>
                <h1 className="text-4xl tracking-tight md:text-5xl">
                    Una selección que crece<span>.</span>
                </h1>
                <p className="max-w-xl text-sm text-market-muted md:text-base">
                    Registra un artículo y estará disponible en el inventario del supermercado.
                </p>
            </section>
            <section
                className="grid gap-10 py-9 md:grid-cols-[1.5fr_1fr] md:gap-16 md:py-12"
                aria-labelledby="article-form-title"
            >
                <div>
                    <h2 id="article-form-title" className="mb-2 text-2xl">
                        Nuevo artículo
                    </h2>
                    <p id="form-instructions" className="mb-7 text-sm text-market-muted">
                        Todos los campos son obligatorios. Usa hasta {MAX_ARTICLE_FIELD_LENGTH}{' '}
                        caracteres en los campos de texto e ingresa el stock en unidades enteras.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        aria-describedby="form-instructions"
                        className="space-y-6"
                    >
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label
                                    className="mb-2 block text-sm font-medium"
                                    htmlFor={`article-${field.name}`}
                                >
                                    {field.label}
                                </label>
                                <input
                                    id={`article-${field.name}`}
                                    name={field.name}
                                    value={values[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    required
                                    type={field.type ?? 'text'}
                                    {...(field.type === 'number'
                                        ? { min: 0, step: 1 }
                                        : { maxLength: MAX_ARTICLE_FIELD_LENGTH })}
                                    aria-invalid={Boolean(errors[field.name])}
                                    aria-describedby={
                                        errors[field.name] ? `${field.name}-error` : undefined
                                    }
                                    className="min-h-12 w-full rounded-lg border border-market-line bg-white px-4 py-3 text-base text-market placeholder:text-market-muted/70 focus:border-market focus:outline-2 focus:outline-offset-2 focus:outline-market aria-invalid:border-red-700"
                                />
                                {errors[field.name] && (
                                    <p
                                        id={`${field.name}-error`}
                                        className="mt-2 text-sm text-red-800"
                                        role="alert"
                                    >
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}
                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <button
                                type="submit"
                                className="min-h-12 cursor-pointer rounded-lg bg-market px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-market/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-market"
                            >
                                Guardar artículo{' '}
                                <span aria-hidden="true" className="ml-5">
                                    ↗
                                </span>
                            </button>
                            <Link to="/inventario" className="text-sm underline underline-offset-4">
                                Ver inventario
                            </Link>
                        </div>
                        <div role="status" aria-live="polite" aria-atomic="true">
                            {addedName && (
                                <p className="rounded-lg border border-green-800/20 bg-green-50 px-4 py-3 text-sm text-green-900">
                                    Artículo «{addedName}» agregado al inventario. Puedes ingresar
                                    otro o consultar la lista.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
                <aside
                    className="self-start rounded-xl bg-[#e8eddc] p-7 md:mt-2"
                    aria-labelledby="inventory-summary-title"
                >
                    <p className="eyebrow">TU INVENTARIO</p>
                    <h2 id="inventory-summary-title" className="text-2xl">
                        Todo en un mismo lugar.
                    </h2>
                    <p className="my-5 text-sm text-market-muted">
                        El tipo de producto permite filtrar el inventario. El stock inicial indica
                        cuántas unidades quedan disponibles al registrar el artículo.
                    </p>
                    <p className="border-t border-market/15 pt-5">
                        <strong className="text-4xl font-medium tabular-nums">
                            {articles.length}
                        </strong>
                        <span className="ml-3 text-sm">
                            {articles.length === 1
                                ? 'artículo registrado'
                                : 'artículos registrados'}
                        </span>
                    </p>
                    <p className="mt-5 text-xs text-market-muted">
                        Los artículos se mantienen al navegar por el sitio. Al recargar la página,
                        el inventario comienza vacío.
                    </p>
                </aside>
            </section>
        </>
    );
}
