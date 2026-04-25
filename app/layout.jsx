import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=sora@400,401,600,700,800&display=swap" rel="stylesheet"></link>
      </head>
      <body id="body" className="min-h-full flex flex-col m-0 p-0">
        {children}
      </body>
    </html>
  );
}
