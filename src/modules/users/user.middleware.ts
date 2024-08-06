import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { createErrorResponse } from '../../commons';
import { ErrorDetail, RequestStatus } from '../../commons';
import { validationErrorMapper } from '../../commons';

const orderBy = ['createdAt'];
const sortBy = ['asc', 'desc'];

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
}).unknown(false);

const querySchema = Joi.object({
    orderBy: Joi.string().valid(...orderBy).default('createdAt'),
    sortBy: Joi.string().valid(...sortBy).default('desc'),
});

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        const details: ErrorDetail[] = validationErrorMapper(error, 'body');
        const response = createErrorResponse(RequestStatus.VALIDATION_FAILED, 'Invalid request payload input', details);
        return res.status(400).send(response);
    }
    req.body = value;
    next();
};

export const validateGetUsers = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
        const details: ErrorDetail[] = validationErrorMapper(error, 'queryParameters');
        const response = createErrorResponse(RequestStatus.VALIDATION_FAILED, 'Invalid request query parameters', details);
        return res.status(400).send(response);
    }
    req.query = value;
    next();
};
