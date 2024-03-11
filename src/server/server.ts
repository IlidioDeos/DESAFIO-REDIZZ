import express from 'express';
import routes from './routes';
import config from './config';
import path from 'path';

// Utilizei o morgan para fazer o log das requisições, mostrando o método, o status e o tempo de resposta.
import morgan from 'morgan';

import { configurePassport } from './middlewares/passport';
import { globalError, notFoundError} from './middlewares/error-handlers';

const app = express();

// Checkpoint Status, para verificar se o servidor está rodando.
app.get('/status', (req, res) => res.sendStatus(200))
app.head('/status', (req, res) => res.sendStatus(200))

configurePassport(app);
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
// Usando next para tratar 404.
app.use(notFoundError);

// Usando next para tratar todos os outros erros.
app.use(globalError);

app.listen(config.app.port, () =>  console.log(`Servidor está rodando na porta ${config.app.port}`));