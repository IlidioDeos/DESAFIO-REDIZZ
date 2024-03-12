import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { green, blue } from '@mui/material/colors';

const Home: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px' }} />
        <Typography variant="h4" gutterBottom>
        </Typography>
        <Button component={Link} to="/register" variant="contained" style={{ backgroundColor: green[500], color: 'white' }}>
          Register
        </Button>
        <Button component={Link} to="/login" variant="contained" style={{ backgroundColor: green[500], color: 'white', marginLeft: '5px' }}>
          Login
        </Button>
      </Container>
    </div>
  );
};

export default Home;
