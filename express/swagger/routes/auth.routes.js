const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { validateBody } = require('../middlewares/auth.middlewares');

/**
 * @openapi
 * /auth/register:
 *  post:
 *    description: Register
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                description: register email
 *                type: string
 *              password:
 *                description: register email
 *                type: string
 *    responses:
 *      201:
 *        description: Registered successfully
 *      400:
 *        description: Request content is invalid
 *      500:
 *        description: Internal server error
 */
router.post('/register', validateBody, authController.register);

/**
 * @openapi
 * /auth/sign-in:
 *  post:
 *    description: Login to user account
 *    produces:
 *    - application/json
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                description: register email
 *                type: string
 *              password:
 *                description: register email
 *                type: string
 *    responses:
 *      200:
 *        description: Sign in successfully. Returns access token.
 *      500:
 *        description: Internal server error
 */
router.post('/sign-in', authController.signIn);

module.exports = router;
