import { NextResponse } from "next/server";
import { todoService } from "@/lib/service";

export async function GET() {
  return NextResponse.json(await todoService.list());
}

export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  return NextResponse.json(await todoService.add(text), { status: 201 });
}

export async function PATCH(req: Request) {
  const { id } = await req.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await todoService.complete(id);
  return NextResponse.json({ ok: true });
}
