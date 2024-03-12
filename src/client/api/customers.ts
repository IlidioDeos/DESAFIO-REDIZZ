import axios from 'axios';
import { Customer } from '../types';

const API_URL = '/api/customers';

const api = axios.create({
  baseURL: API_URL,
});

// Função para adicionar o token JWT a todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await api.get<Customer[]>('');
  return response.data;
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await api.post<Customer>('', customer);
  return response.data;
};

export const updateCustomer = async (id: number, customer: Customer): Promise<Customer> => {
  const response = await api.put<Customer>(`/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
