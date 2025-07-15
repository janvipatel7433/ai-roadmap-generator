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
          await sendEmailWithPDF(email, pdfBuffer);
          console.log("✅ PDF generated and email sent");
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
