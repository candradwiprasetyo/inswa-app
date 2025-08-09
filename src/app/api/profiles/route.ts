import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const result = await pool.query(
    "SELECT * FROM profiles ORDER BY created_at ASC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const countRes = await pool.query("SELECT COUNT(*) FROM profiles");
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
  const { name, images, description, position, facebook, youtube, instagram } =
    body;

  const result = await pool.query(
    `INSERT INTO profiles (name, images, description, position, facebook, youtube, instagram, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
     RETURNING *`,
    [name, images, description, position, facebook, youtube, instagram]
  );

  return NextResponse.json(result.rows[0]);
}
