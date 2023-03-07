const { Router } = require('express');

const apiRouter = new Router();

const { authenticationControl } = require('../../controllers/website/authenticationController');

const {
  terrainsController, usersController, controllerErrorHandler, eventsController,
} = require('../../controllers');
const apiErrorController = require('../../controllers/api/apiErrorController');
const NotFoundError = require('../../errors/NotFound');
const validate = require('../../validation/validator');
const { post: userPostSchema, patch: userPatchSchema, signin: userSigninSchema } = require('../../validation/schemas/member.schema');
const { post: eventPostSchema, patch: eventPatchSchema } = require('../../validation/schemas/events.schema');

/**
 * @swagger
 *  /users:
 *    post:
 *      tags:
 *        - Users
 *      summary: Create a user
 *      description: Create a user
 *      requestBody:
 *        description: Create a new user
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        201:
 *          description: Returns an object user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Returns a JSON with error message
 *        404:
 *          description: Returns a not found error
 */
apiRouter.post('/users', validate(userPostSchema, 'body'), controllerErrorHandler(usersController.addOneMember));
/**
 * @swagger
 *  /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Find user by ID
 *      description: Returns a single user
 *      operationId: getUserById
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: user not found
 *      security:
 *       - Authorization: []
 */
apiRouter.get('/users', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.getOneMember));
/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete an user
 *    description: Delete an user
 *    responses:
 *      202:
 *        description: Returns successfully request
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.delete('/users', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.deleteOneMember));
/**
 * @swagger
 * /users:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Update an user
 *    description: Update an user
 *    responses:
 *      202:
 *        description: Returns an User object
 *        content:
 *          application/json:
 *              schema:
 *                $ref: #/components/schemas/User
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 *    security:
 *      - Authorization: []
 */
apiRouter.patch('/users', controllerErrorHandler(authenticationControl), validate(userPatchSchema, 'body'), controllerErrorHandler(usersController.updateOneMember));
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
apiRouter.post('/users/signin', validate(userSigninSchema, 'body'), controllerErrorHandler(usersController.connectMember));
/**
 * @swagger
 * /terrains:
 *  get:
 *    tags:
 *      - Playground
 *    summary: Retrieve all playground by commune
 *    description: Retrieve all playground by commune
 *    parameters:
 *       - name: commune
 *         in: query
 *         description: Name of commune
 *         required: true
 *         schema:
 *           type: string
 *       - name: codepostal
 *         in: query
 *         description: Zip Code of commune
 *         required: true
 *         schema:
 *           type: string
 *    responses:
 *      202:
 *        description: Returns an array of Playground
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.get('/terrains', controllerErrorHandler(terrainsController.playgroundList));
/**
 * @swagger
 * /terrains/{playgroundId}:
 *  get:
 *    tags:
 *      - Playground
 *    summary: Retrieve One playground
 *    description: Retrieve One playground
 *    parameters:
 *       - name: playgroundId
 *         in: path
 *         description: ID of playground
 *         required: true
 *         schema:
 *           type: string
 *    responses:
 *      202:
 *        description: Returns an array of Playground
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Playground'
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 */
apiRouter.get('/terrains/:playgroundId', controllerErrorHandler(terrainsController.playgroundById));

/**
 * @swagger
 * /events:
 *  get:
 *    tags:
 *      - Events
 *    summary: Retrieve events for a user
 *    description: Retrieve events for a user
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
apiRouter.get('/events', controllerErrorHandler(authenticationControl), controllerErrorHandler(eventsController.eventList));
/**
 * @swagger
 * /users/{userId}/events:
 *  post:
 *    tags:
 *      - Events
 *    summary: Create one event by userid
 *    description: Create one event by userid
 *    parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user which want to create event
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    requestBody:
 *      description: Signin a user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Event'
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
apiRouter.post('/events', controllerErrorHandler(authenticationControl), validate(eventPostSchema, 'body'), controllerErrorHandler(eventsController.addOneEvent));
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
 *    requestBody:
 *      description: Update an event
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Event'
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
apiRouter.patch('/events/:eventId', controllerErrorHandler(authenticationControl), validate(eventPatchSchema, 'body'), controllerErrorHandler(eventsController.updateOneEvent));
/**
 * @swagger
 * /events/{eventId}:
 *  delete:
 *    tags:
 *      - Events
 *    summary: Delete an event
 *    description: Delete an event
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
 *        description: Returns successfull operation
 *      400:
 *        description: Returns a JSON with error message
 *      404:
 *        description: Returns a not found error
 *    security:
 *      - Authorization: []
 */
apiRouter.delete('/events/:eventId', controllerErrorHandler(authenticationControl), controllerErrorHandler(eventsController.deleteOneEvent));

// ROUTE 404
apiRouter.use((req, res, next) => {
  next(new NotFoundError());
});

// Gestionnaire d'erreur
apiRouter.use(apiErrorController.errorHandler);

module.exports = apiRouter;
