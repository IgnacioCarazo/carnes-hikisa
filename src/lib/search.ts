/**
 * Construye una query extendida para Fuse.js
 * Convierte términos como "cerdo chorizo" en "'cerdo 'chorizo"
 * aprovechando useExtendedSearch: true para búsqueda include-match.
 */
export function buildExtendedQuery(query: string): string {
  const terms = query.trim().toLowerCase().split(" ").filter(Boolean);
  return terms.map((t) => `'${t}`).join(" ");
}
