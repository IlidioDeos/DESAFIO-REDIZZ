import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/status', (req, res) => res.json('OK'));

app.listen(3000, () =>  console.log('Server is listening on port 3000'));