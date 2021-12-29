import React from 'react'
import Timer from 'react-compound-timer'

const RestTimer = () => {

    return (
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
                        <Timer.Minutes /> minutes <Timer.Seconds /> seconds
                    </div>
                    <div>
                        <pre>
                            <button className="button" onClick={start}>Start</button>
                            <button className="button" onClick={pause}>Pause</button>
                            <button className="button" onClick={resume}>Resume</button>
                            <button className="button" onClick={stop}>Stop</button>
                            <button className="button" onClick={reset}>Reset</button>
                        </pre>
                    </div>
                </React.Fragment>
            )}
        </Timer>
    )
}

export default RestTimer