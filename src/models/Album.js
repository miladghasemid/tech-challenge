const
	mongoose = require('mongoose'),
	albumSchema = new mongoose.Schema({
		userId: {type:Number, required: true},
		id: { type: Number, required: true },
		title: { type: String }
		})
	albumSchema.pre('save', function (next) {
		var self = this;
		Album.find({id : self.id}, function (err, docs) {
			if (!docs.length){
				next();
			}else{                
				console.log('id exists: ',self.id);
				next(new Error("id exists!"));
			}
		});
	}) ;
const Album = mongoose.model('Album', albumSchema)
module.exports = Album