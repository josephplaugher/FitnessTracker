import React from "react"

const LiftOptions = (props) => {
    const selectWorkout = props.selectWorkout
    return (
        <select>
            <option defaultValue="Start a Workout" className="workout-option">Start a Workout</option>
            <option value="Deadlift" className="workout-option" onClick={selectWorkout}>Deadlift</option>
            <option value="Bench Press" className="workout-option" onClick={selectWorkout}>Bench Press</option>
            <option value="Barbell Rows" className="workout-option" onClick={selectWorkout}>Barbell Rows</option>
            <option value="Barbell Back Squat" className="workout-option" onClick={selectWorkout}>Barbell Back Squat</option>
            <option value="Barbell Front Squat" className="workout-option" onClick={selectWorkout}>Barbell Front Squat</option>
            <option value="Pull-Up" className="workout-option" onClick={selectWorkout}>Pull-Up</option>
            <option value="Chin-Up" className="workout-option" onClick={selectWorkout}>Chin-Up</option>
            <option value="Barbell-Curl" className="workout-option" onClick={selectWorkout}>Barbell Curl</option>
            <option value="Hanging Leg Lift" className="workout-option" onClick={selectWorkout}>Hanging Leg Lift</option>
        </select>
    )
}

export default LiftOptions