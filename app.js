import user from './controllers/users.js';
import question from './controllers/questions.js';
import answer from './controllers/answers.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';
import { Question } from './models/Question.js';
import { Answer } from './models/Answer.js';
import { errorWrap } from './utils/errorHandling.js';
import express from 'express';
import { getDoc } from './utils/jsonresponse.js';


export const app = express();


app.set("view engine", "ejs");

app.use(express.static('webapp'));

app.use(cookieParser());

app.use(errorWrap(async (req, res, next) => {
	const { mrCookie } = req.cookies;
	if (!mrCookie) return next();

	const elCookieObj = jwt.verify(mrCookie, process.env.SECRET);
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

	theQuestion.answers = await Answer.find({ questionId: theQuestion._id }).exec();

	res.render('questionPage', {
		user: req.user,
		questionObj: theQuestion
	});
}));


app.use(express.json());

app.use('/user', user);
app.use('/question', question);
app.use('/answer', answer);


app.get('/search', async (req, res) => {
    const searchParam = req.query.q;

    const matchedQuestions = await Question.find({ $text: { $search: searchParam } });

    res.status(200).json({ 
        success: true,
        matchedQuestions
    })
});

