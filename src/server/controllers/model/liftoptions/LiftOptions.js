const Conn = require('../../../util/postgres')

const LiftOptions = (req, res) => {
    let Query =
        `SELECT 
        id, name
        FROM liftoptions ORDER BY name ASC`
    Conn
        .query(Query)
        .then((data) => {
            res.status(200).json({ liftOptions: data.rows })
        })
        .catch(e => { 'lift options error', e.stack })
}

module.exports = LiftOptions