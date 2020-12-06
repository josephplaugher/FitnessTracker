import React from 'react'
import * as moment from 'moment'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'

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
            recentWorkouts: []
        }
        this.extraData = {
            exercise: this.state.exercise,
            weight: this.state.weight, 
            priority: this.state.priority
            }
        this.response = this.response.bind(this)
        this.selectWorkout = this.selectWorkout.bind(this)
        this.recentWorkouts = this.recentWorkouts.bind(this)
        this.setPriorityUp = this.setPriorityUp.bind(this)
        this.setPriorityDown = this.setPriorityDown.bind(this)
    }

    response(resp) {
        // this.props.response(resp)
        this.recentWorkouts(this.state.exercise)
    }

    selectWorkout(event) {
        console.log('hello there mate')
        const exercise = event.target.textContent.toLowerCase()
        this.extraData.exercise = exercise;
        this.setState({
            exercise: exercise,
        })
        this.recentWorkouts(exercise)
    }

    recentWorkouts(exercise) {
        const param = exercise.toLowerCase()
        const that = this
        Ajax.get(`${SetUrl()}/getRecent/${param}`)
            .then((res) => {
                console.log('ajax')
                const log = res.data.log
                const last = log[log.length-1]
                this.setState({
                    recentWorkouts: res.data.log,
                    weight: last.weight,
                })
                that.extraData.weight = last.weight
            })
            
    }

    setPriorityUp() {
        const c = this.state.priority
        const n = c + 1
        console.log('now:', c, "new: ",n)
        this.setState({priority: n})
    }

    setPriorityDown() {
        const c = this.state.priority
        const n = c - 1
        this.setState({priority: n})
    }

    render() {

        const recentWorkouts = this.state.recentWorkouts.map((row)=> 
            <div key={row.id + "div"} className="exercise-list">
                <p key={row.date + "-" + row.id} className="date-row">{`${row.date.substring(0,10)}`}</p>
                <p key={row.lift + "-" + row.id} className="exercise-row">{row.lift}.</p>
                <p key={row.weight + "-" + row.id} className="weight-row">{row.weight} lbs.</p>
                <p key={row.set1 + "-" + row.id} className="rep-row">Reps: {row.set1}</p>
                <p key={row.set2 + "-" + row.id} className="rep-row"> {row.set2}</p>
                <p key={row.set3 + "-" + row.id} className="rep-row"> {row.set3}</p>
                <p key={row.set4 + "-" + row.id} className="rep-row"> {row.set4}</p>
                <p key={row.set5 + "-" + row.id} className="rep-row"> {row.set5}</p>
                <p key={row.set6 + "-" + row.id} className="rep-row"> {row.set6}</p>
                <p key={row.set7 + "-" + row.id} className="rep-row"> {row.set7}</p>
                <p key={row.set8 + "-" + row.id} className="rep-row"> {row.set8}</p>
            </div>
        )
       
        const currenttime = moment()
        const now = currenttime.format("M/D/Y HH:mm A")
        return (
          <>
            <div id="workout-options">
                <select>
                <option value="Deadlift" className="workout-option" onClick={this.selectWorkout.bind(this)}>Deadlift</option>
                <option value="Bench Press" className="workout-option" onClick={this.selectWorkout.bind(this)}>Bench Press</option>
                <option value="Barbell Back Squat" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Back Squat</option>
                <option value="Barbell Front Squat" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Front Squat</option>
                <option value="Pull-Up" className="workout-option" onClick={this.selectWorkout.bind(this)}>Pull-Up</option>
                <option value="Chin-Up" className="workout-option" onClick={this.selectWorkout.bind(this)}>Chin-Up</option>
                <option value="Barbell-Curl" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Curl</option>
                </select>
            </div>
            <div id="recent-workouts">
                <p>Recent Workouts</p>
                {recentWorkouts}
            </div>
            <div id="workout-data">
                {/* prettier-ignore */}
                <form onSubmit={this.rfa_onSubmit}>
                    <p>{now}</p><p>{this.state.exercise}</p>
                    <p>Priority {this.state.priority}</p>
                    <input type="button" className="rfa_submit" id="set-priority-up" value="Next" onClick={this.setPriorityUp.bind(this)}></input>
                    <input type="button" className="rfa_submit" id="set-priority-down" value="Prev" onClick={this.setPriorityDown.bind(this)}></input>
                    <p>Units {this.state.units}</p><Input name="weight" label="Weight" value={this.state.weight} onChange={this.rfa_onChange} />
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
            </div>
          </>
        )
    }
}

export default Track
