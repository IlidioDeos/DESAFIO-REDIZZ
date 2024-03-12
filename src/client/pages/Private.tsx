import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomersPage from './CustomersPage';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import { Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const StyledButton = styled(Button)({
  width: '200px',
  height: '60px',
});

const StyledButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '20px',
  gap: '20px',
});

const StyledBottomButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '20px',
});

const StyledLogoutButton = styled(Button)({
  width: '200px',
  height: '60px',
  backgroundColor: '#d32f2f',
  color: 'white',
});

const Private: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <StyledContainer>
      <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>
        Painel do Administrador
      </Typography>
      <StyledButtonContainer>
        <StyledButton variant="contained" onClick={() => navigate('clientes')} style={{ backgroundColor: 'green', color: 'white' }}>
          Clientes
        </StyledButton>
        <StyledButton variant="contained" onClick={() => navigate('produtos')} style={{ backgroundColor: 'green', color: 'white' }}>
          Produtos
        </StyledButton>
        <StyledButton variant="contained" onClick={() => navigate('/private/pedidos')} style={{ backgroundColor: 'green', color: 'white' }}>
          Pedidos
        </StyledButton>
      </StyledButtonContainer>
      <StyledBottomButtonContainer>
        <StyledLogoutButton variant="contained" onClick={handleLogout}>
          Logout
        </StyledLogoutButton>
      </StyledBottomButtonContainer>
      <Routes>
        <Route path="/private/clientes" element={<CustomersPage />} />
        <Route path="/private/produtos" element={<ProductsPage />} />
        <Route path="/private/pedidos" element={<OrdersPage />} />
      </Routes>
    </StyledContainer>
  );
};

export default Private;
