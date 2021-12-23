const express = require('express')
const Login = require('./model/user/Login')
const NewUser = require('./model/user/NewUser')
const NewStripeUser = require('./model/user/NewStripeUser')
const Logout = require('./model/user/Logout')
const routes = express.Router()

routes.post('/login', (req, res) => {
	const login = new Login(req, res)
	login.start()
})

routes.post('/newUser', (req, res) => {
	const User = new NewUser(req, res)
	User.checkUser()
})

routes.post('/newStripeUser', (req, res) => {
	const User = new NewStripeUser(req, res)
	User.checkUser()
})

routes.get('/user/logout', Logout)

module.exports = routes
