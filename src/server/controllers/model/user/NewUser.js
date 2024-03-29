const Conn = require('./../../../util/postgres')
const bcrypt = require('bcryptjs')
const UserBase = require('./UserBase.js')

class NewUser extends UserBase {
	constructor(req, res) {
		super()
		this.req = req
		this.res = res
	}

	async checkUser() {
		let doesUserExist = await this.getUsersByEmail()
		if (doesUserExist) {
			this.res.status(200).json({
				userNotify: {
					error: `Looks like you already have an account.
				Try signing in instead.`
				},
				userData: {}
			})
		} else {
			let newUser = await this.createUser()
			if (newUser) {
				this.res.status(200).json({
					userNotify: {
						message: `Thank you! Your account is ready. Please sign in.`
					},
					userData: {}
				})
			}
		}
	}

	createUser() {
		let newCustomer = new Promise((resolve, reject) => {
			let i = this.req.body
			let hashedPassword = bcrypt.hashSync(i.password, 10)
			const Query = {
				text:
					`INSERT INTO users 
					(email, lname, fname, password) 
					VALUES ($1,$2,$3,$4) 
					RETURNING email, lname, fname`,
				values: [i.email.toLowerCase(), i.lname, i.fname, hashedPassword]
			}
			Conn
				.query(Query)
				.then((data) => {
					resolve(data.rows[0])
				})
				.catch((e) => reject(e.stack))
		})
		return newCustomer
	}
}

module.exports = NewUser
