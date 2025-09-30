import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT id, role, name, email, whatsapp, active_status, created_at, updated_at, activate_email_status 
       FROM users 
       ORDER BY created_at ASC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countRes = await pool.query("SELECT COUNT(*) FROM users");
    const total = parseInt(countRes.rows[0].count, 10);

    return NextResponse.json({
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, whatsapp, active_status, role } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Nama, email, dan password wajib diisi" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (role, name, email, password, whatsapp, active_status, created_at, updated_at, activate_email_status)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), false)
       RETURNING id, name, email, whatsapp, active_status, role`,
      [role || "member", name, email, hashedPassword, whatsapp, active_status]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
