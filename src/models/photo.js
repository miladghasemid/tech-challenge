const mongoose = require('mongoose'),
photoSchema = new mongoose.Schema({
	albumId: {type:Number, required: true},
	id: { type: Number, required: true },
	title: { type: String },
	url: { type: String },
	thumbnailUrl: { type: String }
	})

photoSchema.pre('save', function (next) {
	var self = this;
	Photo.find({id : self.id}, function (err, docs) {
		if (!docs.length){
			next();
		}else{                
			console.log('id exists: ',self.id);
			next(new Error("id exists!"));
		}
	});
}) ;
const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo