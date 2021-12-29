import React, { useState } from 'react'
import Input from './Util/Input'
import Button from './Util/Button'
import Ajax from 'Util/Ajax'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

const Login = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitForm = (e) => {
		e.preventDefault()
		Ajax.post('/login', { email, password })
			.then(resp => {
				props.response(resp)
			})
			.catch(error => console.log(`login error: ${error}`))
	}

	return (
		<div id='sign-in'>
			<h3 className="header">Lift Tracker</h3>
			<p className='form-title'>Sign In</p>
			{/* prettier-ignore */}
			<form onSubmit={(e) => submitForm(e)} >
				<Input name="email" label="Email" value={email} onChange={setEmail} />
				<Input name="password" label="Password" value={password} onChange={setPassword} />
				<div className="rfa_button-div">
					<Button id="submit" value="Sign In" />
				</div>
			</form>
			<div className='rfa_button-div'>
				<Button
					id='createAccount'
					value='Create Account'
					onClick={props.switchToCreateAccount}
				/>
			</div>
			<div className='rfa_button-div'>
				<Button id='resetPassword' value='Reset Password' />
			</div>
		</div>
	)
}

export default Login
