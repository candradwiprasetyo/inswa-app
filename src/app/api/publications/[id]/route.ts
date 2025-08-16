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

  const result = await pool.query(
    "SELECT * FROM publications WHERE id = $1 LIMIT 1",
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

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
    `UPDATE publications SET
    publication_type_id=$1, title=$2, description=$3, file=$4, size=$5, year=$6,
    publisher=$7, author=$8, foreword=$9, edition=$10, isbn=$11, pages=$12, dimension=$13, cover_url=$14,
    updated_at=NOW()
    WHERE id=$15 RETURNING *`,
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
      id,
    ]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await pool.query("DELETE FROM publications WHERE id=$1", [id]);
  return NextResponse.json({ message: "Deleted" });
}
