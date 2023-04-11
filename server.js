const express = require('express');
const user = require('./controllers/users');
const question = require('./controllers/questions');
const InitiateMongoServer = require('./db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User');
const { Question } = require('./models/Question');
const { Answer } = require('./models/Answer');
require('dotenv').config();


InitiateMongoServer();

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.set("view engine", "ejs");

app.use(express.static('webapp'));

app.use(cookieParser());

app.use(async (req, res, next) => {
	const { mrCookie } = req.cookies;
	if (!mrCookie) return next();

	const elCookieObj = jwt.verify(mrCookie, process.env.SECRET);
	if (typeof elCookieObj !== 'object') return next();

	const email = elCookieObj.email;
	if(!email) return next();

	const user = await User.findOne({ email });

	req.user = user;
	return next();
});


app.get('/', async (req, res) => {
	// const topQuestions = [
	// 	{
	// 		title: 'Pain. Suffering. Agony.',
	// 		problem: `
	// 			AAAAAAAGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!
	// 			My code does not work even though I told it to. I hate this. Computers are stupid. We need to get back to the basics. People should not live this way.
	// 		`,
	// 		usefulness: 300,
	// 		answers: 4
	// 	},
	// 	{
	// 		title: 'How to create an array without knowing the length in C#?',
	// 		problem: `
	// 		I need to dynamically create an array where I won't know its length and stuff you know? It would just be so great to be able to do that. Like it would just be incedibly wodnerful. I would have unlimited power and it would just be great. I have tried, but c# just doesnt let me. It is limiting me. Help me! I demand it.
	// 		`,
	// 		usefulness: 30,
	// 		answers: 3
	// 	},
	// 	{
	// 		title: 'Pain. Suffering. Agony.',
	// 		problem: `
	// 			AAAAAAAGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!
	// 			My code does not work even though I told it to. I hate this. Computers are stupid. We need to get back to the basics. People should not live this way.
	// 		`,
	// 		usefulness: 12,
	// 		answers: 2
	// 	},
	// ];

	const topQuestions = await Question.find();

	res.render('index', {
		questions: topQuestions,
		user: req.user
	});
});

app.get('/questionform', (req, res) => {
	res.render('questionForm', {
		user: req.user
	});
});

app.get('/questionpage', async (req, res) => {
	async function getQuestion (id) {
		let theQuestion;
		if (id) theQuestion = await Question.findById(id);
		
		if (!theQuestion) return { questionNotFound: true }
	
		theQuestion.answers = await Answer.find({ questionId: theQuestion._id }).exec();

		return { questionObj: theQuestion }
	}

	const details = await getQuestion(req.query.id);
	details.user = req.user;

	res.render('questionPage', details);
});


app.use(express.json());

app.use('/user', user);
app.use('/question', question);



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
