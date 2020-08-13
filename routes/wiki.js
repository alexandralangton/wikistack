const express = require('express');
const site = require('../views/index');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		res.send(site.main(''));
	} catch (error) {
		console.log(error);
		res.status(404);
	}
});

router.post('/', async (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;

	try {
		const page = await Page.create({
			title: title,
			content: content,
		});
		res.redirect('/');
	} catch (error) {
		next(error);
	}
	// res.json(req.body);
	// console.log(req.body);
});

router.get('/add', (req, res) => {
	res.send(site.addPage());
});

module.exports = router;
