import express from 'express';
import routes from './routes';
import config from './config';
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

app.use(notFoundError);
app.use(globalError);

app.listen(config.app.port, () =>  console.log(`Servidor está rodando na porta ${config.app.port}`));