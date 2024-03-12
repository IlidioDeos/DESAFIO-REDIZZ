-- Reset Inicial
DROP SCHEMA desafio_redizz;
CREATE SCHEMA IF NOT EXISTS desafio_redizz;
USE desafio_redizz;

-- Criando usuário MySQL
CREATE USER 'redizz_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'redizz_user';

-- Privilegios
GRANT ALL PRIVILEGES ON desafio_redizz.* TO 'redizz_user'@'localhost';
FLUSH PRIVILEGES;

-- Criando Tabelas
-- Tabela de usuários para controle interno
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos digitais
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(125) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cliente_id INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pedido ENUM('Pendente', 'Em processamento', 'Enviado', 'Entregue', 'Cancelado', 'Devolvido') NOT NULL,
    valor_pedido DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabela de associação entre pedidos e produtos
CREATE TABLE produtos_pedidos (
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    PRIMARY KEY (pedido_id, produto_id)
);



-- Inserindo dados nas tabelas
INSERT INTO users (nome, email, password) VALUES
    ('redizz_admin', 'admin@redizz.com.br', '$2b$12$KrE8DFzREYNkiDpQKOhrzetmB85ua39V2j3iE2749XzVtrdw.8.JG'),
    ('redizz_user', 'user@redizz.com.br', '$2b$12$KrE8DFzREYNkiDpQKOhrzetmB85ua39V2j3iE2749XzVtrdw.8.JG');

INSERT INTO produtos (nome, descricao, preco) VALUES
	('Redizz IA Direito', 'Cria petições iniciais em minutos com jurisprudência real e doutrina.', 149.9),
    ('Redizz IA Médicos', 'Crie prontuários médicos em segundos com informações precisas e atualizadas.', 199.9);

-- Inserindo clientes
INSERT INTO clientes (nome, email, telefone) VALUES
	('João Silva', 'joao.silva@email.com', '11999887766'),
    ('Maria Oliveira', 'maria.oliveira@email.com', '21988776655');

-- Inserindo pedidos
INSERT INTO pedidos (cliente_id, status_pedido, valor_pedido) VALUES
    (1, 'Pendente', 149.9),
    (2, 'Em processamento', 199.9); 


-- Associando pedidos a produtos
INSERT INTO produtos_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES
	(1, 1, 1, 149.9),
    (2, 2, 1, 199.9);