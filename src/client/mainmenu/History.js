import React from 'react'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { history: [] }
        this.getHistory = this.getHistory.bind(this)
        this.cleanZeros = this.cleanZeros.bind(this)
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory() {
        //     Ajax.get(SetUrl() + "/getHistory")
        //     .then(res => {
        //         console.log('get history: ', res.data.log)
        //       this.setState({
        //         history: res.data.log
        //       })
        //   })
    }

    cleanZeros(rep) {
        if (rep > 0) {
            return rep
        } else {
            return null
        }
    }

    render() {
        const historyDisplay = this.state.history.map((row) =>
            <div key={row.time + "div"} className="exercise-list">
                <p key="date-line" className="date-row">{`${row.date.substring(0, 10)}`}</p>
                <p key="weight-line" className="weight-row">{row.weight} lbs.</p>
                <p key="setline1" className="rep-row">Reps: {row.set1}</p>
                <p key="setline2" className="rep-row"> {this.cleanZeros(row.set2)}</p>
                <p key="setline3" className="rep-row"> {this.cleanZeros(row.set3)}</p>
                <p key="setline4" className="rep-row"> {this.cleanZeros(row.set4)}</p>
                <p key="setline5" className="rep-row"> {this.cleanZeros(row.set5)}</p>
                <p key="setline6" className="rep-row"> {this.cleanZeros(row.set6)}</p>
                <p key="setline7" className="rep-row"> {this.cleanZeros(row.set7)}</p>
                <p key="setline8" className="rep-row"> {this.cleanZeros(row.set8)}</p>
            </div>
        );
        return (
            historyDisplay
        )
    }
}

export default History