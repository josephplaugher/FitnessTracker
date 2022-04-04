import React, { useState, useEffect } from "react"
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'

const LiftOptions = (props) => {
    const selectWorkout = props.selectWorkout

    const [liftOptions, setLiftOptions] = useState([])

    useEffect(() => {
        console.log('lift options url: ', SetUrl())
        Ajax.get(`${SetUrl()}/LiftOptions`)
            .catch((error) => { console.log('error getting lift options: ', error) })
            .then((res) => {
                console.log('the lift options', res.data.liftOptions)
                setLiftOptions(res.data.liftOptions)
            })
    }, [])

    return (
        <select className="select">
            <option defaultValue="Start a Workout" className="select">Start a Workout</option>
            {liftOptions.map(lift =>
                <option key={lift.id} value={lift.name} className="select-option" onClick={(e) => selectWorkout(e.target.value)}>{lift.name}</option>
            )}
        </select>
    )
}

export default LiftOptions