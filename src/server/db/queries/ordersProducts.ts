import { Query } from '../pool';

export interface OrderProduct {
    pedido_id: number;
    produto_id: number;
    quantidade: number;
    preco_unitario: number;
}

const getAll = () => Query<OrderProduct[]>('SELECT * FROM produtos_pedidos;');

const getByOrderId = (pedido_id: number) => Query<OrderProduct[]>('SELECT * FROM produtos_pedidos WHERE pedido_id = ?;', [pedido_id]);

const insert = (orderProduct: OrderProduct) => Query('INSERT INTO produtos_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?);', [orderProduct.pedido_id, orderProduct.produto_id, orderProduct.quantidade, orderProduct.preco_unitario]);

// Adicionando a função de atualização
const update = (orderProduct: OrderProduct) => Query('UPDATE produtos_pedidos SET quantidade = ?, preco_unitario = ? WHERE pedido_id = ? AND produto_id = ?;', [orderProduct.quantidade, orderProduct.preco_unitario, orderProduct.pedido_id, orderProduct.produto_id]);

// Adicionando a função de remoção
const remove = (pedido_id: number, produto_id: number) => Query('DELETE FROM produtos_pedidos WHERE pedido_id = ? AND produto_id = ?;', [pedido_id, produto_id]);

export default {
    getAll,
    getByOrderId,
    insert,
    update,
    remove
};