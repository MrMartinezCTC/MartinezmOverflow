const express = require('express');
const user = require('./controllers/users');
const question = require('./controllers/questions');
const InitiateMongoServer = require('./db');

InitiateMongoServer();

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.set("view engine", "ejs");

app.get('/', (req, res) => {
	const topQuestions = [
		{
			title: 'Pain. Suffering. Agony.',
			problem: `
				AAAAAAAGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!
				My code does not work even though I told it to. I hate this. Computers are stupid. We need to get back to the basics. People should not live this way.
			`,
			usefulness: 300,
			answers: 4
		},
		{
			title: 'How to create an array without knowing the length in C#?',
			problem: `
			I need to dynamically create an array where I won't know its length and stuff you know? It would just be so great to be able to do that. Like it would just be incedibly wodnerful. I would have unlimited power and it would just be great. I have tried, but c# just doesnt let me. It is limiting me. Help me! I demand it.
			`,
			usefulness: 30,
			answers: 3
		},
		{
			title: 'Pain. Suffering. Agony.',
			problem: `
				AAAAAAAGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!
				My code does not work even though I told it to. I hate this. Computers are stupid. We need to get back to the basics. People should not live this way.
			`,
			usefulness: 12,
			answers: 2
		},
	]
	res.render('index', {
		questions: topQuestions
	});
});

app.use(express.static('webapp'));
app.use(express.json());


app.use('/user', user);
app.use('/question', question);




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

