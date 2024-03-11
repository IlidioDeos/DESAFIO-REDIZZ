import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomersPage from './CustomersPage';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';

const Private: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Painel Privado</h1>
            <button onClick={handleLogout}>Logout</button>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => navigate('clientes')}>Clientes</button>
                    </li>
                    <li>
                        <button onClick={() => navigate('produtos')}>Produtos</button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/private/pedidos')}>Pedidos</button>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/private/clientes" element={<CustomersPage />} />
                <Route path="/private/produtos" element={<ProductsPage />} />
                <Route path="/private/pedidos" element={<OrdersPage />} />
            </Routes>
        </div>
    );
};

export default Private;
