import React, { useState, useEffect } from "react"
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'

import '../../css/liftOptions.css'

const LiftOptions = (props) => {
    const selectWorkout = props.selectWorkout
    const currentLift = props.currentLift

    const [liftOptions, setLiftOptions] = useState([])
    const [liftsVisible, setLiftsVisible] = useState(false)

    useEffect(() => {
        console.log('lift options url: ', SetUrl())
        Ajax.get(`${SetUrl()}/LiftOptions`)
            .catch((error) => { console.log('error getting lift options: ', error) })
            .then((res) => {
                console.log('the lift options', res.data.liftOptions)
                setLiftOptions(res.data.liftOptions)
            })
    }, [])

    const toggleLiftsVisible = () => {
        liftsVisible ? setLiftsVisible(false) : setLiftsVisible(true)
    }


    return (

        <div id="lift-menu-container">
            <p onClick={toggleLiftsVisible} style={{ margin: "5px" }} id="toggle-lifts">{currentLift || 'Lifts'}</p>
            {liftsVisible ? (
                <div id="lift-option-background-div">
                    {liftOptions.map(lift =>
                        <div className="lift-options" key={lift.id}
                            onClick={(e) => {
                                console.log('lift option clicked');
                                selectWorkout(e);
                                toggleLiftsVisible()
                            }}>
                            <p
                                style={{ margin: "5px" }}
                                value={lift.name}
                            >
                                {lift.name}
                            </p>
                        </div>
                    )}
                </div>
            ) : (null)}
        </div>
    )
}

export default LiftOptions