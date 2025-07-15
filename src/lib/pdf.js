import { marked } from "marked";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import os from "os";

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

  const isServerless = !!process.env.AWS_LAMBDA_FUNCTION_VERSION || !!process.env.NETLIFY;
  const isWindows = os.platform() === "win32";

  const executablePath = isServerless
    ? await chromium.executablePath() // ✅ Only called at runtime
    : isWindows
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
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
