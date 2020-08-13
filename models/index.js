const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false,
});

// db.authenticate().then(() => {
// 	console.log('connected to the database');
// });

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
});

const Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	status: {
		type: Sequelize.ENUM('open', 'closed'),
	},
});

module.exports = {
	db,
	Page,
	User,
};
