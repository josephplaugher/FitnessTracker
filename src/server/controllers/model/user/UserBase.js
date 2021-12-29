const Conn = require('./../../../util/postgres')

class UserBase {
	constructor(req, res) {
		this.req = req
		this.res = res
	}

	getUsersByEmail() {
		let User = new Promise((resolve, reject) => {
			const Query = {
				text:
					'SELECT id, email, lname, fname, password FROM users WHERE email = $1 ',
				values: [this.req.body.email.toLowerCase()]
			}
			Conn
				.query(Query)
				.then((data) => resolve(data.rows[0]))
				.catch((e) => reject(e.stack))
		})
		return User
	}
}

module.exports = UserBase
