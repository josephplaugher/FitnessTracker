import React from 'react'
import User from './User'
import Track from './Track'
import History from './History'

const Home = (props) => {
	return (
		<div id='home-container'>
			<User userData={props.userData} signOut={props.signOut} />
			<Track />
		</div>
	)
}

export default Home
