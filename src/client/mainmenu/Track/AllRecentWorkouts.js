import React, { useState, useEffect, useReducer } from "react"

const AllRecentWorkouts = (props) => {

    const { recentWorkouts } = props

    const cleanZeros = (rep) => {
        return rep > 0 ? rep : null
    }

    return recentWorkouts.map((row, i) =>
        <>
            <p key={`${i} date-line`} className="date-row">{`${row.date.substring(0, 10)}`}</p>
            <div key={`${row.time} div`} className="exercise-list">
                <p key={`${i} lift-name`} className="rep-row">{row.lift}</p>
                <p key={`${i} weight-line`} className="weight-row">{row.weight} lbs.</p>
                <p key={`${i} setline1`} className="rep-row">Reps: {row.set1}</p>
                <p key={`${i} setline2`} className="rep-row"> {cleanZeros(row.set2)}</p>
                <p key={`${i} setline3`} className="rep-row"> {cleanZeros(row.set3)}</p>
                <p key={`${i} setline4`} className="rep-row"> {cleanZeros(row.set4)}</p>
                <p key={`${i} setline5`} className="rep-row"> {cleanZeros(row.set5)}</p>
                <p key={`${i} reptotal`} className="rep-row">Total Reps: {row.set1 + row.set2 + row.set3 + row.set4 + row.set5}</p>
            </div>
        </>
    )
}

export default AllRecentWorkouts