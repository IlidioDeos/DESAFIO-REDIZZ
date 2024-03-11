// db/orders.ts
import { Query } from '../pool';

export interface Order {
    id?: number;
    cliente_id: number;
    data_pedido?: string;
    status_id: number;
    total: number;
}

const getAll = () => Query<Order[]>('SELECT * FROM pedidos;');

const getById = (id: number) => Query<Order>('SELECT * FROM pedidos WHERE id = ?;', [id]);

const getByCustomerId = (cliente_id: number) => Query<Order[]>('SELECT * FROM pedidos WHERE cliente_id = ?;', [cliente_id]);

const insert = (order: Order) => Query('INSERT INTO pedidos (cliente_id, status_id, total) VALUES (?, ?, ?);', [order.cliente_id, order.status_id, order.total]);

const update = (id: number, order: Partial<Order>) => Query('UPDATE pedidos SET ? WHERE id = ?;', [order, id]);

const remove = (id: number) => Query('DELETE FROM pedidos WHERE id = ?;', [id]);

export default {
    getAll,
    getById,
    getByCustomerId,
    insert,
    remove,
    update
};
