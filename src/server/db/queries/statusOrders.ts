import { Query } from '../pool';

export interface StatusOrder {
    status_id?: number;
    descricao: string;
}

// Obtém todos os status de pedido
const getAll = () => Query<StatusOrder[]>('SELECT * FROM status_pedido;');

// Obtém um status de pedido pelo ID
const getById = (status_id: number) => Query<StatusOrder>('SELECT * FROM status_pedido WHERE status_id = ?;', [status_id]);

// Insere um novo status de pedido
const insert = (descricao: string) => Query('INSERT INTO status_pedido (descricao) VALUES (?);', [descricao]);

// Atualiza um status de pedido existente
const update = (status_id: number, descricao: string) => Query('UPDATE status_pedido SET descricao = ? WHERE status_id = ?;', [descricao, status_id]);

// Remove um status de pedido
const remove = (status_id: number) => Query('DELETE FROM status_pedido WHERE status_id = ?;', [status_id]);

export default {
    getAll,
    getById,
    insert,
    update,
    remove
};
