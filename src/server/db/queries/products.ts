import { Query } from '../pool';

export interface Product {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
    atualizado_em?: string;
}

const getAll = () => Query<Product[]>('SELECT * FROM produtos;');

const getById = (id: number) => Query<Product>('SELECT * FROM produtos WHERE id = ?;', [id]);

const insert = (product: Product) => Query('INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?);', [product.nome, product.descricao, product.preco, product.estoque]);

const update = (id: number, product: Partial<Product>) => Query('UPDATE produtos SET ? WHERE id = ?;', [product, id]);

const remove = (id: number) => Query('DELETE FROM produtos WHERE id = ?;', [id]);

export default {
    getAll,
    getById,
    insert,
    update,
    remove
};
