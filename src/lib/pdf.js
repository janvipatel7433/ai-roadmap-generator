import { marked } from "marked";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import os from "os";

const isServerless = !!process.env.AWS_REGION || !!process.env.NETLIFY;
const isWindows = os.platform() === "win32";

// Manually set the Chrome path for Windows (adjust if needed)
const localChromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // <-- You can check this path on your machine

export async function generatePDFBuffer(markdownContent) {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; }
          pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; }
        </style>
      </head>
      <body>
        ${marked.parse(markdownContent)}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: isServerless
      ? await chromium.executablePath()
      : isWindows
      ? localChromePath
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // Mac fallback
    headless: true,
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  });

  await browser.close();
  return pdf;
}
