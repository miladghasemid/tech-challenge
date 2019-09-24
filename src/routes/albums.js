const
	express = require('express'),
	albumsRouter = new express.Router(),
	albumsCtrl = require('../controllers/albums.js'),
	verifyToken = require('../serverAuth.js').verifyToken

    albumsRouter.use(verifyToken)
    albumsRouter.route('/')
	.get(albumsCtrl.index)
	.post(albumsCtrl.create)
    
    albumsRouter.route('/:id')
	.get(albumsCtrl.show)
	//.patch(albumsCtrl.update)
	//.delete(albumsCtrl.destroy)

module.exports = albumsRouter