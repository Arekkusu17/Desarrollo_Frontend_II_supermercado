import { initialArticles } from '../data/initialArticles.js';

export const initialInventory = { articles: initialArticles, cart: [] };

export function inventoryReducer(state, action) {
    if (action.type === 'article/added') {
        return { ...state, articles: [...state.articles, action.article] };
    }

    const adding = action.type === 'cart/increased';
    if (!adding && action.type !== 'cart/decreased') {
        return state;
    }

    const { articleId } = action;
    const article = state.articles.find((item) => item.id === articleId);
    const entry = state.cart.find((item) => item.articleId === articleId);

    if (!article || (adding ? article.stock === 0 : !entry)) {
        return state;
    }

    const delta = adding ? 1 : -1;
    const quantity = (entry?.quantity ?? 0) + delta;
    let cart;

    if (!entry) {
        cart = [...state.cart, { articleId, quantity }];
    } else if (quantity === 0) {
        cart = state.cart.filter((item) => item.articleId !== articleId);
    } else {
        cart = state.cart.map((item) =>
            item.articleId === articleId ? { ...item, quantity } : item,
        );
    }

    const articles = state.articles.map((item) =>
        item.id === articleId ? { ...item, stock: item.stock - delta } : item,
    );

    return { articles, cart };
}
