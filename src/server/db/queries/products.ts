import { Query } from '../pool';

export interface Product {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    atualizado_em?: string;
}

const getAll = (): Promise<Product[]> => Query('SELECT * FROM produtos;').then(results => results as Product[]);

const getById = (id: number): Promise<Product> => Query('SELECT * FROM produtos WHERE id = ?;', [id]).then(results => results[0] as Product);

const insert = (product: Product): Promise<any> => Query('INSERT INTO produtos (nome, descricao, preco, atualizado_em) VALUES (?, ?, ?, ?);', [product.nome, product.descricao, product.preco, product.atualizado_em]);

const update = (id: number, product: Partial<Product>): Promise<any> => Query('UPDATE produtos SET ? WHERE id = ?;', [product, id]);

const remove = (id: number): Promise<any> => Query('DELETE FROM produtos WHERE id = ?;', [id]);

export default {
    getAll,
    getById,
    insert,
    update,
    remove
};
