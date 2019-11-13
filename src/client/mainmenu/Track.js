import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

class Track extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/track'
		this.valRules = ValRules
		this.state = {
            exercise: '',
            weight: '',
            units: 'lbs'
		}
        this.response = this.response.bind(this)
        this.selectWorkout = this.selectWorkout.bind(this)
	}

	response(resp) {
		this.props.response(resp)
    }
    
    selectWorkout(event) {
        console.log('select workout: ', event.target.textContent)
		this.setState({
			exercise: event.target.textContent
		})
    }

	render() {
		return (
            <>
            <div id='workout-options'>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Deadlift</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Bench Press</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Back Squat</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Front Squat</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Eccentric Pull-Up</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Eccentric Chin-Up</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Pull-Up</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Chin-Up</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Curl</p>
                <p className="workout-option" onClick={this.selectWorkout.bind(this)}>Plank</p>
            </div>
			<div id='workout-data'>
				{/* prettier-ignore */}
				<form onSubmit={this.rfa_onSubmit} >
                  <Input name="exercise" label="Exercise" value={this.state.exercise} onChange={this.rfa_onChange} />
                  <Input name="weight" label="Weight" value={this.state.weight} onChange={this.rfa_onChange} />
                  <Input name="units" label="Units" value={this.state.units} onChange={this.rfa_onChange} />
                  <div className="rfa_button-div">
                  <Button id='save' value='Save' />
                  </div>
                </form>
			</div>
            </>
		)
	}
}

export default Track
