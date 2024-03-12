import { Query } from '../pool';

export interface UsersTable {
    id?: number;
    nome?: string;
    email?: string;
    password?: string;
    criado_em?: string;
}

const find = (col: string, val: string): Promise<UsersTable[]> => 
    Query(`SELECT * FROM users WHERE ?? = ?;`, [col, val]).then(results => results as UsersTable[]);

const insert = (values: { id: number; nome: string; email: string; password: string; }): Promise<any> => 
    Query('INSERT INTO users SET ?;', values);

export default {
    find,
    insert
};
