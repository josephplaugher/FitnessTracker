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
    )
}

export default RestTimer