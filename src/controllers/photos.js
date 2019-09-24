const Photo = require('../models/Photo.js')
const Album = require('../models/Album.js')

module.exports = {

    index: (req, res) => {
		Album.find({userId: req.user.id}, (err, albums) => {
            var albumIds = albums.map(function(el) { return el.id } );
            Photo.find({ "albumId": { $in: albumIds } },function(err,photos) {
                res.json(photos)
             })
			
		})
	},
    // 
    show: (req, res) => {
        Album.find({userId: req.user.id}, (err, albums) => {
            var albumIds = albums.map(function(el) { return el.id } );
            Photo.findOne({ id: req.params.id,albumId: { $in: albumIds } },function(err,photo) {
                if(!photo ) {
                    // deny access
                    return res.json({success: false, message: "photo not found or belong to another user."})
                }
    
                res.json({success: true, message: "photo attached.", photo})
             })
			
		})
    },
    // create a new photo
	create: (req, res) => {
        var photoObj = req.body;
        Album.findOne({id: photoObj.albumId}, (err, album) => {
            // if there's no album
            if(!album ) {
                return res.json({success: false, message: "album not found."})
            }
            if (album.userId != req.user.id){
                return res.json({success: false, message: "album belongs to another user!"})                
            }
            
            Photo.create(photoObj, (err, photo) => {
                if(err) return res.json({success: false, code: err.code})
                res.json({success: true, message: "Photo created.",photo})
            })
        })

	},
};