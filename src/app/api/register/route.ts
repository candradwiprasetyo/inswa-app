import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { sendRegistrationEmail } from "@/lib/sentRegistrationEmail";

export async function POST(req: Request) {
  try {
    const { role, name, email, password, whatsapp } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR whatsapp = $2 LIMIT 1`,
      [email, whatsapp]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email atau WhatsApp sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (role, name, email, password, whatsapp, active_status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id, role, name, email, whatsapp, active_status, created_at`,
      [role ?? "member", name, email, hashedPassword, whatsapp, false]
    );

    await sendRegistrationEmail(email, name);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
