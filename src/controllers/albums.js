const Album = require('../models/Album.js')

module.exports = {

    index: (req, res) => {
        const userId = req.get('userId') || req.body.userId || req.query.userId
		Album.find({userId: userId}, (err, albums) => {
            res.json(albums)
		})
	},
    // 
    show: (req, res) => {
        // check if the album exists
        const id = req.get('id') || req.body.id || req.query.id
        Album.findOne({id: id}, (err, album) => {
            // if there's no album
            if(!album ) {
                return res.json({success: false, message: "Item not found."})
            }

            res.json({success: true, message: "album attached.", album})
        })
    },
    // create a new album
	create: (req, res) => {
		Album.create(req.body, (err, album) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Album created."})
		})
	},
};