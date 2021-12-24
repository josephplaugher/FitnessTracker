import React, { useState } from 'react'
import Input from './Util/Input'
import Button from './Util/Button'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

const Login = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitForm = (e) => {
		e.preventDefault()
		console.log('submitt')
		Ajax.post('/login', { email, password })
			.then(resp => {
				console.log(resp.data)
				props.switchToHome(resp.data.userData)
			})
			.catch(error => console.log(`new user error: ${error}`))
	}

	return (
		<div id='sign-in'>
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
