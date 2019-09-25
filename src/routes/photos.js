const
	express = require('express'),
	photosRouter = new express.Router(),
	photosCtrl = require('../controllers/photos.js'),
	validate = require('../controllers/photos.validate.js'),
	verifyToken = require('../serverAuth.js').verifyToken

       /**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get photos
 *     description: Get All photos
 *     tags: [Photos]
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
 *           type: string
 *       - in: query
 *         name: albumId
 *         description: albumId is optional to filter
 *         schema:
 *           type: integer
 */


     /**
 * @swagger
 * /api/photos:
 *   post:
 *     summary: create photo
 *     description: create photo
 *     tags: [Photos]
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
 *         name: photo
 *         description: photo
 *         schema:
 *           type: object
 *           required:
 *             - albumId
 *             - id
 *             - title
 *             - url
 *             - thumbnailUrl
 *           properties:
 *              albumId:
 *                type: integer
 *              id:
 *                type: integer
 *              title:
 *                type: string
 *              url:
 *                type: string
 *              thumbnailUrl:
 *                type: string
 */
    photosRouter.use(verifyToken)
    photosRouter.route('/')
	.get(validate.index,photosCtrl.index)
	.post(validate.create,photosCtrl.create)
 
            /**
 * @swagger
 * /api/photos/{id}:
 *   get:
 *     summary: Get a photo
 *     description: Get a photo in detail
 *     tags: [Photos]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: path
 *         name: id
 *         description: photo id
 *         schema:
 *           type: integer
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
    photosRouter.route('/:id')
	.get(validate.show,photosCtrl.show)
	//.patch(photosCtrl.update)
	//.delete(photosCtrl.destroy)

module.exports = photosRouter