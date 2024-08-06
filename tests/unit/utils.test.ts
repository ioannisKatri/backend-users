import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import {
    AppError,
    globalErrorHandler,
    handlePrismaError,
    RequestStatus,
    UniqueConstraintError,
    validationErrorMapper,
} from '../../src/commons';
import * as responses from '../../src/commons/responses';

describe('validationErrorMapper', () => {
    it('should map Joi validation errors to ErrorDetail objects', () => {
        const joiError: ValidationError = {
            name: 'ValidationError',
            details: [
                {
                    message: 'Invalid value',
                    path: ['email'],
                    type: 'string.email',
                    context: { value: 'invalid_email' },
                },
            ],
        } as ValidationError;
        const location = 'body';
        const result = validationErrorMapper(joiError, location);
        expect(result).toEqual([
            {
                field: 'email',
                value: 'invalid_email',
                location,
                issue: 'string.email',
                description: 'Invalid value',
            },
        ]);
    });
});

describe('globalErrorHandler', () => {
    const req = {} as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    it('should handle AppError correctly', () => {
        const error = new AppError('Something went wrong', 400, 'unexpected system error');
        const spyCreateErrorResponse = jest.spyOn(responses, 'createErrorResponse');
        globalErrorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(spyCreateErrorResponse).toHaveBeenCalledWith(
            RequestStatus.ERROR,
            'unexpected system error',
            [],
        );
    });

    it('should handle generic errors correctly', () => {
        const error = new Error('Some error');
        const spyCreateErrorResponse = jest.spyOn(responses, 'createErrorResponse');
        globalErrorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(spyCreateErrorResponse).toHaveBeenCalledWith(
            RequestStatus.ERROR,
            'Internal Server Error',
            [],
        );
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });
});

describe('handlePrismaError', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should map Prisma P2002 error to UniqueConstraintError', () => {
        const error = new Prisma.PrismaClientKnownRequestError(
            'Unique constraint failed on the fields: (`email`)',
            {
                code: 'P2002',
                clientVersion: '2.0.0',
                meta: { target: ['email'] },
            },
        );
        const inputData = { email: 'test@example.com' };
        const result = handlePrismaError(error, inputData);
        expect(result).toBeInstanceOf(UniqueConstraintError);
        expect((result as UniqueConstraintError).message).toEqual(expect.stringContaining(''));
    });

    it('should return a generic error for other Prisma errors', () => {
        const error = new Prisma.PrismaClientKnownRequestError('Some other error', {
            code: 'P2003',
            clientVersion: '2.0.0',
        });
        const inputData = { someField: 'someValue' };
        const result = handlePrismaError(error, inputData);
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toBe('Database operation failed');
    });
});
