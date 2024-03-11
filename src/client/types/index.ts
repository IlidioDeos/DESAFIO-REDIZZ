export interface Product {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    atualizado_em?: string;
}

export interface Customer {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    criado_em?: string;
}

export type StatusPedido = 'Pendente' | 'Em processamento' | 'Enviado' | 'Entregue' | 'Cancelado' | 'Devolvido';

export interface Order {
    id?: number;
    cliente_id: number;
    data_pedido?: string;
    status_pedido: StatusPedido;
    valor_pedido: number;
}