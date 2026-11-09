export const MAX_ARTICLE_FIELD_LENGTH = 80;

const fieldLabels = {
    name: 'nombre',
    brand: 'marca',
    type: 'tipo de producto',
};

export function validateArticle(values) {
    const article = {};
    const errors = {};

    for (const [field, label] of Object.entries(fieldLabels)) {
        const value = typeof values?.[field] === 'string' ? values[field].trim() : '';
        article[field] = value;

        if (!value) {
            errors[field] = `Ingresa el ${label === 'marca' ? 'nombre de la marca' : label}.`;
        } else if (value.length > MAX_ARTICLE_FIELD_LENGTH) {
            errors[field] = `Usa hasta ${MAX_ARTICLE_FIELD_LENGTH} caracteres.`;
        }
    }

    const stockInput = values?.stock;
    const stock =
        typeof stockInput === 'string' && stockInput.trim() ? Number(stockInput) : stockInput;

    if (!Number.isSafeInteger(stock) || stock < 0) {
        errors.stock = 'Ingresa un stock inicial entero igual o mayor que cero.';
    } else {
        article.stock = stock;
    }

    return { article, errors, isValid: Object.keys(errors).length === 0 };
}
