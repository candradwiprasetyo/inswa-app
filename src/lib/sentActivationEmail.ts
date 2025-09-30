import nodemailer from "nodemailer";

export async function sendActivationEmail(email: string, name: string) {
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
    subject: "Akun Membership Anda Telah Disetujui",
    html: `
      <p>Halo, <strong>${name}</strong>,</p>
      <p>Selamat! Akun keanggotaan Anda di InSWA telah disetujui oleh admin.</p>
      <p>Anda sekarang dapat login ke sistem kami dengan menggunakan email dan password yang telah Anda daftarkan.</p>
      <p>Silakan klik link berikut untuk login:</p>
      <p><a href="https://dev.inswa.or.id/login" target="_blank">Login ke InSWA</a></p>
      <p>Terima kasih dan selamat bergabung!</p>
      <p>Salam hangat,</p>
      <p>Tim InSWA</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to send activation email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
