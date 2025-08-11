import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  const body = await req.json();
  const { name, content, year, location, pic } = body;

  const result = await pool.query(
    `UPDATE activities
     SET name=$1, content=$2, year=$3, location=$4, pic=$5, updated_at=NOW()
     WHERE id=$6 RETURNING *`,
    [name, content, year, location, pic, id]
  );

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  await pool.query(`DELETE FROM activities WHERE id=$1`, [id]);
  return NextResponse.json({ message: "Deleted" });
}
