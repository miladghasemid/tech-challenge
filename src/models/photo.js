const
	mongoose = require('mongoose'),
	photoSchema = new mongoose.Schema({
		albumId: {type:Number, required: true},
		id: { type: Number, required: true },
		title: { type: String },
		url: { type: String },
		thumbnailUrl: { type: String }
		})

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo