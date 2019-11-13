const Conn = require('./../../../util/postgres')

const History = (req,res) => {
			let Query = 
                    `SELECT 
                    id,date,time,exercise,weight_per_rep,reps_per_set,priority 
                    FROM log`
			Conn
				.query(Query)
                .then((data) => {
                res.status(200).json({ log: data.rows}) 
                })
				.catch((e) => e.stack)		
}

module.exports = History