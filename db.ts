import {MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

export const getDb = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();

  return client.db('zachs-db');
};
