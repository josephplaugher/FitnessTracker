const Conn = require('../../../util/postgres')
const moment = require('moment')

class Track {
    constructor(req,res) {
        this.req = req
        this.res = res
    }

    LogASet(){
        const i = this.req.body
        const reps = this.BuildRepString(i)
        const now = moment()
        const date = now.format("M/D/Y")
        const time = now.format("HH:mm A")
        console.log('time and date: ', date,time)
        const Query = {
            text:
            `INSERT INTO log 
            (date,time,exercise,weight_per_rep,reps_per_set,priority)
            VALUES($1,$2,$3,$4,$5,$6)`,
            values: [date,time,i.exercise,i.weight,reps,i.priority]
        }
        Conn
            .query(Query)
            .then((data) => {
                console.log('db response: ', data)
                this.res.status(200).json({ success:true, data: data })
            })
            .catch((e) => {
                console.log('db error: ', e.stack)
            })
    }

    BuildRepString(input) {
        // remove blank array member (reps that were not recorded in the set)
        var repArr = [input.reps1,input.reps2,input.reps3,input.reps4,input.reps5]
        console.log('array not filtered: ', repArr)
        var repArr = repArr.filter(Boolean)
        console.log('array filtered: ', repArr)
        // place filtered set into a string
        var repString = ''
        var i
        for (i=0 ; i<repArr.length ; i++) {
            repString += repArr[i] + "|"
        }
        // remove the trailing "|"
        repString = repString.slice(0, -1)
        console.log(repString)
        return repString
    }
}

module.exports = Track