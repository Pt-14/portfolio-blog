import type { Metadata } from "next";
import { Bai_Jamjuree, Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Truong Yen Phuong | Portfolio",
  description: "Portfolio và Blog cá nhân về Frontend Development và UI/UX Design. Chia sẻ kiến thức về Java, JavaScript và Design.",
  keywords: ["Frontend Developer", "UI/UX Designer", "React", "Next.js", "JavaScript", "Java", "Portfolio"],
  authors: [{ name: "Fang" }],
  openGraph: {
    title: "Truong Yen Phuong | Portfolio",
    description: "Portfolio và Blog cá nhân về Frontend Development và UI/UX Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${baiJamjuree.variable} ${inter.variable} font-sans antialiased bg-[#f0f2f5]`}>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
