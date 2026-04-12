"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/login", "/register"];

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      <Navbar />
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
