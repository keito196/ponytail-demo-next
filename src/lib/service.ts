import { StorageBackend, JsonFileStorage } from "./storage";
import { TodoItemFactory } from "./factory";
import { TodoItem } from "./types";

export class TodoService {
  constructor(private storage: StorageBackend) {}

  async list(): Promise<TodoItem[]> {
    return this.storage.load();
  }

  async add(text: string): Promise<TodoItem> {
    const items = await this.storage.load();
    const item = TodoItemFactory.create(text);
    items.push(item);
    await this.storage.save(items);
    return item;
  }

  async complete(id: string): Promise<void> {
    const items = await this.storage.load();
    const found = items.find((t) => t.id === id);
    if (found) {
      found.done = true;
      await this.storage.save(items);
    }
  }
}

export const todoService = new TodoService(new JsonFileStorage());
