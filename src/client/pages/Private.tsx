import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate
import { useAuth } from '../context/AuthContext';
import ProductsPage from './ProductsPage';

const Private: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Usando o hook useNavigate

  const handleLogout = () => {
    logout(); // Chama a função de logout do seu contexto de autenticação
    navigate('/'); // Redireciona para a página inicial após o logout
  };

  return (
    <div>
      <h1>Painel Privado</h1>
      <button onClick={handleLogout}>Logout</button> {/* Alterado para chamar handleLogout */}
      <ProductsPage />
    </div>
  );
};

export default Private;
