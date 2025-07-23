import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import syncRouter from './routes/sync.route.js';
import startCronJobs from './utils/schedular.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/sync', syncRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Real Time Synchronisation API');;
});

// ✅ Connect DB first, then start server
const startServer = async () => {
    try {
        await connectToDatabase(); // Wait until DB is connected
        app.listen(PORT || 3000, () => {
            console.log(`Real Time Synchronisation API is running on http://localhost:${PORT}`);
        });
        startCronJobs();
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();

export default app;