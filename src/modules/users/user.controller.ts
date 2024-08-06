import { Request, Response, NextFunction } from 'express';
import { createUserService, getUsersService } from './user.service';
import { createSuccessResponse } from '../../commons';
import { GetUsers } from './types';

export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = await createUserService(req.body);
        res.status(201).send(createSuccessResponse(user));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const users = await getUsersService(req.query as GetUsers);
        res.status(200).send(createSuccessResponse(users));
    } catch (err) {
        console.log(err);
        next(err);
    }
};
