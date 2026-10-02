import { randomUUID } from "crypto";
import { TodoItem } from "./types";

export class TodoItemFactory {
  static create(text: string): TodoItem {
    return {
      id: randomUUID(),
      text,
      done: false,
      created: new Date().toISOString(),
    };
  }
}
