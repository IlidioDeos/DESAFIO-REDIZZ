FROM node:20.11.1

WORKDIR /app

# Copiando os arquivos de dependência
COPY package*.json ./
COPY webpack.config.js ./

# Instalando dependências e limpando o cache do npm
RUN npm install && npm cache clean --force

# Reconstruir módulos nativos para o ambiente do container, especificamente o bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copiando os arquivos do projeto para o container
COPY . .

# Construindo o aplicativo (backend e frontend)
RUN npm run build

# Expondo a porta 3000 para o backend
EXPOSE 3000

# Comando para iniciar o backend
CMD ["node", "dist/server.js"]
