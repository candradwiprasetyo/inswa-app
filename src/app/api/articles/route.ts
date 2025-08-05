import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM articles ORDER BY created_at DESC"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, content, author_id, images } = body;

  const existing = await pool.query("SELECT id FROM articles WHERE slug = $1", [
    slug,
  ]);

  if (existing.rowCount! > 0) {
    return NextResponse.json(
      { message: "Slug already exists" },
      { status: 400 }
    );
  }

  const result = await pool.query(
    `INSERT INTO articles (title, slug, content, author_id, images, created_at, updated_at)
   VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
   RETURNING *`,
    [title, slug, content, author_id, images]
  );
  return NextResponse.json(result.rows[0]);
}
