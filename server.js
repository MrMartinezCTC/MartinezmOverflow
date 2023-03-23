const express = require('express');
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




app.post('/user/signup', (req, res) => {
	const msg = req.body;
	console.log(msg);

	res.json({
		serverMsg: 'user not signed up'
	});
});

app.post('/user/login', (req, res) => {
	const msg = req.body;
	console.log(msg);

	res.json({
		serverMsg: 'user not logged in'
	});
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

