import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *  get:
 *    description: Returns all users in JSON format.
 *    responses:
 *      200:
 *        description: Successfully return all users.
 *      500:
 *        description: Internal server error. Returns error message.
 */
router.get('/', UserController.getUsers);

export default router;
