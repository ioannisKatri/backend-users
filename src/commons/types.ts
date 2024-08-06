type BaseResponse = {
    status: string;
    timestamp: string;
}

export type SuccessResponse = BaseResponse & {
    status: RequestStatus;
    data: unknown;
}

export type ErrorDetail = {
    field: string;
    value: string;
    location: string;
    issue: string;
    description: string;
}

export type ErrorResponse = {
    status: RequestStatus
    message?: string;
    details?: ErrorDetail[];
    timestamp: string;
}


export enum RequestStatus {
    VALIDATION_FAILED = 'validation_failed',
    NOT_FOUND = 'not_found',
    ERROR = 'error',
    SUCCESS = 'success',
}