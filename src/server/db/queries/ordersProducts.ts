import { Query } from '../pool';

export interface OrderProduct {
    pedido_id: number;
    produto_id: number;
    quantidade: number;
    preco_unitario: number;
}

const getAll = (): Promise<OrderProduct[]> => Query('SELECT * FROM produtos_pedidos;').then(results => results as OrderProduct[]);

const getByOrderId = (pedido_id: number): Promise<OrderProduct[]> => Query('SELECT * FROM produtos_pedidos WHERE pedido_id = ?;', [pedido_id]).then(results => results as OrderProduct[]);

const insert = (orderProduct: OrderProduct): Promise<any> => Query('INSERT INTO produtos_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?);', [orderProduct.pedido_id, orderProduct.produto_id, orderProduct.quantidade, orderProduct.preco_unitario]);

const update = (orderProduct: OrderProduct): Promise<any> => Query('UPDATE produtos_pedidos SET quantidade = ?, preco_unitario = ? WHERE pedido_id = ? AND produto_id = ?;', [orderProduct.quantidade, orderProduct.preco_unitario, orderProduct.pedido_id, orderProduct.produto_id]);

const remove = (pedido_id: number, produto_id: number): Promise<any> => Query('DELETE FROM produtos_pedidos WHERE pedido_id = ? AND produto_id = ?;', [pedido_id, produto_id]);

export default {
    getAll,
    getByOrderId,
    insert,
    update,
    remove
};
