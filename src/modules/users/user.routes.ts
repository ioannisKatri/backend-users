import { Router } from 'express';
import { validateCreateUser, validateGetUsers } from './user.middleware';
import { createUserController, getUsersController } from './user.controller';

const router = Router();

router.post('/users', validateCreateUser, createUserController);
router.get('/users', validateGetUsers, getUsersController);

export default { v1UserRoutes: router };
