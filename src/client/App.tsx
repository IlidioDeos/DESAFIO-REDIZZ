import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Private from './pages/Private';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import Register from './pages/Register';


const ProtectedRoute = () => {
    const { token } = useAuth(); 
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/private/*" element={<ProtectedRoute />}>
                    <Route index element={<Private />} />
                    <Route path="clientes" element={<CustomersPage />} />
                    <Route path="produtos" element={<ProductsPage />} />
                    <Route path="pedidos" element={<OrdersPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
