import React, { useState, useEffect } from 'react'
import * as moment from 'moment'
import Input from 'Util/Input'
import Button from 'Util/Button'
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

const Track = () => {
    const [lift, setLift] = useState('')
    const [weight, setWeight] = useState(0)
    const [reps1, setReps1] = useState('')
    const [reps2, setReps2] = useState('')
    const [reps3, setReps3] = useState('')
    const [reps4, setReps4] = useState('')
    const [reps5, setReps5] = useState('')
    const [fatigueIndex, setFatigueIndex] = useState(1)
    const [recentWorkouts, setRecentWorkouts] = useState([])
    const [allRecentWorkouts, setAllRecentWorkouts] = useState([])

    const submit = (e) => {
        e.preventDefault()
        Ajax.post('/TrackASet',
            { lift, weight, reps1, reps2, reps3, reps4, reps5, fatigueIndex })
            .catch((error) => { console.log('error tracking a set: ', error) })
            .then((resp) => {
                console.log('log a lift resp: ', resp.data)
                response(resp.data)
            })
    }

    const response = (log) => {
        setWeight('')
        setReps1('')
        setReps2('')
        setReps3('')
        setReps4('')
        setReps5('')
        setFatigueIndex(fatigueIndex + 1)
        setRecentWorkouts(log)
    }

    const selectWorkout = (event) => {
        console.log('workout selected: ', event.target.textContent.toLowerCase())
        const lift = event.target.textContent.toLowerCase()
        setLift(lift)
        getRecentWorkouts(lift)
    }

    const getRecentWorkouts = (lift) => {
        console.log('geting recent workouts...')
        const that = this
        Ajax.get(`${SetUrl()}/LiftHistory/${lift.toLowerCase()}`)
            .catch((error) => { console.log('error getting history: ', error) })
            .then((res) => {
                console.log('get recents resp: ', res)
                const log = res.data.log ? res.data.log.reverse() : null
                const last = log ? log[log.length - 1] : { test: 'test', weight: '' }
                setRecentWorkouts(res.data.log)
                setWeight(last.weight)
            })
    }

    const getAllRecentWorkouts = () => {
        Ajax.get(`${SetUrl()}/History`)
            .catch((error) => { console.log('error getting history: ', error) })
            .then((res) => {
                setAllRecentWorkouts(res.data.log)
            })
    }

    const setPriorityUp = () => {
        setFatigueIndex(fatigueIndex + 1)
    }

    const setPriorityDown = () => {
        setFatigueIndex(fatigueIndex - 1)
    }
    return (
        // const currenttime = moment()
        // const now = currenttime.format("M/D/Y HH:mm A")
        <>
            <div id="workout-options">
                <LiftOptions selectWorkout={selectWorkout} />
            </div>
            <div id='this-workout-recent'>
                {/* <p className="log-header" onClick={() => { this.toggleThisRecents() }}>Recent {` ${exercise} `} Workouts {(!exercise) ? <span>(select a workout to see recents)</span> : null}</p> */}
                <AllRecentWorkouts recentWorkouts={recentWorkouts} />
            </div>
            {/* </div> */}
            <div id="workout-data">
                <form >
                    {/* <p>{lift} {moment("M/D/Y HH:mm A")}</p> */}
                    <div id="lift-config">
                        <p style={{ margin: "0px" }}>Fatigue<br /> Index: {` ${fatigueIndex} `}</p>
                        <Button value="+" id="set-priority-up" onClick={() => setPriorityUp()} className="fi-button" buttonContainerclassName="fi-button-div" />
                        <Button value="-" id="set-priority-down" onClick={() => setPriorityDown()} className="fi-button" buttonContainerclassName="fi-button-div" />
                        <p style={{ margin: "0px 0px 0px 25px" }}>Weight<br /> (lbs)</p><Input name="weight" value={weight} onChange={setWeight} className="textinput" containerCls="weight-input-container" />
                    </div>
                    <div id="reps-title-row"  ><p>Reps per set</p><Button id="save" value="Save" className="save" buttonContainerclassName="save-button-div" onClick={(e) => { submit(e) }} /></div>
                    <Input name="reps1" value={reps1} onChange={setReps1} className="textinput" />
                    <Input name="reps2" value={reps2} onChange={setReps2} className="textinput" />
                    <Input name="reps3" value={reps3} onChange={setReps3} className="textinput" />
                    <Input name="reps4" value={reps4} onChange={setReps4} className="textinput" />
                    <Input name="reps5" value={reps5} onChange={setReps5} className="textinput" />

                </form>
                <RestTimer />
            </div>
        </>
    )
}

export default Track
