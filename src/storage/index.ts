import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const STORAGE_KEY = "app_storage";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storageData = await AsyncStorage.getItem(STORAGE_KEY);

    return storageData ? JSON.parse(storageData) : [];
  } catch (error) {
    throw new Error("Erro ao obter os dados do armazenamento.");
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get();
  return items.filter((item) => item.status === status);
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("Erro ao salvar os dados no armazenamento.");
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = [...items, newItem];
  await save(updatedItems);

  return updatedItems;
}

async function remove(id: string): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);
  await save(updatedItems);

  return updatedItems;
}

async function clearAllItems(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

async function toggleStausItems(id: string, status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  await save(updatedItems);

  return updatedItems;
  
}

export const itemsStorage = {
  get,
  getByStatus,
  save,
  add,
  remove,
  clearAllItems,
  toggleStausItems,
};
