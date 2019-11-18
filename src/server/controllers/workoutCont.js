const express = require('express')
const Track = require('./model/workout/Track')
const History = require('./model/workout/History')
const RecentLog = require('./model/workout/RecentLog')

const routes = express.Router()

routes.post('/track', (req, res) => {
	const workout = new Track(req, res)
	workout.start()
})

routes.get('/getHistory', History)
routes.get('/getRecent/:exercise', RecentLog)

module.exports = routes