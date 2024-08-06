import { AppError } from './app.error';

export class UniqueConstraintError extends AppError {
    constructor(resource: string, fields: string[], values: unknown[]) {
        super('UniqueConstraintError', 409, `${resource} already exists for fields: ${fields.join(', ')} with values: ${values.join(', ')}`);
    }
}