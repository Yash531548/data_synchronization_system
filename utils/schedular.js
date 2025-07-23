import cron from 'node-cron';
import syncData from '../utils/syncEngine.js';

const startCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Running scheduled sync...`);

        try {
            await syncData();
            console.log(`[${timestamp}] Sync completed successfully.`);
        } catch (err) {
            console.error(`[${timestamp}] Sync failed:`, err);
        }
    });

    console.log('✅ Cron job initialized (runs every minute)');
};

export default startCronJobs;
