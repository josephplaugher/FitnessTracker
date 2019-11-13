const express = require('express')
const Track = require('./model/workout/Track')
const History = require('./model/workout/History')
const routes = express.Router()

routes.post('/track', (req, res) => {
	const workout = new Track(req, res)
	workout.start()
})

routes.get('/getHistory', History)

module.exports = routes