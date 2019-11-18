const Conn = require('../../../util/postgres')

class Track {
    constructor(req,res) {
        this.req = req
        this.res = res
    }

    LogASet(req, res){
        const i = req.params
        const Query = {
            text:
            `INSERT INTO log 
            (exercise,weight_per_rep,reps_per_set,priority)
            VALUES($1,$2,$3,0)`,
            values: [i.exercise,i.weight,i.reps]
        }
        Conn
            .query(Query)
            .then((data) => {
                res.status(200).json({ success:true })
            })
            .catch((e) => e.stack)
    }
}

module.exports = Track