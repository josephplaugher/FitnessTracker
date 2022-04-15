import React, { useState } from 'react'
import Input from 'Util/Input'
import Button from 'Util/Button'
import LiftOptions from './Track/LiftOptions'
import RecentWorkouts from './Track/RecentWorkouts'
import RestTimer from './Track/RestTimer'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'

import 'css/main.css'
import 'css/workout-inputs.css'
import 'css/userNotify.css'
import 'css/workoutlog.css'

const Track = () => {
    const [id, setId] = useState('')
    const [lift, setLift] = useState('')
    const [weight, setWeight] = useState(0)
    const [set1, setSet1] = useState('')
    const [set2, setSet2] = useState('')
    const [set3, setSet3] = useState('')
    const [set4, setSet4] = useState('')
    const [set5, setSet5] = useState('')
    const [fatigueIndex, setFatigueIndex] = useState(1)
    const [recentWorkouts, setRecentWorkouts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [unsavedLift, setUnsavedLift] = useState({})

    const submitForm = (event) => {
        event.preventDefault()
        editMode ? submitEdits(event) : submit(event)
    }

    const submit = (event) => {
        event.preventDefault()
        Ajax.post(`${SetUrl()}/TrackASet`,
            { lift, weight, set1, set2, set3, set4, set5, fatigueIndex })
            .catch((error) => { console.log('error tracking a set: ', error) })
            .then((resp) => {
                response(lift)
            })
    }

    const submitEdits = (event) => {
        event.preventDefault()
        Ajax.put(`${SetUrl()}/TrackASet`,
            { lift, weight, set1, set2, set3, set4, set5, fatigueIndex, id })
            .catch((error) => { console.log('error updating a set: ', error) })
            .then((resp) => {
                response(lift)
            })
        setEditMode(false)
    }

    const response = (lift) => {
        setWeight('')
        setSet1('')
        setSet2('')
        setSet3('')
        setSet4('')
        setSet5('')
        setFatigueIndex(fatigueIndex + 1)
        getRecentWorkouts(lift)
    }

    const selectWorkout = (event) => {
        const lift = event.target.innerText.toLowerCase()
        setLift(lift)
        getRecentWorkouts(lift)
    }

    const getRecentWorkouts = (lift) => {
        const that = this
        Ajax.get(`${SetUrl()}/LiftHistory/${lift.toLowerCase()}`)
            .catch((error) => { console.log('error getting history: ', error) })
            .then((res) => {
                const log = res.data.log ? res.data.log.reverse() : null
                const last = log ? log[log.length - 1] : { test: 'test', weight: '' }
                setRecentWorkouts(res.data.log)
                setWeight(last.weight)
            })
    }

    const setPriorityUp = (e) => {
        e.preventDefault()
        setFatigueIndex(fatigueIndex + 1)
    }

    const setPriorityDown = (e) => {
        e.preventDefault()
        setFatigueIndex(fatigueIndex - 1)
    }

    const editLog = (entry) => {
        setUnsavedLift({ lift, weight, set1, set2, set3, set4, set5, fatigueIndex })
        setEditMode(true)
        setId(entry.id)
        setWeight(entry.weight)
        setSet1(entry.set1)
        setSet2(entry.set2)
        setSet3(entry.set3)
        setSet4(entry.set4)
        setSet5(entry.set5)
        setFatigueIndex(entry.fatigueindex)
    }

    const clearEditMode = () => {
        setEditMode(false)
        setWeight(unsavedLift.weight)
        setSet1(unsavedLift.set1)
        setSet2(unsavedLift.set2)
        setSet3(unsavedLift.set3)
        setSet4(unsavedLift.set4)
        setSet5(unsavedLift.set5)
        setFatigueIndex(unsavedLift.fatigueIndex)
    }

    return (
        <>
            <div id="workout-options">
                <LiftOptions selectWorkout={selectWorkout} currentLift={lift} />
            </div>
            <div id='this-workout-recent'>
                <RecentWorkouts recentWorkouts={recentWorkouts} editLog={editLog} />
            </div>
            <div id="workout-data">
                {editMode ? <>
                    <p id="edit-banner">EDITING LIFT HISTORY</p>
                    <Button id="cancel-edit" value="CANCEL" onClick={clearEditMode} />
                </> : null}
                <form onSubmit={submitForm}>
                    <div id="lift-config">
                        <p style={{ margin: "0px" }}>Fatigue<br /> Index: {` ${fatigueIndex} `}</p>
                        <Button value="+" id="set-priority-up" onClick={setPriorityUp} className="fi-button" buttonContainerclassName="fi-button-div" />
                        <Button value="-" id="set-priority-down" onClick={setPriorityDown} className="fi-button" buttonContainerclassName="fi-button-div" />
                        <p style={{ margin: "0px 0px 0px 25px" }}>Weight<br /> (lbs)</p><Input name="weight" value={weight} onChange={setWeight} type="number" className="textinput" containerCls="weight-input-container" />
                    </div>
                    <div id="reps-title-row"  ><p>Reps per set</p><Button id="save" value="Save" className="save" buttonContainerclassName="save-button-div" /></div>
                    <Input name="set1" value={set1} onChange={setSet1} className="textinput" type="number" />
                    <Input name="set2" value={set2} onChange={setSet2} className="textinput" type="number" />
                    <Input name="set3" value={set3} onChange={setSet3} className="textinput" type="number" />
                    <Input name="set4" value={set4} onChange={setSet4} className="textinput" type="number" />
                    <Input name="set5" value={set5} onChange={setSet5} className="textinput" type="number" />

                </form>
                <RestTimer />
            </div>
        </>
    )
}

export default Track
