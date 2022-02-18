import React, { Component } from 'react'
import { Button } from 'reactform-appco'
import 'css/user.css'
import 'css/form.css'

const User = (props) => {
	const signed = `Current User: ${props.userData.lname}, ${props.userData.fname
		}`

	return (
		<div id='user'>
			<p>{signed}
				<span
					id='sign-out'
					onClick={props.signOut}
				> Sign Out</span></p>
		</div>
	)
}

export default User
