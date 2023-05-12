// import user from './controllers/users.js';
// import question from './controllers/questions.js';
// import answer from './controllers/answers.js';
// import cookieParser from 'cookie-parser';
// import jwt from 'jsonwebtoken';
// import { User } from './models/User.js';
// import { Question } from './models/Question.js';
// import { Answer } from './models/Answer.js';
// import { errorWrap } from './utils/errorHandling.js';
// import express from 'express';
// import { getDoc, sendCookie } from './utils/jsonresponse.js';
const user = require('./controllers/users.js');
const { questionPageClients, question } = require('./controllers/questions.js');
const answer = require('./controllers/answers.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User.js');
const { Question } = require('./models/Question.js');
const { Answer } = require('./models/Answer.js');
const { errorWrap } = require('./utils/errorHandling.js');
const express = require('express');
const { getDoc, sendCookie } = require('./utils/jsonresponse.js');


// export const app = express();
const app = express();
module.exports.app = app;

app.set("view engine", "ejs");

app.use(express.static('webapp'));

app.use(cookieParser());

app.use(errorWrap(async (req, res, next) => {
	const { mrCookie } = req.cookies;
	if (!mrCookie) return next();

	const elCookieObj = jwt.verify(mrCookie, "b538a79f-b361-4236-8124-0d5106942e45");
	if (typeof elCookieObj !== 'object') return next();

	const email = elCookieObj.email;
	if(!email) return next();

	const user = await User.findOne({ email });

	req.user = user;
	return next();
}));


app.get('/', errorWrap(async (req, res) => {
	const topQuestions = await Question.find();

	res.render('index', {
		questions: topQuestions,
		user: req.user
	});
}));

app.get('/questionform', errorWrap((req, res) => {
	const user = req.user;

	if (!user) return res.status(401).render('error', {
		status: 401,
		issue: 'You must be logged in to post a question.'
	});

	res.render('questionForm', { user });
}));

app.get('/questionpage', errorWrap(async (req, res) => {
	
	let theQuestion, id = req.query.id;
	if (id) theQuestion = await getDoc(id, Question);
	
	if (!theQuestion) return res.status(404).render('error', {
		status: 404,
		issue: 'The question requested does not exist.'
	});

	theQuestion.answers = await Answer.find({ questionId: theQuestion._id }).sort({ accepted: -1, usefulness: -1 }).exec();

	// const clientId = crypto.randomUUID(); 
	const clientId = `${Math.random()}${Math.random()}`.replace(/./g); 

	sendCookie(
		res, 'viewCookie',
		{ clientId, questionId: req.query.id, timeIn: Date.now() },
		'3m', 180
	)

	questionPageClients[clientId] = setTimeout(async () => {
		if (!questionPageClients[clientId]) return; // probably not necessary, but oh well.

		const question = await getDoc(req.query.id, Question);
		if (!question) return;

        question.views++;
        await question.save();
	}, 1000 * 60 * 2);

	res.status(200).render('questionPage', {
		user: req.user,
		questionObj: theQuestion
	});
}));


app.use(express.json());

app.use('/user', user);
app.use('/question', question);
app.use('/answer', answer);


app.get('/search', errorWrap(async (req, res) => {
    let searchParam = req.query.q;

	if (!searchParam) searchParam = '';

    const matchedQuestions = await Question.find({ $text: { $search: searchParam } });

    res.render('index', {
		questions: matchedQuestions,
		user: req.user
	});
}));


app.all('*', errorWrap(async (req, res) => {
	res.render('error', {
		status: 404,
		issue: 'The page requested does not exist.'
	});
}));

