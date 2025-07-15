import nodemailer from 'nodemailer';

export async function GET() {
  // Dummy data
  const to = 'janvipatel7433@gmail.com';
  const subject = 'Test Email from Next.js (GET)';
  const text = 'This email was triggered via a GET request in your browser.';

  // Gmail transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // App password, NOT Gmail login password
    },
  });

  const mailOptions = {
    from: `"Next.js App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
