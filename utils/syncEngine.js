import localData from '../models/localData.model.js';
import cloudData from '../models/cloudData.model.js';

const syncData = async (mode = 'both') => {
    console.log(`Starting synchronization in '${mode}' mode...`);

    const localDocs = await localData.find({});
    const cloudDocs = await cloudData.find({});

    const cloudMap = new Map(cloudDocs.map(doc => [doc.name, doc]));
    const localMap = new Map(localDocs.map(doc => [doc.name, doc]));

    // Local → Cloud
    if (mode === 'local-to-cloud' || mode === 'both') {
        for (const local of localDocs) {
            const cloud = cloudMap.get(local.name);
            if (!cloud || new Date(local.updatedAt) > new Date(cloud.updatedAt)) {
                await cloudData.findOneAndUpdate(
                    { name: local.name },
                    { value: local.value, updatedAt: local.updatedAt },
                    { upsert: true }
                );
            }
        }
    }

    // Cloud → Local
    if (mode === 'cloud-to-local' || mode === 'both') {
        for (const cloud of cloudDocs) {
            const local = localMap.get(cloud.name);
            if (!local || new Date(cloud.updatedAt) > new Date(local.updatedAt)) {
                await localData.findOneAndUpdate(
                    { name: cloud.name },
                    { value: cloud.value, updatedAt: cloud.updatedAt },
                    { upsert: true }
                );
            }
        }
    }

    // Overwrite local with cloud (blind overwrite)
    if (mode === 'overwrite-local') {
        await localData.deleteMany({});
        await localData.insertMany(cloudDocs);
    }

    console.log(`Synchronization complete in '${mode}' mode.`);
};

export default syncData;
