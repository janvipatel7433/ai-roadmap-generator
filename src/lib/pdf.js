import puppeteer from "puppeteer";
import { marked } from "marked";

export async function generatePDFBuffer(markdownContent) {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; font-size: 14px; }
          strong { color: #333; }
          pre { background: #f4f4f4; padding: 1rem; border-radius: 6px; overflow-x: auto; }
        </style>
      </head>
      <body>
        ${marked.parse(markdownContent)}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true, margin: {
    top: '20px',
    bottom: '20px',
    left: '20px',
    right: '20px',
  } });

  await browser.close();
  return pdfBuffer;
}
