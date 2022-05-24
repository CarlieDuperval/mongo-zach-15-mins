import { ObjectId } from 'mongodb';
import { getDb } from './db';
// Tvshows is the type () and tvShow is a parameter
interface TvShows {
  name:string;
  platformIds: ObjectId[];
}

const getCollection = async () => {
  const db = await getDb();
  return db.collection<TvShows>('tv-shows');
};

export const createTvShows = async (tvShow :TvShows) => {
  const col = await getCollection();
  const ret = await col.insertOne(tvShow);

  return ret.insertedId;
};

export const getTvShows = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};

export const getShowsByPlatform = async (platformId: ObjectId) => {
  const col = await getCollection();
  const ret = col.find({
    platformId,
  });
  return ret.toArray();
};

export const getShowsByName = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name: {
      $regex: `.*${name}.*`,
    },
  });
  return ret.toArray();
};

export const getShowsByNameExactMatch = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name,
  });
  return ret.toArray();
};