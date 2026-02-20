import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const DB_NAME = 'food_ordering_system';
const USERS_COLLECTION = 'users';

async function migrateDataToMongoDB() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const usersCollection = db.collection(USERS_COLLECTION);

    // Read data from JSON file
    const usersFile = path.join(process.cwd(), 'data', 'users.json');
    
    if (!fs.existsSync(usersFile)) {
      console.log('No users.json file found. Skipping migration.');
      return;
    }

    const jsonData = fs.readFileSync(usersFile, 'utf-8');
    let usersRaw = JSON.parse(jsonData);

    // Normalize to array. Supports both { email: user } map and [ user, ... ] array.
    let users = Array.isArray(usersRaw)
      ? usersRaw
      : typeof usersRaw === 'object' && usersRaw !== null
        ? Object.values(usersRaw)
        : [];

    if (!Array.isArray(users) || users.length === 0) {
      console.log('No users to migrate.');
      return;
    }

    // Prepare users for MongoDB: ensure unique emails and add timestamps
    const seenEmails = new Set();
    const migratedUsers = users
      .filter(u => {
        if (!u || !u.email) return false;
        if (seenEmails.has(u.email)) return false;
        seenEmails.add(u.email);
        return true;
      })
      .map(user => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    if (migratedUsers.length === 0) {
      console.log('No valid users to migrate.');
      return;
    }

    // Upsert users by email to avoid duplicates if re-running
    const bulkOps = migratedUsers.map(u => ({
      updateOne: {
        filter: { email: u.email },
        update: {
          $setOnInsert: {
            email: u.email,
            createdAt: u.createdAt || new Date(),
          },
          $set: {
            // Do not overwrite createdAt on updates
            updatedAt: new Date(),
            // Keep fields in sync on insert and update
            name: u.name,
            phone: u.phone,
            password: u.password,
            googleId: u.googleId,
          },
        },
        upsert: true,
      },
    }));

    const result = await usersCollection.bulkWrite(bulkOps, { ordered: false });
    const inserted = result.upsertedCount || 0;
    const modified = result.modifiedCount || 0;
    console.log(`Migration complete. Inserted: ${inserted}, Updated: ${modified}`);

  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration
migrateDataToMongoDB().catch(console.error);
