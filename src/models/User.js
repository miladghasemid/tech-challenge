const
	mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	userSchema = new mongoose.Schema({
		id: {type:Number},
		name: { type: String },
		username: { type: String },
		email: { type: String, required: true, unique: true },		
		address: {
			street: {type: String},
			suite: {type:String},
			city: {type:String},
			zipcode:{type:String},
			geo: {
				lat:{type:String},
				lng:{type:String}
			}
		},
		phone:{type:String},
		website:{type:String},
		company:{
			name:{type:String},
			catchPhrase:{type:String},
			bs:{type:String}
		},
		password: { type: String, required: true }
	})

// adds a method to a user document object to create a hashed password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// adds a method to a user document object to check if provided password is correct
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
userSchema.pre('save', function(next) {
	if(this.password != undefined && this.isModified('password')) {
		this.password = this.generateHash(this.password)
	}
	next()
})

const User = mongoose.model('User', userSchema)
module.exports = User