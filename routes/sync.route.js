import { Router } from "express";
import syncData from "../utils/syncEngine.js";
const syncRouter = Router();

syncRouter.post('/', async (req, res) => {
    try {
        const { mode = 'both' } = req.body;

        const validModes = ['both', 'local-to-cloud', 'cloud-to-local', 'overwrite-local'];
        if (!validModes.includes(mode)) {
            return res.status(400).json({ error: 'Invalid sync mode provided.' });
        }

        await syncData(mode);

        res.status(200).json({ message: `Sync completed successfully in '${mode}' mode.` });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Internal server error during sync.' });
    }
});

export default syncRouter;