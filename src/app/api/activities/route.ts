import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const programId = parseInt(searchParams.get("program_id") || "", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT * FROM activities WHERE program_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    [programId, limit, offset]
  );
  const countRes = await pool.query(
    `SELECT COUNT(*) FROM activities WHERE program_id = $1`,
    [programId]
  );
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
  const { program_id, name, content, year, location, pic } = body;

  const result = await pool.query(
    `INSERT INTO activities
     (program_id, name, content, year, location, pic, created_at, updated_at)
   VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW())
   RETURNING *`,
    [program_id, name, content, year, location, pic]
  );
  return NextResponse.json(result.rows[0]);
}
