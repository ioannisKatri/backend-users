import {ErrorDetail, ErrorResponse, RequestStatus, SuccessResponse} from './types';

export const createSuccessResponse = (data: unknown): SuccessResponse => ({
    status: RequestStatus.SUCCESS,
    data,
    timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
    status: ErrorResponse['status'],
    message: string,
    details?: ErrorDetail[],
): ErrorResponse => ({
    status,
    message,
    details,
    timestamp: new Date().toISOString(),
});