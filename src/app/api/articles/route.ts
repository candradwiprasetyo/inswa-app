import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  if (slug) {
    const result = await pool.query(
      "SELECT * FROM articles WHERE slug = $1 LIMIT 1",
      [slug]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: result.rows[0] });
  }

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (type) {
    params.push(type);
    conditions.push(`type = $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    conditions.push(
      `(title ILIKE $${params.length} OR content ILIKE $${params.length})`
    );
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  params.push(limit, offset);
  const resultQuery = `SELECT * FROM articles ${whereClause} ORDER BY created_at DESC LIMIT $${
    params.length - 1
  } OFFSET $${params.length}`;

  const countQuery = `SELECT COUNT(*) FROM articles ${whereClause}`;

  try {
    const result = await pool.query(resultQuery, params);
    const countRes = await pool.query(
      countQuery,
      params.slice(0, params.length - 2)
    );
    const total = parseInt(countRes.rows[0].count, 10);

    return NextResponse.json({
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, content, author_id, images, type, video_url } = body;

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
    `INSERT INTO articles (title, slug, content, author_id, images, type, video_url, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
     RETURNING *`,
    [title, slug, content, author_id, images, type, video_url]
  );

  return NextResponse.json(result.rows[0]);
}
