const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		User.find({id:req.params.id}, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		if (req.user.id != req.params.id){
			return res.send(500, { error: "cannot change another user's info" });
		}
		var query = {'id':req.user.id};
		req.body.id = req.user.id;
		User.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
			if (err) return res.send(500, { error: err });
			return res.send("succesfully saved");
		});
	},

	// delete an existing user
	destroy: (req, res) => {
		User.find({id:req.params.id}).remove( (err, user) => {
			if (err) return res.send(500, { error: err });
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}