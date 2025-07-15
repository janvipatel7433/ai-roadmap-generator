import nodemailer from 'nodemailer';

export async function sendEmailWithPDF(to, pdfBuffer) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AI Roadmap" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your AI Roadmap Discussion Summary',
    text: 'Please find your AI Roadmap discussion summary attached.',
    attachments: [
      {
        filename: 'AI_Roadmap.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}
