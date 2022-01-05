import React from 'react'
import * as moment from 'moment'
import { FormClass, Input, Button } from 'reactform-appco'
import LiftOptions from './Track/LiftOptions'
import AllRecentWorkouts from './Track/AllRecentWorkouts'
import RestTimer from './Track/RestTimer'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'

import 'css/main.css'
import 'css/workout-inputs.css'
import 'css/userNotify.css'
import 'css/workoutlog.css'

class Track extends FormClass {
    constructor(props) {
        super(props)
        this.useLiveSearch = false
        this.route = '/track'
        this.valRules = ValRules
        this.state = {
            exercise: '',
            weight: '',
            reps1: '',
            reps2: '',
            reps3: '',
            reps4: '',
            reps5: '',
            units: 'lbs',
            priority: 1,
            recentWorkouts: [],
            allRecentWorkouts: [],
            showAllRecents: true,
            showThisRecents: false,
        }
        this.extraData = {
            exercise: this.state.exercise,
            weight: this.state.weight,
            priority: this.state.priority
        }
        this.response = this.response.bind(this)
        this.selectWorkout = this.selectWorkout.bind(this)
        this.allRecentWorkouts = this.allRecentWorkouts.bind(this)
        this.setPriorityUp = this.setPriorityUp.bind(this)
        this.setPriorityDown = this.setPriorityDown.bind(this)
        this.recentWorkouts = this.recentWorkouts.bind(this)
        this.toggleAllRecents = this.toggleAllRecents.bind(this)
        this.toggleThisRecents = this.toggleThisRecents.bind(this)
        this.allRecentWorkouts()
    }

    response(resp) {
        this.setPriorityUp()
        this.recentWorkouts(this.state.exercise)
    }

    selectWorkout(event) {
        const exercise = event.target.textContent.toLowerCase()
        this.extraData.exercise = exercise;
        this.setState({
            exercise: exercise,
        })
        this.setState({
            showThisRecents: true, 
            showAllRecents: false,
            weight: '',
            reps1: '',
            reps2: '',
            reps3: '',
            reps4: '',
            reps5: ''})
        this.recentWorkouts(exercise)
        this.allRecentWorkouts()
    }

    recentWorkouts(exercise) {
        console.log('geting recent workouts...')
        const that = this
        Ajax.get(`${SetUrl()}/getRecent/${exercise.toLowerCase()}`)
            .then((res) => {
                console.log('get recents resp: ', res)
                const log = res.data.log
                const last = log[log.length - 1]
                this.setState({
                    recentWorkouts: res.data.log,
                    weight: last.weight,
                })
                that.extraData.weight = last.weight
            })
    }

    allRecentWorkouts() {
        Ajax.get(`${SetUrl()}/getAllRecent`)
            .then((res) => {
                this.setState({ allRecentWorkouts: res.data.log })
            })
    }


    setPriorityUp() {
        this.setState({ priority: this.state.priority + 1 })
    }

    setPriorityDown() {
        this.setState({ priority: this.state.priority == 1 ? this.state.priority : this.state.priority - 1 })
    }

    toggleAllRecents() {
        this.state.showAllRecents ? this.setState({showAllRecents: false}) :
            this.setState({showAllRecents: true})
    }

    toggleThisRecents() {
        this.state.showThisRecents ? this.setState({showThisRecents: false}) :
            this.setState({showThisRecents: true})
    }

    render() {

        const currenttime = moment()
        const now = currenttime.format("M/D/Y HH:mm A")
        return (
            <>
                <div id="workout-options">
                    <LiftOptions selectWorkout={this.selectWorkout.bind(this)} />
                </div>
                <div id="recent-workouts">
                    <div id='overall-recent'>
                        <p className="log-header" onClick={()=>{this.toggleAllRecents()}}>Recent Workout Sessions</p>
                    {this.state.showAllRecents ? (
                        <AllRecentWorkouts recentWorkouts={this.state.allRecentWorkouts} />
                        ) : null }
                    </div>
                    <div id='this-workout-recent'>
                        <p  className="log-header" onClick={()=>{this.toggleThisRecents()}}>Recent {` ${this.state.exercise} `} Workouts {(!this.state.exercise) ? <span>(select a workout to see recents)</span> : null}</p>
                    {this.state.showThisRecents ? (
                        <AllRecentWorkouts recentWorkouts={this.state.recentWorkouts} />
                        ) : null }
                    </div>
                </div>
                <div id="workout-data">
                    <form onSubmit={this.rfa_onSubmit}>
                        <p>{this.state.exercise} {now}</p>
                        <p>Fatigue Index: {` ${this.state.priority} `}</p>
                        <input type="button" className="rfa_submit" id="set-priority-up" value="Next" onClick={this.setPriorityUp.bind(this)}></input>
                        <input type="button" className="rfa_submit" id="set-priority-down" value="Prev" onClick={this.setPriorityDown.bind(this)}></input>
                        <br />
                        <br />
                        <Input name="weight" label="Weight" value={this.state.weight} onChange={this.rfa_onChange} />{` ${this.state.units}`}
                        <p>Reps per set</p>
                        <Input name="reps1" value={this.state.reps1} onChange={this.rfa_onChange} />
                        <Input name="reps2" value={this.state.reps2} onChange={this.rfa_onChange} />
                        <Input name="reps3" value={this.state.reps3} onChange={this.rfa_onChange} />
                        <Input name="reps4" value={this.state.reps4} onChange={this.rfa_onChange} />
                        <Input name="reps5" value={this.state.reps5} onChange={this.rfa_onChange} />
                        <div className="rfa_button-div">
                            <Button id="save" value="Save" />
                        </div>
                    </form>
                    <RestTimer />
                </div>
            </>
        )
    }
}

export default Track
