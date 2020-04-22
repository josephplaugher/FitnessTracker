import React from 'react'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {history: []}
        this.getHistory = this.getHistory.bind(this)
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory() {
        Ajax.get(SetUrl() + "/getHistory")
        .then(res => {
          this.setState({
            history: res.data.log
          })
      })
    }

    render() {
        const historyDisplay = this.state.history.map((row)=> 
            <div key={row.id + "div"}>
                <p key={row.date + "-" + row.id} className="exercise-row">{row.date}</p><br/>
                <p key={row.exercise + "-" + row.id} className="exercise-row">{row.exercise}</p>
                <p key={row.weight_per_rep + "-" + row.id} className="weight-row">{row.weight_per_rep} Lbs.</p>
                <p key={row.reps_per_set + "-" + row.id} className="rep-row">Reps: {row.reps_per_set}</p>
                <p key={row.priority + "-" + row.id} className="exercise-row">Priority: {row.priority}</p>
            </div>
        );
        return(
            historyDisplay
        )
    }
}

export default History