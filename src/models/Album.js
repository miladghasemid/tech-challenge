const
	mongoose = require('mongoose'),
	albumSchema = new mongoose.Schema({
		userId: {type:Number, required: true},
		id: { type: Number, required: true },
		title: { type: String }
		})

const Album = mongoose.model('Album', albumSchema)
module.exports = Album