import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;
  const type = searchParams.get("type");

  try {
    let query = "SELECT * FROM partners";
    let countQuery = "SELECT COUNT(*) FROM partners";
    const params: (string | number)[] = [];
    const countParams: (string | number)[] = [];

    if (type) {
      query += " WHERE type = $1";
      countQuery += " WHERE type = $1";
      params.push(type);
      countParams.push(type);
    }

    params.push(limit, offset);
    query += ` ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${
      params.length
    }`;

    const result = await pool.query(query, params);
    const countRes = await pool.query(countQuery, countParams);

    const total = parseInt(countRes.rows[0].count, 10);

    return NextResponse.json({
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, image, type } = body;

  try {
    const result = await pool.query(
      `INSERT INTO partners (name, image, type, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [name, image, type]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
