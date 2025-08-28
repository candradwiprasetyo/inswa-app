import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { sendActivationEmail } from "@/lib/sentActivationEmail";

function getIdFromRequest(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

export async function PATCH(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { type } = await req.json();

  if (type === "activate") {
    try {
      const result = await pool.query(
        `SELECT id, name, email, active_status, activate_email_status FROM users WHERE id = $1`,
        [id]
      );

      const member = result.rows[0];
      if (!member) {
        return NextResponse.json(
          { error: "Member not found" },
          { status: 404 }
        );
      }

      if (member.activate_email_status) {
        return NextResponse.json(
          { message: "Member already activated" },
          { status: 200 }
        );
      }

      const updateRes = await pool.query(
        `UPDATE users
         SET active_status = TRUE, activate_email_status = TRUE, updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      await sendActivationEmail(member.email, member.name);

      return NextResponse.json(updateRes.rows[0], { status: 200 });
    } catch (error) {
      console.error("Error activating member:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  const body = await req.json();
  const { name, email, whatsapp, active_status, role, password } = body;

  let query = `UPDATE users SET name = $1, email = $2, whatsapp = $3, active_status = $4, role = $5, updated_at = NOW()`;
  let params = [name, email, whatsapp, active_status, role || "member", id];

  if (password) {
    const hashedPassword = await hashPassword(password);
    query += `, password = $6`;
    params.splice(5, 0, hashedPassword);
  }

  query += ` WHERE id = $${params.length} RETURNING *`;

  try {
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const id = getIdFromRequest(req);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return NextResponse.json({ message: "Member deleted" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
