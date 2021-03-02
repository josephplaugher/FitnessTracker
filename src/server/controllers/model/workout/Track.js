const Conn = require('../../../util/postgres')
const moment = require('moment')

class Track {
    constructor(req,res) {
        this.req = req
        this.res = res
    }

    LogASet(){
        const i = this.req.body
        const now = moment()
        const date = now.format("M/D/Y")
        const time = now.format("HH:mm A")
        const Query = {
            text:
            `INSERT INTO log 
            (date,time,lift,set1,set2,set3,set4,set5,set6,set7,set8,weight,fatigueindex)
            VALUES(DEFAUlt,DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            values: [i.exercise,i.reps1,i.reps2,i.reps3,i.reps4,i.reps5,i.reps6,i.reps7,i.reps8,i.weight,i.priority]
        }
        Conn
            .query(Query)
            .then((data) => {
                this.res.status(200).json({ success:true, data: data })
            })
            .catch((e) => {
                console.log('db error: ', e.stack)
            })
    }

}

module.exports = Track