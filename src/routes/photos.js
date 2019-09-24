const
	express = require('express'),
	photosRouter = new express.Router(),
	photosCtrl = require('../controllers/photos.js'),
	verifyToken = require('../serverAuth.js').verifyToken

    photosRouter.use(verifyToken)
    photosRouter.route('/')
	.get(photosCtrl.index)
	.post(photosCtrl.create)
 
    photosRouter.route('/:id')
	.get(photosCtrl.show)
	//.patch(photosCtrl.update)
	//.delete(photosCtrl.destroy)

module.exports = photosRouter