# 🤖 Next.js Chatbot App

An AI-powered chatbot web application built with Next.js 14+, OpenAI Assistants API, MongoDB, Tailwind CSS, and more. This project allows users to fill out a form, chat with an AI assistant, and receive a personalized AI roadmap as a PDF via email.

---

## 🚀 Features

-  Modern Next.js App Router architecture
-  Tailwind CSS for sleek styling
-  Chatbot powered by OpenAI Assistants API
-  Form for user information (like Aryng.com style)
-  PDF generation from chat output
-  Auto-email PDF to user using Nodemailer
-  MongoDB Atlas integration

---

## 🛠 Tech Stack

- **Next.js 14+** with App Router
- **React** & **TypeScript**
- **Tailwind CSS** for styling
- **MongoDB Atlas** + Mongoose
- **OpenAI SDK**
- **Puppeteer** for PDF generation
- **Nodemailer** for emailing
- **dotenv** for environment variables

---

## 📁 Project Structure

src/
├── app/
│   ├── layout.jsx          # Root layout for the Next.js app
│   └── page.jsx            # Main page that likely renders the form/chat
│
├── components/
│   └── ui/
│       ├── button.jsx      # Reusable button component
│       ├── card.jsx        # Card component for layout/styling
│       ├── input.jsx       # Input fields used in the form
│       └── Chat.jsx        # Chat UI component
│
├── lib/
│   ├── email.js            # Handles sending emails via Nodemailer
│   ├── mongodb.js          # MongoDB connection using Mongoose
│   ├── pdf.js              # PDF generation logic (likely using Puppeteer)
│   └── utils.js            # Utility functions
│
├── models/
│   ├── Form.js             # Mongoose schema/model for user form data
│   └── ThreadModel.js      # Mongoose schema/model for chat thread state

.env                        # Environment variables
.eslintrc.json              # ESLint config
.gitignore                  # Git ignored files
components.json             # Possibly VSCode or Storybook related
jsconfig.json               # Path alias configuration for JS
next.config.mjs             # Next.js configuration
package.json                # Project metadata and dependencies
package-lock.json           # Locked dependency versions
postcss.config.mjs          # PostCSS config (used by Tailwind CSS)
tailwind.config.js          # Tailwind CSS custom config
README.md                   # Project documentation