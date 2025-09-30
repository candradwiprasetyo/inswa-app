import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, token } = body;

    if (!password || !token) {
      return NextResponse.json(
        { error: "Password dan token wajib diisi" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, email FROM users WHERE token_forgot_password = $1`,
      [token]
    );

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { error: "Token tidak valid atau sudah digunakan" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await pool.query(
      `UPDATE users 
       SET password = $1, token_forgot_password = NULL, updated_at = NOW()
       WHERE id = $2`,
      [hashedPassword, user.id]
    );

    return NextResponse.json(
      { message: "Password berhasil diubah" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reset password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
