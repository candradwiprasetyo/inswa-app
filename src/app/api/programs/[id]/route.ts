import { NextResponse } from "next/server";
import pool from "@/lib/db";

function getIdFromRequest(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

export async function GET(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM programs WHERE id = $1 LIMIT 1",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
