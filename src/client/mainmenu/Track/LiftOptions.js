import React from "react"

const LiftOptions = (props) => {
    const selectWorkout = props.selectWorkout
    return (
        <select className="select">
            <option defaultValue="Start a Workout" className="select">Start a Workout</option>
            <option value="Deadlift" className="select" onClick={selectWorkout}>Deadlift</option>
            <option value="Bench Press" className="select" onClick={selectWorkout}>Bench Press</option>
            <option value="Barbell Rows" className="select" onClick={selectWorkout}>Barbell Rows</option>
            <option value="Barbell Back Squat" className="select" onClick={selectWorkout}>Barbell Back Squat</option>
            <option value="Barbell Front Squat" className="select" onClick={selectWorkout}>Barbell Front Squat</option>
            <option value="Pull-Up" className="select" onClick={selectWorkout}>Pull-Up</option>
            <option value="Chin-Up" className="select" onClick={selectWorkout}>Chin-Up</option>
            <option value="Barbell-Curl" className="select" onClick={selectWorkout}>Barbell Curl</option>
            <option value="Hanging Leg Lift" className="select" onClick={selectWorkout}>Hanging Leg Lift</option>
        </select>
    )
}

export default LiftOptions