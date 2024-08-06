import dotenv from 'dotenv';
import { join } from 'path';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = join(__dirname, '../..', envFile);

const result = dotenv.config({ path: envPath });

if (result.error) {
    throw new Error(`Failed to load environment file at ${envPath}: ${result.error.message}`);
}

const { PORT, DATABASE_URL } = result.parsed || {};

if (!DATABASE_URL) {
    throw new Error('Missing required environment variable: DATABASE_URL');
}

export const config = {
    port: PORT ? parseInt(PORT, 10) : 3000,
    databaseUrl: DATABASE_URL,
};
