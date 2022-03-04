import React from "react"

const LiftOptions = (props) => {
    const selectWorkout = props.selectWorkout
    return (
        <select className="select">
            <option defaultValue="Start a Workout" className="select">Start a Workout</option>
            <option value="Deadlift" className="select" onClick={(e) => { console.log('click'); selectWorkout(e) }}>Deadlift</option>
            <option value="Bench Press" className="select" onClick={(e) => selectWorkout(e)}>Bench Press</option>
            <option value="Shoulder Press" className="select" onClick={(e) => selectWorkout(e)}>Shoulder Press</option>
            <option value="Deltoid Raises" className="select" onClick={(e) => selectWorkout(e)}>Deltoid Raises</option>
            <option value="Barbell Rows" className="select" onClick={(e) => selectWorkout(e)}>Barbell Rows</option>
            <option value="Barbell Back Squat" className="select" onClick={(e) => selectWorkout(e)}>Barbell Back Squat</option>
            <option value="Barbell Front Squat" className="select" onClick={(e) => selectWorkout(e)}>Barbell Front Squat</option>
            <option value="Pull-Up" className="select" onClick={(e) => selectWorkout(e)}>Pull-Up</option>
            <option value="Chin-Up" className="select" onClick={(e) => selectWorkout(e)}>Chin-Up</option>
            <option value="Barbell-Curl" className="select" onClick={(e) => selectWorkout(e)}>Barbell Curl</option>
            <option value="Hanging Leg Lift" className="select" onClick={(e) => selectWorkout(e)}>Hanging Leg Lift</option>
        </select>
    )
}

export default LiftOptions