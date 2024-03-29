const { Pool } = require('pg')

let db_host
if (process.env.NODE_ENV === 'production') {
	db_host = process.env.DB_HOST_PROD
} else {
	db_host = process.env.DB_HOST_DEV
	console.log('db conn in dev mode')
}

const Conn = new Pool({
	user: process.env.DB_USERNAME,
	host: db_host,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT
})
Conn.connect().catch((error) => {
	console.log('db conn error: ', error)
})

module.exports = Conn
