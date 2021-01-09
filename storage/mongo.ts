import { Collection, Db, MongoClient } from 'mongodb';
import { ItemType } from '../types/item';

const url = `mongodb+srv://vladimirm85:RMwDE9FDf3NeQFG@cluster0.gc0hm.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'arkanoid';
const collectionName = 'saves';

const getMongoDb = async (): Promise<Db> => {
  const client = await MongoClient.connect(url);

  return client.db(dbName);
};

const getMongoCollection = async (collectionName: string): Promise<Collection> => {
  const db = await getMongoDb();

  return db.collection(collectionName);
};

export const listAll = async () => {
  const collection = await getMongoCollection(collectionName);

  return collection.find({}).toArray();
};

export const getById = async (id: string) => {
  const collection = await getMongoCollection(collectionName);

  return collection.findOne({ id });
};

export const create = async (item: ItemType) => {
  const collection = await getMongoCollection(collectionName);

  item['_id'] = item.id;

  return collection.insertOne(item);
};

export const update = async (item: ItemType) => {
  const collection = await getMongoCollection(collectionName);
  const { id } = item;
  return collection.updateOne({ id }, item);
};

export const remove = async (id: string) => {
  const collection = await getMongoCollection(collectionName);

  return collection.deleteOne({ id });
};
