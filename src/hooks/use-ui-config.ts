// hooks/use-ui-config.ts
import { usePathname } from "next/navigation";

export const useUIConfig = () => {
  const pathname = usePathname();

  const cleanPages = ["/catalogo", "/contactos"];

  return {
    showFooter: !cleanPages.includes(pathname),
  };
};
