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
    estoque BIGINT NOT NULL,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de clientes que se cadastram para comprar produtos
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(125) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar os possíveis estados de um pedido
CREATE TABLE status_pedido (
    status_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    descricao VARCHAR(25) NOT NULL
);

-- Tabela de pedidos feitos pelos clientes
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cliente_id INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INT NOT NULL,
    total INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (status_id) REFERENCES status_pedido(status_id)
);

-- Tabela de associação entre pedidos e produtos (many-to-many)
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
    
INSERT INTO produtos (nome, descricao, preco, estoque) VALUES
	('Redizz IA Direito', 'Cria peticoes iniciais em minutos com jurisprudencia real e doutrina.', 149.9 , 500),
    ('Redizz IA Medicos', 'Crie prontuários médicos em segundos com informações precisas e atualizadas.', 199.9, 200);
 
INSERT INTO clientes (nome, email, telefone) VALUES 
	('Maria Silva', 'maria.silva@example.com', '11999999999'),
	('João Souza', 'joao.souza@example.com', '22888888888');
 
 INSERT INTO status_pedido (descricao) VALUES
	('Pendente'),
	('Em processamento'),
	('Enviado'),
	('Entregue'),
	('Cancelado'),
	('Devolvido');

INSERT INTO pedidos (cliente_id, status_id, total) VALUES 
	(1, 1, 2),
	(2, 2, 1);

INSERT INTO produtos_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES 
	(1, 1, 3, 149.9),
	(2, 2, 2, 199.9);
    
-- Testando SELECTS
SELECT * FROM users;

SELECT * FROM produtos;

SELECT * FROM clientes;

SELECT * FROM status_pedido;

SELECT * FROM pedidos;

SELECT * FROM produtos_pedidos;