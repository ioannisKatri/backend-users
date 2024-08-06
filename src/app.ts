import express, { type Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './modules/users/user.routes';
import { globalErrorHandler } from './commons';
import prisma from './database/prisma';
import { swaggerDocs, swaggerUi } from './swagger';

dotenv.config();

const app: Express = express();
app.use(cors())
    .use(express.json())
    .options('*', cors());

app.use('/v1', userRoutes.v1UserRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(globalErrorHandler);

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit();
});

export default app