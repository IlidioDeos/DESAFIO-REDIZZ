  ## Para os que não querem ler 🤓

- git clone
- npm install
- npm run build
- npm start
- E para logar no app
  - email : admin@redizz.com.br
  - senha : password123
- **`.env` nunca deverá estar no repositório** mas nesse caso vou deixar para facilitar a vida de quem quer testar o projeto.

# Como fiz um canhão para matar uma mosca

#### O Pedido Simples:
- **Tarefa**: Um CRUD com MUI e localStorage. Simples, certo?

#### A Execução não tão simples:
- **Realidade**: Transformei isso em um projeto Full Stack com React, Express, e MySQL. Por quê? 🤔

#### Por Que, Você Pergunta?
- **Motivo**: Queria brincar um pouco com tecnologias que estavam pegando poeira desde meu último projeto.

#### O Resultado:
- Agora temos um sistema com uma base de dados real (MySQL), um backend elegante (Express) e um frontend chique (React com MUI).Sem falar em algumas gambiarras devido ao meu ferrugem nessas linguagens. Tudo isso para fazer algo que poderia ser resolvido com um pouco de JavaScript e amor pelo localStorage.

#### Moral da História:
- **Excesso?** Com certeza. **Arrependimento?** Nem um pouco. Aprendi mais, me diverti, e quem sabe, talvez impressione alguém por aí. Quem precisa de simplicidade quando se pode complicar e bugar tudo, certo?

#### PS:
- Se precisar rodar isso, só um `npm install` seguido de `npm run build` seguido de `npm start`. E prepare-se, porque fiz mais do que era pedido, pelo puro prazer de explorar e aprender.

#### Use com moderação

# **Dependências**
- **Express**: Framework para aplicativos web Node.js, simplifica a criação de servidores e APIs.
- **@emotion/react e @emotion/styled**: Facilitam a estilização de componentes React com CSS-in-JS.
- **@mui/material e @mui/icons-material**: Oferecem componentes de UI prontos do Material-UI.
- **@types/...**: Providenciam tipagens TypeScript para bibliotecas, melhorando o desenvolvimento com TypeScript.
- **axios**: Cliente HTTP baseado em promessas, usado para fazer requisições a APIs.
- **bcrypt**: Biblioteca para hashing de senhas, aumenta a segurança no armazenamento de senhas.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`, mantém configurações sensíveis fora do código.
- **jsonwebtoken**: Implementa JSON Web Tokens, importante para autenticação segura.
- **morgan**: Middleware de logging para Express, útil para monitorar requisições HTTP.
- **mysql**: Cliente MySQL para Node.js, essencial para operações de banco de dados.
- **nodemon**: Reinicia automaticamente o servidor durante o desenvolvimento quando arquivos são alterados.
- **npm-run-all**: Executa múltiplos scripts NPM em paralelo ou sequência.
- **passport e variantes (jwt, local)**: Middlewares de autenticação para Express, essenciais para controle de acesso.
- **react e react-dom**: Bibliotecas para construir interfaces de usuário.
- **react-router-dom**: Gerenciamento de rotas no React.
- **ts-loader e typescript**: Para uso de TypeScript no projeto, oferece segurança de tipos.
- **uuid**: Gera identificadores únicos.
- **webpack e variantes (cli, node-externals)**: Bundlers para JavaScript e TypeScript, compilam módulos em pacotes.

**Para executar o programa:**
Instale todas as dependências:
```bash
npm install
```
Para buildar a aplicação:
```bash
npm run build
```

Para colocar a aplicação no ar:
```bash
npm start
```

---
**Decisões de uso:**
- **Client e Server na mesma porta (3000)**: Optamos por unificar o ambiente de desenvolvimento mantendo tanto o cliente quanto o servidor dentro da pasta `src` e rodando na mesma porta. Isso simplifica o gerenciamento do código, evita problemas com CORS ao fazer solicitações entre o cliente e o servidor, e facilita a implantação da aplicação como um pacote único, otimizando o processo de desenvolvimento e distribuição.

- Escolha de bibliotecas de UI (@mui/material) e estilização (@emotion) para facilitar o desenvolvimento de interfaces.

- Uso de Express e middleware (passport, morgan) para tornar o backend sólido.

- Implementação de TypeScript e tipagens (@types/...) para melhorar a segurança e manutenibilidade do código.

- axios para requisições HTTP, integrando frontend e backend.

- Segurança garantida através de bcrypt e jsonwebtoken.

- nodemon e webpack para eficiência no desenvolvimento e build do projeto.

# Configurar Banco de dados

### Configuração do Banco de Dados MySQL

#### Passo 1: Instale o MySQL
- **Windows/Linux/Mac**: Siga as instruções no site oficial do MySQL, de preferência instale o MySQL Installer, pois facilita na hora de configurar o server.

#### Passo 2: Inicie o MySQL
- **Windows**: Abra o MySQL através do MySQL Command Line Client ou através do MySQL Workbench.

#### Passo 3: Use o Arquivo `schema-utilizado-desafio.sql`
- Localize o arquivo `schema-utilizado-desafio.sql` no repositório.
- No terminal ou MySQL Command Line Client, execute: `source caminho/para/schema-utilizado-desafio.sql;`
  - Isso criará as tabelas e a estrutura necessária.

#### Passo 4: Configure sua Aplicação
- Seria criar um .env, mas como deixei de propósito no repositório para facilitar sua vida.

#### Pronto!
- Sua aplicação deve estar pronta para se conectar ao banco de dados MySQL que você configurou.

Lembre-se: Se tiver dúvidas, consulte a documentação oficial do [MySQL](https://dev.mysql.com/doc/).


# Banco de Dados
### Tabela de Usuários (`users`)
- **Objetivo**: Armazenar informações sobre os usuários que têm acesso ao sistema, como administradores ou funcionários.
- **Campos**:
  - `id`: Identificador único para cada usuário.
  - `nome`: Nome do usuário.
  - `email`: Endereço de email do usuário, usado para login e comunicação. É único, o que significa que dois usuários não podem compartilhar o mesmo email.
  - `password`: Senha criptografada do usuário para acesso ao sistema.
  - `criado_em`: Data e hora em que a conta do usuário foi criada, útil para rastrear novos usuários.

### Tabela de Produtos (`produtos`)
- **Objetivo**: Armazenar informações sobre produtos digitais disponíveis para venda.
- **Campos**:
  - `id`: Identificador único para cada produto.
  - `nome`: Nome do produto.
  - `descricao`: Descrição detalhada do produto.
  - `preco`: Preço do produto.
  - `atualizado_em`: Data e hora da última atualização do produto, útil para rastrear modificações.

### Tabela de Clientes (`clientes`)
- **Objetivo**: Armazenar informações sobre os clientes que compram os produtos.
- **Campos**:
  - `id`: Identificador único para cada cliente.
  - `nome`: Nome do cliente.
  - `email`: Endereço de email do cliente, usado para comunicação. É único.
  - `telefone`: Número de telefone do cliente, também único.
  - `criado_em`: Data e hora em que o cliente foi registrado no sistema.

### Tabela de Pedidos (`pedidos`)
- **Objetivo**: Registrar pedidos feitos pelos clientes, incluindo detalhes sobre o estado do pedido e o valor total.
- **Campos**:
  - `id`: Identificador único para cada pedido.
  - `cliente_id`: Chave estrangeira que referencia `id` na tabela de clientes, vinculando o pedido a um cliente específico.
  - `data_pedido`: Data e hora em que o pedido foi feito.
  - `status_pedido`: Estado atual do pedido (por exemplo, Pendente, Enviado, etc.).
  - `valor_pedido`: Valor total do pedido.

### Tabela de Associação entre Pedidos e Produtos (`produtos_pedidos`)
- **Objetivo**: Associar produtos específicos a pedidos, permitindo que um pedido contenha vários produtos. Esta tabela também armazena a quantidade de cada produto no pedido e o preço unitário na hora do pedido.
- **Campos**:
  - `pedido_id` e `produto_id`: Chaves estrangeiras que referenciam `id` nas tabelas de pedidos e produtos, respectivamente, formando uma chave primária composta.
  - `quantidade`: Número de unidades do produto no pedido.
  - `preco_unitario`: Preço unitário do produto na hora do pedido.

---

### Desafio Vaga - Redizz

- Descrição: Construa uma aplicação web usando react, onde será necessário criar um CRUD de produtos, clientes e pedidos. Estruture os dados da maneira que desejar.

- Utilize a biblioteca MATERIAL UI para a estilização. 

- Pode ser usado o LocalStorage para o armazenamento dos dados. Caso use um banco, poderá optar por NOSQL ou SQL, qualquer um que desejar. 

- A organização do código é fundamental e fará diferença no processo.