const Conn = require('../../../util/postgres')

const RecentLog = (req, res) => {
    const Query = {
        text:
            `SELECT 
            id,date,time,exercise,weight_per_rep,reps_per_set,priority 
            FROM log WHERE exercise = $1 LIMIT 3`,
        values: [req.params.exercise]
    }
    Conn
        .query(Query)
        .then((data) => {
            res.status(200).json({ log: data.rows })
        })
        .catch((e) => e.stack)
}

module.exports = RecentLog
