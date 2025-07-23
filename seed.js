import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectToDatabase from './database/mongodb.js';

import LocalData from './models/localData.model.js';
import CloudData from './models/cloudData.model.js';

const seedData = async () => {
    await connectToDatabase(); // ensure DB is connected

    await mongoose.connection.dropDatabase(); // clean old data

    const now = new Date();

    const localDocs = [
        { name: 'Item A', value: 'Local A', updatedAt: new Date(now.getTime() - 60000) }, // updated 1 min ago
        { name: 'Item B', value: 'Local B', updatedAt: new Date(now.getTime() - 30000) }, // updated 30 sec ago
        { name: 'Item C', value: 'Local C', updatedAt: new Date(now.getTime() - 10000) }, // updated 10 sec ago
    ];

    const cloudDocs = [
        { name: 'Item A', value: 'Cloud A', updatedAt: new Date(now.getTime() - 120000) }, // older than local
        { name: 'Item B', value: 'Cloud B', updatedAt: new Date(now.getTime() - 15000) }, // newer than local
        { name: 'Item D', value: 'Cloud D', updatedAt: now }, // only exists in cloud
    ];

    await LocalData.insertMany(localDocs);
    await CloudData.insertMany(cloudDocs);

    console.log('🌱 Sample data seeded to LocalData and CloudData collections.');
    process.exit();
};

seedData();
