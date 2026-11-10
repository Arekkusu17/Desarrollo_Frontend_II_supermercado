import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
import './styles.css';

const Router = import.meta.env.MODE === 'pages' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <InventoryProvider>
            <Router>
                <App />
            </Router>
        </InventoryProvider>
    </React.StrictMode>,
);
