import app from './app';
import { connectToDatabase } from './database/prisma';
import { config } from './commons';

const port = config.port;

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`[server]: Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();