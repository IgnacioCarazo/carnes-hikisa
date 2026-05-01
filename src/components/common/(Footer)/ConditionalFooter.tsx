"use client"; 

import { usePathname } from "next/navigation";

import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const excludedRoutes = ["/catalogo", "/contactos"];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
