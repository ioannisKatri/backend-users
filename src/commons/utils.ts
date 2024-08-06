import { ValidationError } from 'joi';
import { ErrorDetail, RequestStatus } from './types';
import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from './responses';
import { Prisma } from '@prisma/client';
import { UniqueConstraintError } from './errors';
import { AppError } from './errors';


export const validationErrorMapper = (error: ValidationError, location: string): ErrorDetail[] => {
    return error.details.map((detail) => ({
        field: detail.path.join('.'),
        value: detail.context?.value,
        location,
        issue: detail.type,
        description: detail.message,
    }));
}

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.httpCode).json(createErrorResponse(RequestStatus.ERROR, err.message, []));
    } else {
        res.status(500).json(createErrorResponse(RequestStatus.ERROR, 'Internal Server Error', []));
    }
}


// prisma error codes https://www.prisma.io/docs/orm/reference/error-reference#error-codes
export function handlePrismaError(error: unknown, inputData: Record<string, unknown>): Error {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint failed
            const meta = error.meta as { target: string[] };
            const targetFields = meta.target;
            const targetValues = targetFields.map(field => inputData[field]);
            return new UniqueConstraintError('User', targetFields, targetValues);
        }
    }
    return new Error('Database operation failed');
}