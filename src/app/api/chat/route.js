// app/api/chat/route.js

import { openai } from "@ai-sdk/openai";
import { streamText, StreamingTextResponse } from "ai";
import { generatePDFBuffer } from "@/lib/pdf";
import { sendEmailWithPDF } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { messages, email } = await req.json();

    // Stream assistant response
    const result = await streamText({
      model: openai("gpt-3.5-turbo-0125"),
      messages,
    });


    const stream = result.toAIStream({
      onFinal: async (finalText) => {

        // Build Markdown chat history
        const fullChatMarkdown = messages
          .map((msg) => `**${msg.role === "user" ? "You" : "Assistant"}**: ${msg.content}`)
          .join("\n\n") + `\n\n**Assistant**: ${finalText}`;

        // PDF + Email if conditions met
        if (/roadmap/i.test(finalText) && /finalized/i.test(finalText) && email) {
          console.log("📄 Triggering PDF + Email...");
          // const pdfBuffer = await generatePDFBuffer(fullChatMarkdown);

          const pdfBuffer = '';





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







          // await sendEmailWithPDF(email, pdfBuffer);
          // console.log("✅ PDF generated and email sent");
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
