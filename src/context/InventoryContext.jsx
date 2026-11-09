import { createContext, useContext, useReducer } from 'react';
import { validateArticle } from '../utils/inventory.js';
import { initialInventory, inventoryReducer } from './inventoryReducer.js';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
    const [{ articles, cart }, dispatch] = useReducer(inventoryReducer, initialInventory);

    function addArticle(values) {
        const result = validateArticle(values);
        if (!result.isValid) {
            return result;
        }

        const article = { ...result.article, id: crypto.randomUUID() };
        dispatch({ type: 'article/added', article });
        return { ...result, article };
    }

    function addToCart(articleId) {
        dispatch({ type: 'cart/increased', articleId });
    }

    function removeFromCart(articleId) {
        dispatch({ type: 'cart/decreased', articleId });
    }

    return (
        <InventoryContext.Provider
            value={{ articles, cart, addArticle, addToCart, removeFromCart }}
        >
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const inventory = useContext(InventoryContext);
    if (!inventory) {
        throw new Error('useInventory debe utilizarse dentro de InventoryProvider.');
    }
    return inventory;
}
