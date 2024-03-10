import { Query } from '../pool';

export interface UsersTable {
	id?: number;
	nome?: string;
	email?: string;
	password?: string;
	criado_em?: string;
}

const find = (col: string, val: string) =>
	Query<UsersTable[]>(`SELECT * FROM users WHERE ?? = ?;`, [col, val]);

const insert = (values: {
	id: number;
    nome : string;
	email: string;
	password: string;
}) =>
	Query('INSERT INTO users SET ?;', values);

export default {
	find,
    insert
};