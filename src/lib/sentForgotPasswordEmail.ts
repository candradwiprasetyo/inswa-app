import nodemailer from "nodemailer";

export async function sendForgotPasswordEmail(
  email: string,
  name: string,
  token: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"InSWA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password Akun InSWA",
    html: `
      <p>Halo, <strong>${name}</strong>,</p>
      <p>Kami menerima permintaan untuk reset password akun Anda.</p>
      <p>Silakan klik link berikut untuk mengatur ulang password:</p>
      <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
      <p>Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
      <br/>
      <p>Salam hangat,</p>
      <p>Tim Admin InSWA</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Forgot password email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Forgot password email sending failed:", error);
    return { success: false, error: "Failed to send forgot password email" };
  }
}
