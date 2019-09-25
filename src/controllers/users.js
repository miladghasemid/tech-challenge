const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken
const { check, validationResult } = require('express-validator');


module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
		console.log("Current User:")
		console.log(req.user)
		User.find({id:req.params.id}, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
		  User.find({id: req.body.id}, (err, users) => {

			if(users.length){
				return res.json({success: false, message: "user with this id already exists!"})
			}else{
				User.create(req.body, (err, user) => {
					if(err) return res.json({success: false, code: err.code})
					// once user is created, generate a token to "log in":
					const token = signToken(user)
					res.json({success: true, message: "User created. Token attached.", token})
				})
			}

		})

	},

	// update an existing user
	update: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 

		var query = {id:req.user.id};
		req.body.id = req.user.id;
		User.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
			if (err) return res.send(500, { error: err });
			return res.send("succesfully saved");
		});
	},

	// delete an existing user
	destroy: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
		User.find({id:req.params.id}).remove( (err, user) => {
			if (err) return res.send(500, { error: err });
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).jsonp(errors.array());
		  } 
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