import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await pool.query(
      `SELECT * FROM publications WHERE id = $1 LIMIT 1`,
      [id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Publikasi tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: result.rows[0] });
  }

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const excludeId = searchParams.get("excludeId");

  const whereClauses: string[] = [];
  const values: string[] = [];
  let idx = 1;

  if (type) {
    whereClauses.push(`publication_type_id = $${idx++}`);
    values.push(type);
  }

  if (search) {
    whereClauses.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${search}%`);
    idx++;
  }

  if (excludeId) {
    whereClauses.push(`id != $${idx++}`);
    values.push(excludeId);
  }

  const whereSQL =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT * FROM publications
     ${whereSQL}
     ORDER BY created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    [...values, limit, offset]
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM publications ${whereSQL}`,
    values
  );

  const total = parseInt(countResult.rows[0].count, 10);
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    data: result.rows,
    page,
    totalPages,
    total,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    publication_type_id,
    title,
    description,
    file,
    size,
    year,
    publisher,
    author,
    foreword,
    edition,
    isbn,
    pages,
    dimension,
    cover_url,
  } = body;

  const result = await pool.query(
    `INSERT INTO publications (
    publication_type_id, title, description, file, size, year,
    publisher, author, foreword, edition, isbn, pages, dimension, cover_url, created_at, updated_at
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW(),NOW())
  RETURNING *`,
    [
      publication_type_id,
      title,
      description,
      file,
      size,
      year,
      publisher,
      author,
      foreword,
      edition,
      isbn,
      pages,
      dimension,
      cover_url,
    ]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
