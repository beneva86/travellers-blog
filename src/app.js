// const Sequelize = require('sequelize') 
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
// const sequelize = new Sequelize('blog_application_bootstrap',process.env.POSTGRES_USER,null,{
//   host: 'localhost',
//   dialect: 'postgres',
//   storage: './session.postgres' 
// })

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

// //MODELS DEFINITION
// const User = sequelize.define('users', {
// 	username: {
// 		type: Sequelize.STRING,
// 		unique: true
// 	},
// 	email: {
// 		type: Sequelize.STRING,
//     	unique: true
// 	},
// 	password: {
// 		type: Sequelize.STRING
// 	},
// })

// const Message = sequelize.define('messages', {
// 	body: {
// 		type: Sequelize.TEXT 
// 	},
// 	topic: {
// 		type: Sequelize.TEXT
// 	}
// })

// const Comment = sequelize.define('comments', {
// 	body: {
// 		type: Sequelize.TEXT 
// 	}
// })

// // TABLES RELATIONSHIP/ASSOCIATION 
// User.hasMany(Message)
// Message.belongsTo(User)	// userId in messages table
// Comment.belongsTo(Message) // messageId in comment table
// Comment.belongsTo(User) // userId in comment table
// User.hasMany(Comment)
// Message.hasMany(Comment)

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
	// const user = req.session.user
	// res.render('costarica', {user:user})
	res.render('costarica')
})

//-------------ROUTE: Portugal-------------
app.get('/portugal', (req,res) => {
	// const user = req.session.user
	// res.render('portugal', {user:user})
	res.render('portugal')
})

//-------------ROUTE: Santorini-------------
app.get('/santorini', (req,res) => {
	// const user = req.session.user
	// res.render('santorini', {user:user})
	res.render('santorini')
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

app.listen(3000, function(){
  console.log("Blog app listening on port 3000")
})





