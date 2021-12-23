import React, { useState } from 'react'
import Input from 'Util/Input'
import Button from 'Util/Button'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'
import EB from 'Util/EB'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

const NewUser = (props) => {

	const [userData, setUserData] = useState({})
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	const submitForm = (e) => {
		e.preventDefault()
		console.log('submitt')
		Ajax.post('/newUser', { fname, lname, email, password })
			.then(resp => {
				console.log(resp.data)
				props.switchToLogin()
			})
			.catch(error => console.log(`new user error: ${error}`))
	}

	return (
		<div id='sign-in'>
			<p className='form-title'>Create New Account</p>
			{/* prettier-ignore */}
			<form onSubmit={(e) => submitForm(e)} >
				<Input name="fname" label="First Name" value={fname} onChange={setFname} />
				<Input name="lname" label="Last Name" value={lname} onChange={setLname} />
				<Input name="email" label="Email" value={email} onChange={setEmail} />
				<Input name="password" label="Password" value={password} onChange={setPassword} />
				<div className="rfa_button-div">
					<Button id="submit" value="Create Account" />
				</div>
			</form>
			<div className='rfa_button-div'>
				<Button
					id='login'
					value='Sign in instead'
					onClick={props.switchToLogin}
				/>
			</div>
		</div>
	)

}

export default NewUser
