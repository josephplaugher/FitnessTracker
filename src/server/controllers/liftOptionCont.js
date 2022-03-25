const express = require('express')
const LiftOptions = require('./model/liftoptions/LiftOptions')
const routes = express.Router()

routes.get('/liftOptions', LiftOptions)

module.exports = routes
