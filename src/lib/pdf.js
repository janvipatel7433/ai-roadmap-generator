import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { marked } from "marked";
import fs from "fs";

function getLocalChromePath() {
  const winPaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];

  const macPath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  if (process.platform === "win32") {
    for (const path of winPaths) {
      if (fs.existsSync(path)) return path;
    }
  } else if (process.platform === "darwin") {
    if (fs.existsSync(macPath)) return macPath;
  }

  throw new Error("Chrome executable not found. Please install Chrome or set a custom path.");
}

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

  const isLocal = process.env.NODE_ENV !== "production";
  const executablePath = isLocal ? getLocalChromePath() : await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();
  return pdfBuffer;
}
