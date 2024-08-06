import { PrismaClient } from '@prisma/client';
import { config } from '../commons';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: config.databaseUrl,
        },
    },
});

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.info('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

export default prisma;
