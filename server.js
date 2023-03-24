const express = require('express');
const user = require('./controllers/users');
const question = require('./controllers/questions');
const InitiateMongoServer = require('./db');

InitiateMongoServer();

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static('webapp'));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/webapp/index.html`);
});

app.use('/user', user);
app.use('/question', question);




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

