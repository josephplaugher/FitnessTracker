const Conn = require('../../../util/postgres')

const RecentLog = (req, res) => {
    const Query = {
        text:
            `SELECT 
            date,time,lift,set1,set2,set3,set4,set5,set6,set7,set8,weight,fatigueindex 
            FROM log WHERE lift = $1 ORDER BY date ASC LIMIT 5`,
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
