import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  const body = await req.json();
  const { title, slug, content, author_id, images, type, video_url } = body;

  const result = await pool.query(
    `UPDATE articles 
     SET title = $1, 
         slug = $2, 
         content = $3, 
         author_id = $4, 
         images = $5, 
         type = $6, 
         video_url = $7,
         updated_at = NOW()
     WHERE id = $8 
     RETURNING *`,
    [title, slug, content, author_id, images, type, video_url, id]
  );

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  await pool.query("DELETE FROM articles WHERE id = $1", [id]);

  return NextResponse.json({ message: "Deleted" });
}
