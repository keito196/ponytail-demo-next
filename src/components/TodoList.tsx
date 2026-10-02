"use client";

import { useEffect, useState } from "react";
import { TodoItem } from "@/lib/types";

export default function TodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

  async function refresh() {
    const res = await fetch("/api/todos");
    setItems(await res.json());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    await refresh();
  }

  async function complete(id: string) {
    await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await refresh();
  }

  return (
    <div>
      <form onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Việc cần làm..." />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {items.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} disabled={t.done} onChange={() => complete(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
