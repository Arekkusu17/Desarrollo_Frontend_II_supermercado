import test from 'node:test';
import assert from 'node:assert/strict';
import { validateArticle, MAX_ARTICLE_FIELD_LENGTH } from './inventory.js';

const validArticle = {
    name: 'Leche entera',
    brand: 'Marca de prueba',
    type: 'Lácteos',
    stock: 3,
    price: 1390,
};

test('accepts complete articles including accents', () => {
    assert.deepEqual(validateArticle(validArticle), {
        article: validArticle,
        errors: {},
        isValid: true,
    });
});

test('trims the three fields without mutating the input', () => {
    const input = {
        name: '  Pan  ',
        brand: '  Vecino ',
        type: ' Panadería  ',
        stock: ' 8 ',
        price: ' 1290 ',
    };
    const snapshot = { ...input };
    assert.deepEqual(validateArticle(input).article, {
        name: 'Pan',
        brand: 'Vecino',
        type: 'Panadería',
        stock: 8,
        price: 1290,
    });
    assert.deepEqual(input, snapshot);
});

test('rejects blanks independently in each required field', () => {
    for (const field of ['name', 'brand', 'type']) {
        const result = validateArticle({ ...validArticle, [field]: ' \t\n ' });
        assert.equal(result.isValid, false);
        assert.deepEqual(Object.keys(result.errors), [field]);
    }
});

test('rejects missing and non-text data without throwing', () => {
    for (const values of [undefined, null, {}, { name: 42, brand: [], type: false }]) {
        const result = validateArticle(values);
        assert.equal(result.isValid, false);
        assert.deepEqual(Object.keys(result.errors), ['name', 'brand', 'type', 'stock', 'price']);
    }
});

test('accepts the field length limit and rejects values above it', () => {
    for (const field of ['name', 'brand', 'type']) {
        assert.equal(
            validateArticle({ ...validArticle, [field]: 'a'.repeat(MAX_ARTICLE_FIELD_LENGTH) })
                .isValid,
            true,
        );
        const result = validateArticle({
            ...validArticle,
            [field]: 'a'.repeat(MAX_ARTICLE_FIELD_LENGTH + 1),
        });
        assert.equal(result.isValid, false);
        assert.deepEqual(Object.keys(result.errors), [field]);
    }
});

test('accepts zero stock', () => {
    const result = validateArticle({ ...validArticle, stock: '0' });
    assert.equal(result.isValid, true);
    assert.equal(result.article.stock, 0);
});

test('rejects missing, fractional, negative, and unsafe stock quantities', () => {
    for (const stock of [undefined, null, '', '  ', 'abc', '1.5', '-1', true, '9007199254740992']) {
        const result = validateArticle({ ...validArticle, stock });
        assert.equal(result.isValid, false);
        assert.deepEqual(Object.keys(result.errors), ['stock']);
    }
});

test('requires a positive whole-peso price', () => {
    for (const price of [undefined, '', '  ', '0', '-1', '1.5', 'abc', true, '9007199254740992']) {
        const result = validateArticle({ ...validArticle, price });
        assert.equal(result.isValid, false);
        assert.deepEqual(Object.keys(result.errors), ['price']);
    }
});
