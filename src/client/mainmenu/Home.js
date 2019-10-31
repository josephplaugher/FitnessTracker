import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'

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
          <Link to="/track" className="nav">Track a worko</Link>
            <Route path="/track" 
              render={(props) => <h1>track a workout</h1>}
              />
          <br/><Link to="/history" className="nav">History</Link>
            <Route path="/history" 
              render={(props) => <h1>history</h1>}
              />
        </div>
				</Router>
			</div>
		)
	}
}

export default Home
