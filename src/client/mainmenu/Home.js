import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './User'
import Track from './Track'
import History from './History'

class Home extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div id='home-container'>
				<User userData={this.props.userData} signOut={this.props.signOut} />
				<Router>
					<div id="nav-pane">
						<Link to="/track" className="nav">Track a workout</Link>
						<Routes>
							<Route path="/track"
								element={<Track />}
							/>
							<Route path="/history"
								element={<History />}
							/>
						</Routes>
						<br /><Link to="/history" className="nav">History</Link>
					</div>
				</Router>
			</div>
		)
	}
}

export default Home
