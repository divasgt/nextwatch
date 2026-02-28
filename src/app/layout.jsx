import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBg from "@/components/PageBg";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "NextWatch",
  description: "One Stop website for cinema enthusiasts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-white`}>
        <Header />

        <PageBg />
        <div className="shrink-0 pt-15 min-h-screen flex-1 flex flex-col">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
