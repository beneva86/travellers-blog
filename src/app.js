const Sequelize = require('sequelize'); 
const express = require('express');
const bodyParser = require('body-parser');

// CONFIG dependencies
const app = express();

// connect to the database
const sequelize = new Sequelize('blog_application_bootstrap',process.env.POSTGRES_USER,null,{
  host: 'localhost',
  dialect: 'postgres',
  storage: './session.postgres' 
});

app.use(express.static('public'));

app.set('views','views');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: true}));

//MODELS DEFINITION
const User = sequelize.define('users', {
	username: {
		type: Sequelize.STRING,
		// unique: true
	},
	email: {
		type: Sequelize.STRING,
	}
});

const Message = sequelize.define('messages', {
	body: {
		type: Sequelize.TEXT 
	},
	topic: {
		type: Sequelize.TEXT
	},
	time: {
		type: Sequelize.TEXT
	}
});

// TABLES RELATIONSHIP/ASSOCIATION 
User.hasMany(Message);
Message.belongsTo(User);	// userId in messages table

//----------------ROUTES----------------
//---------------ROUTE: HOME-----------------
app.get('/', function(req, res){
	res.render('index');
})

//-------------ROUTE: Costa Rica-------------
app.get('/costarica', (req,res) => {
	
	Message.findAll({
		where: {
			topic: 'Costa Rica'
		},
		include: [{
			model: User
		}]
	}).then(messages => {
		res.render('costarica', {messages:messages});
	});
});

//-------------ROUTE: Check the username and email address in the database -------------
app.post('/formvalidation', (req,res) => {
	let username = req.body.username;
	let email = req.body.email;

	User.findOne({
		where: {
			username: username,
		}
	}).then( (user) => {
		// if there is a match with the database
		if(user!== null && user.email != email) {
			res.send({message:'This username is already in use with an other email address'});
		} else {
			res.send({message: 'OK'});
		}	
	});
});

//-------------ROUTE: Create new message - Costa Rica-------------
app.post('/message_costarica', (req,res) => {
	const message = req.body.message;
	const topic = req.body.topic;
	const username = req.body.username;
	const email = req.body.email;
	const time = req.body.time;

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
			time: time
		});
	}).then(newMessage => {
		res.send({newMessage});
	});
});

//-------------ROUTE: Portugal-------------
app.get('/portugal', (req,res) => {
	Message.findAll({
		where: {
			topic: 'Portugal'
		},
		include: [{
			model: User
		}]
	}).then(messages => {
		res.render('portugal', {messages:messages});	
	});
});

//-------------ROUTE: Create new message - Portugal-------------
app.post('/message_portugal', (req,res) => {
	const message = req.body.message;
	const topic = req.body.topic;
	const username = req.body.username;
	const email = req.body.email;
	const time = req.body.time;

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
			time: time
		});
	}).then(newMessage => {
		res.send({newMessage});
	});
});

//-------------ROUTE: Santorini-------------
app.get('/santorini', (req,res) => {
	Message.findAll({
		where: {
			topic: 'Santorini'
		},
		include: [{
			model: User
		}]
	}).then(messages => {
		res.render('santorini', {messages:messages});		
	});
});

//-------------ROUTE: Create new message - Santorini-------------
app.post('/message_santorini', (req,res) => {
	const message = req.body.message;
	const topic = req.body.topic;
	const username = req.body.username;
	const email = req.body.email;
	const time = req.body.time;

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
			time: time
		});
	}).then(newMessage => {
		res.send({newMessage});
	});
});

//-------------ROUTE: Sri Lanka-------------
app.get('/srilanka', (req,res) => {
	Message.findAll({
		where: {
			topic: 'Sri Lanka'
		},
		include: [{
			model: User
		}]
	}).then(messages => {
		res.render('srilanka', {messages:messages});		
	});
});

//-------------ROUTE: Create new message - Sri Lanka-------------
app.post('/message_srilanka', (req,res) => {
	const message = req.body.message;
	const topic = req.body.topic;
	const username = req.body.username;
	const email = req.body.email;
	const time = req.body.time;

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
			time: time
		});
	}).then(newMessage => {
		res.send({newMessage});
	});
});

//-------------ROUTE: Contact page-------------
app.get('/contact', (req,res) => {
	res.render('contact');
});

sequelize.sync();

app.listen(3000, function(){
	console.log('Traveller\'s blog app listening on port 3000');
});





