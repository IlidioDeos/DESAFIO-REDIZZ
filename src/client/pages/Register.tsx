import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { green, red } from '@mui/material/colors';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', {
        nome,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Criar uma conta
      </Typography>
      <Box width="100%">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: green[500], color: 'white' }}>
            Registrar
          </Button>
          <Button variant="contained" onClick={handleBackToHome} fullWidth style={{ backgroundColor: red[700], color: 'white', marginTop: '5px' }}>
            Voltar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
