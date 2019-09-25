const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react-express-jwt',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js')
	albumsRoutes = require('./routes/albums.js')
	photosRoutes = require('./routes/photos.js')

//swagger documentation
var swaggerUi = require('swagger-ui-express'); 
var swaggerJSDoc = require('swagger-jsdoc'); 

//TODO: add default path to each routes and /api to all routes
var options = { 
	swaggerDefinition: {
		info: {
		title: 'mavennet photo gallery API documentation', // Title (required)
		version: '1.0.0', // Version (required)
		},
	},
	apis: ['./routes/*'], // Path to the API docs
	};
var swaggerSpec = swaggerJSDoc(options); 

app.get('/api/api-docs.json', function(req, res) { 
res.setHeader('Content-Type', 'application/json');
res.send(swaggerSpec);
});


app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

//TODO: move to init mongo file and require here
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.redirect('/api/api-docs');
})

app.use('/api/users', usersRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/photos', photosRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})
