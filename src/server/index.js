const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const SetUrl = require('./util/SetUrl.js')
const Auth = require('./util/Auth.js')
const userCont = require('./controllers/userCont.js')
const workoutCont = require('./controllers/workoutCont.js')
const liftOptionCont = require('./controllers/liftOptionCont')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let port = process.env.PORT
app.listen(port, function () {
	console.log(`server started in ${process.env.NODE_ENV} mode`)
	console.log(`running at ${process.env.NODE_ENV == 'development' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD}`)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Deez Guns')
	next()
})

app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.json()) // Parse application/json

const checkAuth = (req, res, next) => {
	let auth = new Auth(req, res, next)
	return auth
}

app.get('/checkLoginState', checkAuth, (req, res) => {
	res.status(200).json({ checkLoginState: 'done' })
})

app.use('/', userCont)
app.use('/', workoutCont)
app.use('/', liftOptionCont)

//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
	res.render('index')
})
