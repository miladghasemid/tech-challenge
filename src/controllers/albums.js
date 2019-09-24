const Album = require('../models/Album.js')

module.exports = {

    index: (req, res) => {
		Album.find({userId: req.user.id}, (err, albums) => {
            if(!albums ) {
                return res.json({success: false, message: "Albums not found."})
            }
            res.json(albums)
		})
	},
    // 
    show: (req, res) => {
        // check if the album exists
        Album.findOne({id: req.params.id}, (err, album) => {
            // if there's no album
            if(!album ) {
                return res.json({success: false, message: "Item not found."})
            }
            if (album.userId != req.user.id){
                return res.json({success: false, message: "Item belongs to another user!"})                
            }

            res.json({success: true, message: "album attached.", album})
        })
    },
    // create a new album
	create: (req, res) => {
        var albumObj = req.body;
        //setting album owner
        albumObj.userId = req.user.id;
		Album.create(albumObj, (err, album) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Album created."})
		})
	},
};