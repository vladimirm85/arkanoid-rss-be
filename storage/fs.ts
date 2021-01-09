import { promises as fsp } from 'fs';
import { ItemType } from '../types/item';

const fileName = 'items.json';

const filePath = `${__dirname}/${fileName}`;

const readItemList = async (): Promise<ItemType[]> => {
  let list: ItemType[] = [];

  try {
    const contents = await fsp.readFile(filePath, 'utf-8');

    const parseList = JSON.parse(contents);

    if (!Array.isArray(parseList)) {
      throw new TypeError();
    }

    list = parseList;
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    console.warn(`There was an error: ${e.message}`);
  }

  return list;
};

const writeItemList = async (list: ItemType[]): Promise<ItemType[]> => {
  const stringifiedList = JSON.stringify(list);

  await fsp.writeFile(filePath, stringifiedList, 'utf-8');

  return list;
};

export const listAll = async (): Promise<ItemType[]> => {
  const list = await readItemList();

  return list;
};

export const getById = async (id: string): Promise<ItemType | undefined> => {
  const list = await readItemList();

  return list.find((item) => item.id === id);
};

export const create = async (item: ItemType): Promise<ItemType | undefined> => {
  const list = await readItemList();

  list.push(item);

  await writeItemList(list);

  return item;
};

export const update = async (item: ItemType): Promise<ItemType> => {
  const list = await readItemList();

  const index = list.findIndex((listItem) => item.id === listItem.id);

  if (index === -1) throw new Error();

  list[index] = item;

  await writeItemList(list);

  return item;
};

export const remove = async (id: string): Promise<void> => {
  const list = await readItemList();

  const index = list.findIndex((item) => item.id === id);

  list.splice(index, 1);

  await writeItemList(list);

  return null;
};
