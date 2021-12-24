import React from 'react'
import * as moment from 'moment'
import { FormClass, Input, Button } from 'reactform-appco'
import Timer from 'react-compound-timer'
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
            recentWorkouts: [],
            allRecentWorkouts: []
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
        this.cleanZeros = this.cleanZeros.bind(this)
        this.allRecentWorkouts = this.allRecentWorkouts.bind(this)
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
        this.recentWorkouts(exercise)
    }

    allRecentWorkouts() {
        Ajax.get(`${SetUrl()}/getAllRecent`)
            .then((res) => {
                this.setState({
                    allRecentWorkouts: res.data.log,
                })
            })
    }

    recentWorkouts(exercise) {
        const param = exercise.toLowerCase()
        const that = this
        Ajax.get(`${SetUrl()}/getRecent/${param}`)
            .then((res) => {
                const log = res.data.log
                const last = log[log.length - 1]
                this.setState({
                    recentWorkouts: res.data.log,
                    weight: last.weight,
                })
                that.extraData.weight = last.weight
            })
    }

    cleanZeros(rep) {
        if (rep > 0) {
            return rep
        } else {
            return null
        }
    }

    setPriorityUp() {
        const c = this.state.priority
        const n = c + 1
        this.setState({ priority: n })
    }

    setPriorityDown() {
        const c = this.state.priority
        const n = c - 1
        this.setState({ priority: n })
    }

    render() {

        const recentWorkouts = this.state.recentWorkouts.map((row) =>
            <div key={row.time + "div"} className="exercise-list">
                <p key="date-line" className="date-row">{`${row.date.substring(0, 10)}`}</p>
                <p key="weight-line" className="weight-row">{row.weight} lbs.</p>
                <p key="setline1" className="rep-row">Reps: {row.set1}</p>
                <p key="setline2" className="rep-row"> {this.cleanZeros(row.set2)}</p>
                <p key="setline3" className="rep-row"> {this.cleanZeros(row.set3)}</p>
                <p key="setline4" className="rep-row"> {this.cleanZeros(row.set4)}</p>
                <p key="setline5" className="rep-row"> {this.cleanZeros(row.set5)}</p>
                <p key="setline6" className="rep-row"> {this.cleanZeros(row.set6)}</p>
                <p key="setline7" className="rep-row"> {this.cleanZeros(row.set7)}</p>
                <p key="setline8" className="rep-row"> {this.cleanZeros(row.set8)}</p>
            </div>
        )

        const allRecentWorkouts = this.state.allRecentWorkouts.map((row) =>
            <>
                <p key="date-line" className="date-row">{`${row.date.substring(0, 10)}`}</p>

                <div key={row.time + "div"} className="exercise-list">
                    <p key="lift-name" className="rep-row">{row.lift}</p>
                    <p key="weight-line" className="weight-row">{row.weight} lbs.</p>
                    <p key="setline1" className="rep-row">Reps: {row.set1}</p>
                    <p key="setline2" className="rep-row"> {this.cleanZeros(row.set2)}</p>
                    <p key="setline3" className="rep-row"> {this.cleanZeros(row.set3)}</p>
                    <p key="setline4" className="rep-row"> {this.cleanZeros(row.set4)}</p>
                    <p key="setline5" className="rep-row"> {this.cleanZeros(row.set5)}</p>
                    <p key="setline6" className="rep-row"> {this.cleanZeros(row.set6)}</p>
                    <p key="setline7" className="rep-row"> {this.cleanZeros(row.set7)}</p>
                    <p key="setline8" className="rep-row"> {this.cleanZeros(row.set8)}</p>
                </div>
            </>
        )

        const currenttime = moment()
        const now = currenttime.format("M/D/Y HH:mm A")
        return (
            <>
                <div id="workout-options">
                    <select>
                        <option defaultValue="Start a Workout" className="workout-option">Start a Workout</option>
                        <option value="Deadlift" className="workout-option" onClick={this.selectWorkout.bind(this)}>Deadlift</option>
                        <option value="Bench Press" className="workout-option" onClick={this.selectWorkout.bind(this)}>Bench Press</option>
                        <option value="Barbell Rows" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Rows</option>
                        <option value="Barbell Back Squat" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Back Squat</option>
                        <option value="Barbell Front Squat" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Front Squat</option>
                        <option value="Pull-Up" className="workout-option" onClick={this.selectWorkout.bind(this)}>Pull-Up</option>
                        <option value="Chin-Up" className="workout-option" onClick={this.selectWorkout.bind(this)}>Chin-Up</option>
                        <option value="Barbell-Curl" className="workout-option" onClick={this.selectWorkout.bind(this)}>Barbell Curl</option>
                    </select>
                </div>
                <div id="recent-workouts">
                    <div id='overall-recent'>
                        <p>Recent Workout Sessions</p>
                        {allRecentWorkouts}
                    </div>
                    <div id='this-workout-recent'>
                        <p>Recent {` ${this.state.exercise} `} Workouts</p>
                        {recentWorkouts}
                    </div>
                </div>
                <div id="workout-data">
                    {/* prettier-ignore */}
                    <form onSubmit={this.rfa_onSubmit}>
                        <p>{this.state.exercise} {now}</p>
                        <p>Priority: {` ${this.state.priority} `}</p>
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
                    <Timer
                        initialTime={90000}
                        direction="backward"
                        startImmediately={false}
                        checkpoints={[
                            {
                                time: 0.1,
                                callback: () => console.log('Checkpoint A') //fire an alarm function here
                            }]}
                    >
                        {({ start, resume, pause, stop, reset, timerState }) => (
                            <React.Fragment>
                                <div>
                                    <pre>
                                        <Timer.Minutes /> minutes <br />
                                        <Timer.Seconds /> seconds
                                    </pre>
                                </div>
                                <div>Status {timerState}</div>
                                <div>
                                    <pre>
                                        <button onClick={start}>Start</button>
                                        <button onClick={pause}>Pause</button>
                                        <button onClick={resume}>Resume</button>
                                        <button onClick={stop}>Stop</button>
                                        <button onClick={reset}>Reset</button>
                                    </pre>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                </div>
            </>
        )
    }
}

export default Track
