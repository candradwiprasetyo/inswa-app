import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rule_type = searchParams.get("rule_type") || "1";

  try {
    const result = await pool.query(
      `SELECT id, publication_type_id, title, description, file, size, year,
          publisher, author, foreword, edition, isbn, pages, dimension,
          cover_url,
          TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, slug, rule_type,
          created_at, updated_at
      FROM publications
      WHERE publication_type_id = '4' AND rule_type = '${rule_type}'
       ORDER BY created_at ASC`
    );

    return NextResponse.json({
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching publication rules:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
