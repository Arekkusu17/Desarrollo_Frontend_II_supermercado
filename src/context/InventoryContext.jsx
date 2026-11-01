import { createContext, useContext, useState } from 'react';
import { validateArticle } from '../utils/inventory.js';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
    const [articles, setArticles] = useState([]);

    function addArticle(values) {
        const result = validateArticle(values);
        if (!result.isValid) {
            return result;
        }

        const article = { ...result.article, id: crypto.randomUUID() };
        setArticles((currentArticles) => [...currentArticles, article]);
        return { ...result, article };
    }

    return (
        <InventoryContext.Provider value={{ articles, addArticle }}>
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
