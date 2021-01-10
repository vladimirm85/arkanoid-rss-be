import { Collection, Db, MongoClient } from 'mongodb';
import { ItemType } from '../types/item';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;
const dbName = 'arkanoid';

const getMongoDb = async (): Promise<Db> => {
  const client = await MongoClient.connect(url);

  return client.db(dbName);
};

const getMongoDbCollection = async (collectionName: string): Promise<Collection> => {
  const db = await getMongoDb();

  return db.collection(collectionName);
};

export const listAll = async (collectionName: string) => {
  const collection = await getMongoDbCollection(collectionName);

  return collection.find({}).toArray();
};

export const getById = async (collectionName: string, id: string) => {
  const collection = await getMongoDbCollection(collectionName);

  return collection.findOne({ id });
};

export const create = async (collectionName: string, item: ItemType) => {
  const collection = await getMongoDbCollection(collectionName);

  const response = await collection.insertOne(item);

  return response.ops[0];
};

export const update = async (collectionName: string, item: ItemType) => {
  const collection = await getMongoDbCollection(collectionName);

  const { id } = item;

  const response = await collection.replaceOne({ id }, item);

  return response.ops[0];
};

export const remove = async (collectionName: string, id: string) => {
  const collection = await getMongoDbCollection(collectionName);

  return collection.deleteOne({ id });
};
