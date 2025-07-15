import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function sendEmailWithPDF(to, pdfBuffer) {
  // // ✅ Try writing the PDF locally for debugging
  // try {
  //   const debugPath = path.join(process.cwd(), 'debug-ai-roadmap.pdf');
  //   fs.writeFileSync(debugPath, pdfBuffer);
  //   console.log("✅ PDF written to:", debugPath);
  // } catch (writeErr) {
  //   console.error("❌ Failed to write debug PDF:", writeErr);
  // }

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
    text: 'Please find your AI Roadmap discussion summary attached.'
    // attachments: [
    //   {
    //     filename: 'AI_Roadmap.pdf',
    //     content: pdfBuffer,
    //     contentType: 'application/pdf',
    //   },
    // ],
  });
}
