const Photo = require('../models/Photo.js')
const Album = require('../models/Album.js')

module.exports = {

    index: (req, res) => {
        const userId = req.get('userId') || req.body.userId || req.query.userId
		Album.find({userId: userId}, (err, albums) => {
            var albumIds = albums.map(function(el) { return el.id } );
            Photo.find({ "albumId": { $in: albumIds } },function(err,photos) {
                res.json(photos)
             })
			
		})
	},
    // 
    show: (req, res) => {
        const id = req.get('id') || req.body.id || req.query.id
        // check if the photo exists
        Photo.findOne({id: id}, (err, photo) => {
            // if there's no user or the password is invalid
            if(!photo ) {
                // deny access
                return res.json({success: false, message: "Item not found."})
            }

            res.json({success: true, message: "photo attached.", photo})
        })
    },
    // create a new photo
	create: (req, res) => {
		Photo.create(req.body, (err, photo) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Photo created."})
		})
	},
};