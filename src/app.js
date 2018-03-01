const Sequelize = require('sequelize') 
const express = require('express')
const bodyParser = require('body-parser')
// const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// // BCRYPT
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// CONFIG dependencies
const app = express()

// connect to the database
const sequelize = new Sequelize('blog_application_bootstrap',process.env.POSTGRES_USER,null,{
  host: 'localhost',
  dialect: 'postgres',
  storage: './session.postgres' 
})

app.use(express.static('public'))

app.set('views','views')
app.set('view engine','pug')

app.use(bodyParser.urlencoded({extended: true}))

// app.use(session({
//   secret: "safe",         
//   saveUnitialized: true,  
//   resave: false,         
//   store: new SequelizeStore({
//     db: sequelize,  
//     checkExpirationInterval: 15 * 60 * 1000, 
//     expiration: 24 * 60 * 60 * 1000 
//   })
// }))

//MODELS DEFINITION
const User = sequelize.define('users', {
	username: {
		type: Sequelize.STRING,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
	}
})

const Message = sequelize.define('messages', {
	body: {
		type: Sequelize.TEXT 
	},
	topic: {
		type: Sequelize.TEXT
	}
})

const Comment = sequelize.define('comments', {
	body: {
		type: Sequelize.TEXT 
	}
})

// TABLES RELATIONSHIP/ASSOCIATION 
User.hasMany(Message)
Message.belongsTo(User)	// userId in messages table
Comment.belongsTo(Message) // messageId in comment table
Comment.belongsTo(User) // userId in comment table
User.hasMany(Comment)
Message.hasMany(Comment)

//----------------ROUTES----------------

//---------------ROUTE: HOME-----------------
app.get('/', function(req, res){
	// let user = req.session.user
	// let message = req.query.message
	// res.render('index', {user:user})
	res.render('index')
})	

//-------------ROUTE: Costa Rica-------------
app.get('/costarica', (req,res) => {
	
	Message.findAll({
		where: {
			topic: 'Costa Rica'
		},
		include: [{
			model: User
		},
		{
			model: Comment
		}]
	}).then(messages => {
		if(messages.length > 0) {
			res.render('costarica', {messages:messages})
		}
		else {
			res.render('costarica')
		}
		
	})
})

//-------------ROUTE: Create new message - Costa Rica-------------
app.post('/message_costarica', (req,res) => {
	const message = req.body.message
	const topic = req.body.topic
	const username = req.body.username
	const email = req.body.email

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
		})
	}).then(newMessage => {
		res.send({newMessage})
	})
})

//-------------ROUTE: Portugal-------------
app.get('/portugal', (req,res) => {
	Message.findAll({
		where: {
			topic: 'Portugal'
		},
		include: [{
			model: User
		},
		{
			model: Comment
		}]
	}).then(messages => {
		if(messages.length > 0) {
			res.render('portugal', {messages:messages})
		}
		else {
			res.render('portugal')
		}		
	})
})

//-------------ROUTE: Create new message - Portugal-------------
app.post('/message_portugal', (req,res) => {
	const message = req.body.message
	const topic = req.body.topic
	const username = req.body.username
	const email = req.body.email

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
		})
	}).then(newMessage => {
		res.send({newMessage})
	})
})

//-------------ROUTE: Santorini-------------
app.get('/santorini', (req,res) => {
	Message.findAll({
		where: {
			topic: 'santorini'
		},
		include: [{
			model: User
		},
		{
			model: Comment
		}]
	}).then(messages => {
		if(messages.length > 0) {
			res.render('santorini', {messages:messages})
		}
		else {
			res.render('santorini')
		}		
	})
})

//-------------ROUTE: Create new message - Santorini-------------
app.post('/message_santorini', (req,res) => {
	const message = req.body.message
	const topic = req.body.topic
	const username = req.body.username
	const email = req.body.email

	User.create({
		username: username,
		email: email
	}).then(user => {
		return user.createMessage({
			body: message,
			topic: topic,
		})
	}).then(newMessage => {
		res.send({newMessage})
	})
})

//-------------ROUTE: Sri Lanka-------------
app.get('/srilanka', (req,res) => {
	// const user = req.session.user
	// res.render('srilanka', {user:user})
	res.render('srilanka')
})

//-------------ROUTE: thailand-------------
app.get('/thailand', (req,res) => {
	// const user = req.session.user
	// res.render('thailand', {user:user})
	res.render('thailand')
})

sequelize.sync()

app.listen(3000, function(){
  console.log("Traveller's blog app listening on port 3000")
})





