import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json({ error: "Token wajib diisi" }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT id FROM users WHERE token_forgot_password = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { valid: false, error: "Token tidak valid" },
        { status: 404 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
