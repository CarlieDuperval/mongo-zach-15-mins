import { getDb } from './db';

interface Platform {
  name:string;
}

const getCollection = async () => {
  const db = await getDb();
  // Generic function : Define the shape of the collection/ change the return type of the collection <>
  return db.collection<Platform>('platforms');
};

export const createPlatform = async (platform: Platform) => {
  const col = await getCollection();
  const insertedResults = await col.insertOne(platform);

  return insertedResults.insertedId;
};

export const getPlatforms = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};
