const Conn = require('./../../../util/postgres')

const History = (req, res) => {
    let Query =
        `SELECT 
        id, date,time,lift,set1,set2,set3,set4,set5,set6,set7,set8,
        weight,fatigueindex
        FROM log ORDER BY date ASC LIMIT 10`
    Conn
        .query(Query)
        .then((data) => {
            res.status(200).json({ log: data.rows })
        })
        .catch((e) => e.stack)
}

module.exports = History