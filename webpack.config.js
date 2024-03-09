const path = require('path');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
    // Define o modo de execução do webpack
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client/index.tsx',
    // Ajuda a fazer mapeamento reverso para o código original
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                // Percorre todos os arquivos .ts e .tsx
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // Ajuda a localizar o arquivo tsconfig.json
                            context: path.resolve(__dirname, './src/client'),
                            configFile: 'tsconfig.json'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js')
    }
};

const serverConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/server/server.ts',
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()], // Evita a inclusão de todos os módulos node_modules no bundle do servidor
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // Ajuda a localizar o arquivo tsconfig.json
                            context: path.resolve(__dirname, './src/server'),
                            configFile: 'tsconfig.json'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = [serverConfig, clientConfig];
