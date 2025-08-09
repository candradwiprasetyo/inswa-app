import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  const body = await req.json();
  const { name, slug, description, content, image } = body;

  const result = await pool.query(
    `UPDATE programs SET name = $1, slug = $2, description = $3, content = $4, image = $5, updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [name, slug, description, content, image, id]
  );

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  await pool.query("DELETE FROM programs WHERE id = $1", [id]);

  return NextResponse.json({ message: "Deleted" });
}
