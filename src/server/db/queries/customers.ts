import { Query } from '../pool';

export interface Customer {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    criado_em?: string;
}

const getAll = () => Query<Customer[]>('SELECT * FROM clientes;');

const getById = (id: number) => Query<Customer>('SELECT * FROM clientes WHERE id = ?;', [id]);

const insert = (customer: Customer) => Query('INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?);', [customer.nome, customer.email, customer.telefone]);

const update = (id: number, customer: Partial<Customer>) => Query('UPDATE clientes SET ? WHERE id = ?;', [customer, id]);

const remove = (id: number) => Query('DELETE FROM clientes WHERE id = ?;', [id]);

const findByEmailAndExcludeId = (email: string, id: number) => Query<Customer[]>('SELECT * FROM clientes WHERE email = ? AND id <> ?;', [email, id]);


export default {
    getAll,
    getById,
    insert,
    update,
    remove,
    findByEmailAndExcludeId
};
