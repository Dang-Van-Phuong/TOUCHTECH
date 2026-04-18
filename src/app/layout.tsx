import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

import ThanhThongBao from "@/components/ThanhThongBao";
import ThanhDieuHuong from "@/components/ThanhDieuHuong";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata: Metadata = {
  title: "TouchTech",
  description: "TouchTech landing page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <BootstrapClient />
        <ThanhThongBao />
        <ThanhDieuHuong />
        {children}
      </body>
    </html>
  );
}
