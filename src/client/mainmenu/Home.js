import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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
					{/* prettier-ignore */}
					<div id="nav-pane">        
          <Link to="/track" className="nav">Track a workout</Link>
            <Route path="/track" 
              render={(props) => <Track/>}
              />
          <br/><Link to="/history" className="nav">History</Link>
            <Route path="/history" 
              render={(props) => <History/>}
              />
        </div>
				</Router>
			</div>
		)
	}
}

export default Home
