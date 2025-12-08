import { NextResponse } from "next/server";
import pool from "@/lib/db";

function getTokenFromRequest(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

export async function GET(req: Request) {
  try {
    const token = getTokenFromRequest(req);

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
