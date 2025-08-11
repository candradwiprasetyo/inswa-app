import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const result = await pool.query(
    "SELECT * FROM programs ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const countRes = await pool.query("SELECT COUNT(*) FROM programs");
  const total = parseInt(countRes.rows[0].count, 10);

  return NextResponse.json({
    data: result.rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, description, content, image } = body;

  const existing = await pool.query("SELECT id FROM programs WHERE slug = $1", [
    slug,
  ]);

  if (existing.rowCount! > 0) {
    return NextResponse.json(
      { message: "Slug already exists" },
      { status: 400 }
    );
  }

  const result = await pool.query(
    `INSERT INTO programs (name, slug, description, content, image, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
     RETURNING *`,
    [name, slug, description, content, image]
  );
  return NextResponse.json(result.rows[0]);
}
