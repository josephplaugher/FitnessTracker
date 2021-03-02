const Conn = require('../../../util/postgres')

const AllRecentLog = (req, res) => {
    const Query = 
            `SELECT 
            date,time,lift,set1,set2,set3,set4,set5,set6,set7,set8,weight,fatigueindex 
            FROM log ORDER BY date DESC LIMIT 5`
    Conn
        .query(Query)
        .then((data) => {
            res.status(200).json({ log: data.rows })
        })
        .catch((e) => e.stack)
}

module.exports = AllRecentLog
