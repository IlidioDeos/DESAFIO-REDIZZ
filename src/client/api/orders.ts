import axios from 'axios';
import { Order } from '../types';
import { formatDateForMySQL } from '../utils/dateUtils';

const API_URL = '/api/orders';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<Order[]>('');
  return data;
};

export const getOrderStatuses = async () => {
  const { data } = await api.get('/statuses');
  return data;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const { data } = await api.post<Order>('', order);
  return data;
};

export const updateOrder = async (id: number, order: Order): Promise<Order> => {
  // Formate a data do pedido antes de enviar para o servidor
  if (order.data_pedido) {
      order.data_pedido = formatDateForMySQL(order.data_pedido);
  }

  const { data } = await api.put<Order>(`/${id}`, order);
  return data;
};


export const deleteOrder = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
