const Conn = require('../../../util/postgres')
const moment = require('moment')

class Track {
    constructor(req, res) {
        this.req = req
        this.res = res
    }

    LogASet() {
        const i = this.req.body
        console.log('request body: ', i)
        const now = moment()
        const date = now.format("M/D/Y")
        const time = now.format("HH:mm A")
        const Query = {
            text:
                `INSERT INTO log 
            (id,date,time,lift,set1,set2,set3,set4,set5,set6,set7,set8,weight,fatigueindex)
            VALUES(DEFAULT,DEFAUlt,DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            values: [i.exercise, i.reps1 || null, i.reps2 || null, i.reps3 || null, i.reps4 || null,
            i.reps5 || null, i.reps6 || null, i.reps7 || null, i.reps8 || null, i.weight || null, i.priority]
        }
        Conn
            .query(Query)
            .then((data) => {
                this.res.status(200).json({ success: true, data: data })
            })
            .catch((e) => {
                console.log('db error: ', e.stack)
            })
    }

}

module.exports = Track