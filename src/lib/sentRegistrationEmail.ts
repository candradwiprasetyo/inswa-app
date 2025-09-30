import nodemailer from "nodemailer";

export async function sendRegistrationEmail(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"InSWA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Pendaftaran Keanggotaan InSWA",
    html: `
      <p>Halo, <strong>${name}</strong>,</p>
      <p>Terima kasih sudah mendaftar sebagai anggota InSWA. Proses pendaftaran Anda akan direview oleh admin kami.</p>
      <p>Kami akan menghubungi Anda lebih lanjut melalui WhatsApp untuk proses validasi. Keanggotaan Anda akan aktif setelah melalui tahap verifikasi dari tim kami.</p>
      <p>Salam hangat,</p>
      <p>Tim InSWA</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: "Failed to send email" };
  }
}
