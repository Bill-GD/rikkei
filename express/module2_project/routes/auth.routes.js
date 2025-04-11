import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { shouldEmailExists, validateBody } from '../middlewares/auth.middlewares.js';

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *    description: Register new user. Requires username, email and password.
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                description: Username
 *                required: true
 *                type: string
 *              email:
 *                description: Email
 *                required: true
 *                type: string
 *              password:
 *                description: Password
 *                required: true
 *                type: string
 *    responses:
 *      201:
 *        description: Successfully registered new user. Returns user ID.
 *      500:
 *        description: Internal server error.
 */
router.post('/register', validateBody, shouldEmailExists(false), AuthController.register);

export default router;
