import { NextResponse } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";
import { sendForgotPasswordEmail } from "@/lib/sentForgotPasswordEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { error: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(16).toString("hex").slice(0, 21);

    const updateRes = await pool.query(
      `UPDATE users
       SET token_forgot_password = $1, updated_at = NOW()
       WHERE email = $2
       RETURNING id, email, token_forgot_password`,
      [token, email]
    );

    const sendResult = await sendForgotPasswordEmail(
      user.email,
      user.name,
      token
    );
    if (!sendResult.success) {
      return NextResponse.json(
        { error: "Gagal mengirim email reset password" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Token berhasil dibuat, silakan cek email Anda",
        token: updateRes.rows[0].token_forgot_password,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error forgot password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
