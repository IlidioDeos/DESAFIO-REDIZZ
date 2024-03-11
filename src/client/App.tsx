import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Private from './pages/Private';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

// Componente ou função para proteger as rotas
const ProtectedRoute = () => {
    const { token } = useAuth(); // Utilizando o token do contexto de autenticação
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/private/*" element={<ProtectedRoute />}>
                    <Route index element={<Private />} />
                    <Route path="clientes" element={<CustomersPage />} />
                    <Route path="produtos" element={<ProductsPage />} />
                    <Route path="pedidos" element={<OrdersPage />} />
                    {/* Outras sub-rotas conforme necessário */}
                </Route>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
