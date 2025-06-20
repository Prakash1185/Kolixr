import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Optional: If you're using metadata in a JS project, remove or redefine it as plain object if needed by Next.js App Router
export const metadata = {
  title: "AI Color Palettes Generator",
  description: "An AI powered website for all your color palattes need.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Navbar />
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
