import { Query } from '../pool';

export interface Order {
    id?: number;
    cliente_id: number;
    data_pedido?: string;
    status_pedido: 'Pendente' | 'Em processamento' | 'Enviado' | 'Entregue' | 'Cancelado' | 'Devolvido';
    valor_pedido: number;
}

const getAll = (): Promise<Order[]> => Query('SELECT * FROM pedidos;').then(results => results as Order[]);

const getById = (id: number): Promise<Order> => Query('SELECT * FROM pedidos WHERE id = ?;', [id]).then(results => results[0] as Order);

const getByCustomerId = (cliente_id: number): Promise<Order[]> => Query('SELECT * FROM pedidos WHERE cliente_id = ?;', [cliente_id]).then(results => results as Order[]);

const insert = (order: Order): Promise<any> => Query('INSERT INTO pedidos (cliente_id, status_pedido, valor_pedido) VALUES (?, ?, ?);', [order.cliente_id, order.status_pedido, order.valor_pedido]);

const update = (id: number, order: Partial<Order>): Promise<any> => Query('UPDATE pedidos SET ? WHERE id = ?;', [order, id]);

const remove = (id: number): Promise<any> => Query('DELETE FROM pedidos WHERE id = ?;', [id]);

export default {
    getAll,
    getById,
    getByCustomerId,
    insert,
    remove,
    update
};
