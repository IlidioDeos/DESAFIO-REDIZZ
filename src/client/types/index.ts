export interface Product {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
    atualizado_em?: string;
}


export interface Customer {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    criado_em?: string;
  }
  
