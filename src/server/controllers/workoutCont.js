const express = require('express')
const Track = require('./model/workout/Track')
const History = require('./model/workout/History')
const RecentLog = require('./model/workout/RecentLog')
const AllRecentLog = require('./model/workout/AllRecentLog')

const routes = express.Router()

routes.post('/track', (req, res) => {
	const workout = new Track(req, res)
	workout.LogASet()
})

routes.get('/getHistory', History)
routes.get('/getRecent/:exercise', RecentLog)
routes.get('/getAllRecent', AllRecentLog)

module.exports = routes