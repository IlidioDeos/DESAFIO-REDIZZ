import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Substitua 'http://localhost:3000/auth/login' pelo seu endpoint de login correto
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token; // Assumindo que o servidor responde com { token: '...' }
      auth.login(token); // Salva o token no contexto de autenticação
      localStorage.setItem('token', token); // Opcionalmente, salva o token no localStorage
      navigate('/private');
    } catch (error) {
      console.error("Login failed:", error);
      // Adicione aqui o manuseio de erro, como exibir uma mensagem ao usuário
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
