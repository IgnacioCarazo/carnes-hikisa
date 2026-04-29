"use client"; // Indispensable para usar hooks

import { usePathname } from "next/navigation";

import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const excludedRoutes = ["/catalogo"];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
