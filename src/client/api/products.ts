import axios from 'axios';
import { Product } from '../types';

const API_URL = '/api/products';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_URL,
});

// Função para adicionar o token JWT a todas as requisições
api.interceptors.request.use((config) => {
  // Recupera o token do localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('');
  return response.data;
};

export const createProduct = async (produto: Product): Promise<Product> => {
  const response = await api.post<Product>('', produto);
  return response.data;
};

export const updateProduct = async (id: number, produto: Product): Promise<Product> => {
  const response = await api.put<Product>(`/${id}`, produto);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
