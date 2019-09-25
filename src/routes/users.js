const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	validate = require('../controllers/users.validate.js'),
	verifyToken = require('../serverAuth.js').verifyToken


usersRouter.route('/')
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users
 *     description: Get All users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 */
	.get(validate.index,usersCtrl.index)

	/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create a user
 *     description: create a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user detail information
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - email
 *             - password
 *           properties:
 *              name:
 *                type: string
 *              username:
 *                type: string
 *              address:
 *                type: object
 *                properties:
 *                  street: 
 *                    type: string
 *                  suite:
 *                    type: string
 *                  city: 
 *                    type: string
 *                  zipcode:
 *                    type: string
 *                  geo: 
 *                    type: object
 *                    properties:
 *                      lat:
 *                        type :string
 *                      lng:
 *                        type: string
 *              phone:
 *                type: string
 *              website:
 *                type: string
 *              company: 
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  catchPhrase:
 *                    type: string
 *                  bs: 
 *                    type: string
 *              id:
 *                type: integer
 *              email:
 *                type: string
 *              password:
 *                type: string
 */
	.post(validate.create,usersCtrl.create)



	/**
 * @swagger
 * /api/users/authenticate:
 *   post:
 *     summary: authenticate a user and returns a token
 *     description: authenticate a user using email and password
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: email and password
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 */
usersRouter.post('/authenticate',validate.authenticate, usersCtrl.authenticate)

	/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: getting a specific user
 *     description: getting a specific user's information by id and token
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of user
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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: update a user
 *     description: update a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of user
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
 *       - in: body
 *         name: user
 *         description: user detail information
 *         schema:
 *           type: object
 *           properties:
 *              name:
 *                type: string
 *              username:
 *                type: string
 *              address:
 *                type: object
 *                properties:
 *                  street: 
 *                    type: string
 *                  suite:
 *                    type: string
 *                  city: 
 *                    type: string
 *                  zipcode:
 *                    type: string
 *                  geo: 
 *                    type: object
 *                    properties:
 *                      lat:
 *                        type :string
 *                      lng:
 *                        type: string
 *              phone:
 *                type: string
 *              website:
 *                type: string
 *              company: 
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  catchPhrase:
 *                    type: string
 *                  bs: 
 *                    type: string
 *              password:
 *                type: string
 */

 	/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: deleting a specific user
 *     description: deleting a specific user's information by id and token
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all items
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of user
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
usersRouter.use(verifyToken)
usersRouter.route('/:id')
	.get(validate.show,usersCtrl.show)	
	.put(validate.update,usersCtrl.update)
	.delete(validate.destroy,usersCtrl.destroy)

module.exports = usersRouter