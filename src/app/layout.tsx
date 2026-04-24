import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Yeşilay Demirbaş Yönetim Sistemi",
  description: "Modern QR Kod Destekli Envanter ve Demirbaş Takip Sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="layout-root">
          {children}
        </div>
      </body>
    </html>
  );
}
