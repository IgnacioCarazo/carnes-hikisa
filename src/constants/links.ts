// Codificación del mensaje para la URL
const WHATSAPP_MESSAGE = encodeURIComponent(
  "¡Buenas, deseo consultar la lista de precios y cortes disponibles.",
);

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/carneshikisa/?locale=es_LA",
  instagram:
    "https://www.instagram.com/carnes_hikisa?fbclid=IwY2xjawRMHi5leHRuA2FlbQIxMABicmlkETE4ekRHaW9uaVhxNkZEWktzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhmAlIvr2sud8VijMHWk6EPOm5CQu8dHL_owwfyj45klDWGxSvKN9l5-qoyy_aem_5eMV1pYQrtSXElK-ci0kGA",
  tiktok: "https://www.tiktok.com/@carnes.hikisa",
  whatsapp: `https://wa.me/50660124222?text=${WHATSAPP_MESSAGE}`,
};
