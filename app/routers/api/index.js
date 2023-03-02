const { Router } = require('express');

const apiRouter = new Router();

const { authenticationControl } = require('../../controllers/website/authenticationController');

const {
  terrainsController, usersController, controllerErrorHandler, eventsController,
} = require('../../controllers');
const apiErrorController = require('../../controllers/api/apiErrorController');
const NotFoundError = require('../../errors/NotFound');

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - Users
 *    summary: Create a user
 *    description: Create a user
 *    requestBody:
 *      description: Create a new user
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                type: string
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: Returns an object user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.post('/users', controllerErrorHandler(usersController.addOneMember));
/**
 * @swagger
 * /users/:userId:
 *   get:
 *     tags:
 *       - users/:userId
 *     summary: Find user by ID
 *     description: Returns a single user
 *     operationId: getUserById
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of user to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: user not found
 *     security:
 *       - api_key: []
 *       - petstore_auth:
 *          - write:users
 *          - read:users
 */
apiRouter.get('/users/:userId', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.getOneMember));
/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete an user
 *    description: Delete an user
 *    parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user to delete
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *      202:
 *        description: Returns successfully request
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.delete('/users/:userId', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.deleteOneMember));
/**
 * @swagger
 * /users/:userId:
 *   patch:
 *     tags:
 *       - user
 *     summary: Update an existing user
 *     description: Update an existing user by Id
 *     operationId: UpdateOneMember
 *     requestBody:
 *          description: Update an existent user in the store
 *     content:
 *            application/json:
 *              schema:
 *                  $ref: '#/app/schemas/Pet'
 *     responses:
 *          '200':
 *           description: Successful operation
 *           content:
 *              application/json:
 *            schema:
 *            $ref: '#/components/schemas/Pet'
 *          '400':
 *            description: Invalid ID supplied
 *          '404':
 *            description: Pet not found
 *          '405':
 *            description: Validation exception
 *            security:
 *              - petstore_auth:
 *              - write:pets
 *              - read:pets
*/
apiRouter.patch('/users/:userId', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.updateOneMember));
/**
 * @swagger
 * /users/signin:
 *  post:
 *    tags:
 *      - Users
 *    summary: Signin a user
 *    description: Signin a user
 *    requestBody:
 *      description: Signin a user
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      202:
 *        description: Returns a JWT Token
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.post('/users/signin', controllerErrorHandler(usersController.connectMember));
apiRouter.get('/terrains', controllerErrorHandler(terrainsController.playgroundList));

// apiRouter.get('/terrains/:id', controllerErrorHandler(terrainsController.playgroundById));

// apiRouter.get('/terrains/:id/events', controllerErrorHandler(terrainsController.playgroundEvent));

/**
 * @swagger
 * /users/{userId}/events:
 *  get:
 *    tags:
 *      - Users
 *    summary: Retrieve events for a user
 *    description: Retrieve events for a user
 *    parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user which have event to consulte
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      202:
 *        description: Returns an array of events
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 *    security:
 *      - Authorization: []
 */
apiRouter.get('/users/:userId/events', authenticationControl, controllerErrorHandler(eventsController.eventList));

apiRouter.post('/users/:userId/events', authenticationControl, controllerErrorHandler(eventsController.addOneEvent));
/**
 * @swagger
 * /events/{eventId}:
 *  patch:
 *    tags:
 *      - Events
 *    summary: Update an event
 *    description: Update an event
 *    parameters:
 *       - name: eventId
 *         in: path
 *         description: ID of event
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      202:
 *        description: Returns an Event object
 *        content:
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/Event'
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 *    security:
 *      - Authorization: []
 */
apiRouter.patch('/events/:eventId', authenticationControl, controllerErrorHandler(eventsController.updateOneEvent));
apiRouter.delete('/events/:eventId', authenticationControl, controllerErrorHandler(eventsController.deleteOneEvent));

// ROUTE 404
apiRouter.use((req, res, next) => {
  next(new NotFoundError());
});

// Gestionnaire d'erreur
apiRouter.use(apiErrorController.errorHandler);

module.exports = apiRouter;
