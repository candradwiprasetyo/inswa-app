import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"InSWA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Pendaftaran Keanggotaan InSWA",
      text: `Halo, terima kasih sudah mendaftar. 
Proses pendaftaran Anda akan direview oleh admin kami. 
Kami akan menghubungi Anda lebih lanjut.`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
