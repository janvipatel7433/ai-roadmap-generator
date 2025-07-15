// src/app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "AI Roadmap Generator",
  description: "Welcome to my app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans bg-black relative min-h-screen`}>
        {/* Fluid Background Container */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_70%,rgba(0,0,0,0.8)_100%)] mix-blend-overlay"></div>

          {/* Animated Overlapping Blobs */}
          <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(rgb(57,146,137),rgba(57,146,137,0.3))] blur-[80px] mix-blend-multiply rounded-full top-[10%] left-[5%] blob-animation"></div>

          <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(rgb(119,28,63),rgba(119,28,63,0.3))] blur-[80px] mix-blend-multiply rounded-full top-[30%] left-[20%] blob-animation [animation-delay:5s]"></div>

          <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(rgb(186,44,104),rgba(186,44,104,0.3))] blur-[80px] mix-blend-multiply rounded-full top-[20%] left-[40%] blob-animation [animation-delay:2s]"></div>

          <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(rgb(0,119,182),rgba(0,119,182,0.3))] blur-[80px] mix-blend-multiply rounded-full top-[50%] left-[60%] blob-animation [animation-delay:3s]"></div>

          <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(rgb(238,66,102),rgba(238,66,102,0.3))] blur-[80px] mix-blend-multiply rounded-full top-[40%] left-[80%] blob-animation [animation-delay:1s]"></div>
        </div>

        {/* Page content */}
        {children}
      </body>


    </html>
  );
}
