const Photo = require('../models/Photo.js')
const Album = require('../models/Album.js')
const { check, validationResult } = require('express-validator');

module.exports = {

    index: (req, res) => {
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
        var query;
        if(req.query.albumId != undefined){
            query = {userId: req.user.id, id:req.query.albumId}
        }else{
            query = {userId: req.user.id}
        }
		Album.find(query, (err, albums) => {
            var albumIds = albums.map(function(el) { return el.id } );
            Photo.find({ "albumId": { $in: albumIds } },function(err,photos) {
                res.json(photos)
             })
			
		})
	},
    // 
    show: (req, res) => {
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
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
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
        var photoObj = req.body;
        Album.findOne({id: photoObj.albumId}, (err, album) => {
            // if there's no album
            if(!album ) {
                return res.json({success: false, message: "album not found."})
            }
            if (album.userId != req.user.id){
                return res.json({success: false, message: "album belongs to another user!"})                
            }
            
            //TODO: refactor this part
            Photo.find({id: photoObj.id}, (err, photos) => {

                if(photos.length){
                    return res.json({success: false, message: "photo with this id already exists!"})
                }else{
                    Photo.create(photoObj, (err, photo) => {
                        if(err) return res.json({success: false, code: err.code})
                        res.json({success: true, message: "Photo created.",photo})
                    })
                }

            })
            
        })

	},
};