const express = require('express');
const morgan = require('morgan');
const site = require('./views/index');
const { db, User, Page } = require('./models/index');

const app = express();

db.authenticate().then(() => {
	console.log('connected to the database');
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.redirect('/wiki');
});
app.post('/wiki/add', (req, res) => {
	console.log(req.body);
	res.redirect('/post');
});

app.use('/wiki', require('./routes/wiki'));
app.use('/wiki/user', require('./routes/users'));

const init = async () => {
	console.log('test!');
	await db.sync();
	app.listen(3000, () => {
		console.log(`listening on port 3000`);
	});
};

init();
