import { promises as fs } from "fs";
import path from "path";
import { TodoItem } from "./types";

export interface StorageBackend {
  load(): Promise<TodoItem[]>;
  save(items: TodoItem[]): Promise<void>;
}

export class JsonFileStorage implements StorageBackend {
  constructor(private filePath: string = path.join(process.cwd(), "todos.json")) {}

  async load(): Promise<TodoItem[]> {
    try {
      const raw = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(raw) as TodoItem[];
    } catch {
      return [];
    }
  }

  async save(items: TodoItem[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2), "utf-8");
  }
}
