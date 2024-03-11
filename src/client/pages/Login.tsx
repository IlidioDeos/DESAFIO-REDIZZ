import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { green } from '@mui/material/colors';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      auth.login(token);
      localStorage.setItem('token', token);
      navigate('/private');
    } catch (error) {
      console.error("Login failed:", error);
      // Falta adicionar uma mensagem de erro para o usuário !
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>
        Acesso a sua conta.
      </Typography>
      <Box width="100%">
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: green[500], color: 'white' }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
