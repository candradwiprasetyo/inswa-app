import { NextResponse } from "next/server";
import pool from "@/lib/db";

function getIdFromRequest(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

export async function GET(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const result = await pool.query("SELECT * FROM partners WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await req.json();
  const { name, image, type } = body;

  const result = await pool.query(
    `UPDATE partners
     SET name = $1, image = $2, type = $3, updated_at = NOW()
     WHERE id = $4 RETURNING *`,
    [name, image, type, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await pool.query("DELETE FROM partners WHERE id = $1", [id]);
  return NextResponse.json({ message: "Deleted" });
}
