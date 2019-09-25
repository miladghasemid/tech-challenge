const
	express = require('express'),
	albumsRouter = new express.Router(),
	albumsCtrl = require('../controllers/albums.js'),
	verifyToken = require('../serverAuth.js').verifyToken

    /**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Get albums
 *     description: Get All albums
 *     tags: [Albums]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: query
 *         name: token
 *         description: token
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *              token:
 *                type: string
 */

     /**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: create album
 *     description: create album
 *     tags: [Albums]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: query
 *         name: token
 *         description: token
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *              token:
 *                type: string
 *       - in: body
 *         name: album
 *         description: album
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - title
 *           properties:
 *              id:
 *                type: integer
 *              title:
 *                type: string
 */
    albumsRouter.use(verifyToken)
    albumsRouter.route('/')
	.get(albumsCtrl.index)
	.post(albumsCtrl.create)

    
        /**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Get an album
 *     description: Get an album in detail
 *     tags: [Albums]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: path
 *         name: id
 *         description: album id
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         description: token
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *              token:
 *                type: string
 */
    albumsRouter.route('/:id')
	.get(albumsCtrl.show)
	//.patch(albumsCtrl.update)
	//.delete(albumsCtrl.destroy)

module.exports = albumsRouter