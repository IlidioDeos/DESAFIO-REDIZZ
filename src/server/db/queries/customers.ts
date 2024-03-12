import { Query } from '../pool';

export interface Customer {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    criado_em?: string;
}

// Nota: As funções agora esperam processar 'any' como tipo de retorno da Promise e precisam de casting para o tipo específico, se necessário.

const getAll = (): Promise<Customer[]> => {
    return Query('SELECT * FROM clientes;').then(results => results as Customer[]);
};

const getById = (id: number): Promise<Customer> => {
    return Query('SELECT * FROM clientes WHERE id = ?;', [id]).then(results => results[0] as Customer);
};

const insert = (customer: Customer): Promise<any> => {
    return Query('INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?);', [customer.nome, customer.email, customer.telefone]);
};

const update = (id: number, customer: Partial<Customer>): Promise<any> => {
    return Query('UPDATE clientes SET ? WHERE id = ?;', [customer, id]);
};

const remove = (id: number): Promise<any> => {
    return Query('DELETE FROM clientes WHERE id = ?;', [id]);
};

const findByEmailAndExcludeId = (email: string, id: number): Promise<Customer[]> => {
    return Query('SELECT * FROM clientes WHERE email = ? AND id <> ?;', [email, id]).then(results => results as Customer[]);
};

export default {
    getAll,
    getById,
    insert,
    update,
    remove,
    findByEmailAndExcludeId
};
