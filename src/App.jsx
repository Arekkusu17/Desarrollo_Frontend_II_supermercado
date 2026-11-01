import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import AddArticlePage from './pages/AddArticlePage.jsx';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="quienes-somos" element={<AboutPage />} />
                <Route path="preguntas-frecuentes" element={<FaqPage />} />
                <Route path="inventario" element={<InventoryPage />} />
                <Route path="inventario/nuevo" element={<AddArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
