import test from 'node:test';
import assert from 'node:assert/strict';
import { initialInventory, inventoryReducer } from '../context/inventoryReducer.js';

const milk = { id: 'milk', name: 'Leche', brand: 'Vecino', type: 'Lácteos', stock: 3 };
const rice = { id: 'rice', name: 'Arroz', brand: 'Vecino', type: 'Despensa', stock: 5 };
const inventory = { articles: [milk, rice], cart: [] };

const increase = { type: 'cart/increased', articleId: milk.id };
const decrease = { type: 'cart/decreased', articleId: milk.id };

test('registers a product in an initially empty inventory', () => {
    const state = inventoryReducer(initialInventory, { type: 'article/added', article: milk });
    assert.deepEqual(state, { articles: [milk], cart: [] });
    assert.deepEqual(initialInventory, { articles: [], cart: [] });
});

test('reserves only available units and restores them without changing other products', () => {
    let state = inventory;
    for (const quantity of [1, 2, 3]) {
        state = inventoryReducer(state, increase);
        assert.equal(state.articles[0].stock, 3 - quantity);
        assert.deepEqual(state.cart, [{ articleId: milk.id, quantity }]);
        assert.strictEqual(state.articles[1], rice);
    }

    assert.strictEqual(inventoryReducer(state, increase), state);

    for (const quantity of [2, 1, 0]) {
        state = inventoryReducer(state, decrease);
        assert.equal(state.articles[0].stock, 3 - quantity);
        assert.deepEqual(state.cart, quantity === 0 ? [] : [{ articleId: milk.id, quantity }]);
        assert.strictEqual(state.articles[1], rice);
    }
    assert.equal(inventory.articles[0].stock, 3);
    assert.deepEqual(inventory.cart, []);
});

test('ignores unknown products and attempts to return unreserved units', () => {
    assert.strictEqual(
        inventoryReducer(inventory, { ...increase, articleId: 'missing' }),
        inventory,
    );
    assert.strictEqual(
        inventoryReducer(inventory, { ...decrease, articleId: 'missing' }),
        inventory,
    );
    assert.strictEqual(inventoryReducer(inventory, decrease), inventory);
});

test('updates each cart entry independently', () => {
    let state = inventoryReducer(inventory, increase);
    state = inventoryReducer(state, { ...increase, articleId: rice.id });
    state = inventoryReducer(state, decrease);

    assert.deepEqual(state.cart, [{ articleId: rice.id, quantity: 1 }]);
    assert.deepEqual(
        state.articles.map(({ stock }) => stock),
        [3, 4],
    );
});
