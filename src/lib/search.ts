import categoriesDataRaw from "@/data/categories.json";
import { Category } from "@/types/product";

const categoriesData = categoriesDataRaw as Category[];

/**
 * Normaliza el texto: minúsculas, sin tildes ni caracteres especiales.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Distancia de Levenshtein entre dos cadenas.
 */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

/**
 * Mapa de sinónimos para casos donde Levenshtein no alcanza.
 * Palabra del catálogo → posibles variantes que escribe el usuario.
 */
const SYNONYM_MAP: Record<string, string[]> = {
  alitas: ["alas"],
};

/**
 * Verifica si `word` (palabra del catálogo) es similar a `term` (término buscado).
 */
function isWordSimilar(word: string, term: string): boolean {
  // Sinónimos directos
  if (SYNONYM_MAP[word] && SYNONYM_MAP[word].includes(term)) return true;
  if (SYNONYM_MAP[term] && SYNONYM_MAP[term].includes(word)) return true;

  if (word === term) return true;

  // Substring solo si ambos tienen al menos 3 caracteres
  if (word.length >= 3 && term.length >= 3) {
    if (word.includes(term) || term.includes(word)) return true;
  }

  // Prefijo común largo (para palabras derivadas como alitas→alas, pechuga→pechga)
  const minLen = Math.min(word.length, term.length);
  if (minLen >= 4) {
    let prefixLen = 0;
    for (let i = 0; i < minLen; i++) {
      if (word[i] === term[i]) prefixLen++;
      else break;
    }
    if (prefixLen >= 4 && prefixLen / minLen >= 0.7) return true;
  }

  // Levenshtein solo si comparten los primeros 2 caracteres (evita falsos positivos)
  if (word.length < 2 || term.length < 2) return false;
  if (word[0] !== term[0] || word[1] !== term[1]) return false;

  const maxLen = Math.max(word.length, term.length);
  const dist = levenshtein(word, term);
  const ratio = dist / maxLen;

  // Umbral adaptativo según longitud
  if (maxLen <= 4) return dist <= 1;
  if (maxLen <= 6) return dist <= 2 && ratio <= 0.28;
  if (maxLen <= 8) return dist <= 2 && ratio <= 0.25;
  return dist <= 2 && ratio <= 0.22;
}

/**
 * Evalúa si un término de búsqueda coincide con un texto (nombre + descripción).
 */
function matchesTerm(text: string, term: string): boolean {
  // Coincidencia exacta de substring (prioridad máxima)
  if (text.includes(term)) return true;

  // Coincidencia aproximada palabra por palabra
  const textWords = text.split(/\s+/);
  for (const word of textWords) {
    if (isWordSimilar(word, term)) return true;
  }

  return false;
}

/**
 * Busca productos que coincidan con todos los términos de la consulta.
 * Devuelve los productos directamente.
 *
 * @param query - Texto de búsqueda ingresado por el usuario
 * @param limit - Cantidad máxima de resultados (opcional, sin límite si se omite)
 */
export function searchProducts(
  query: string,
  limit?: number,
): (Category["products"][number] & {
  categoryId: string;
  categoryName: string;
})[] {
  if (!query || query.trim() === "") return [];

  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  if (terms.length === 0) return [];

  const allProducts = categoriesData.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      image: p.image,
      categoryId: cat.id,
      categoryName: cat.name,
    })),
  );

  // 1. Identificar categorías que coinciden con TODOS los términos de búsqueda
  const matchingCategoryIds = new Set<string>();
  for (const cat of categoriesData) {
    const catNameNorm = normalize(cat.name);
    if (terms.every((term) => matchesTerm(catNameNorm, term))) {
      matchingCategoryIds.add(cat.id);
    }
  }

  // 2. Productos que coinciden por nombre O pertenecen a una categoría coincidente
  //    Nota: si la categoría coincide, incluimos TODOS sus productos (sin filtrar por nombre)
  const results = allProducts.filter((product) => {
    // Si su categoría matchea todos los términos, incluir automáticamente
    if (matchingCategoryIds.has(product.categoryId)) return true;

    // Si no, buscar coincidencia en el nombre del producto
    const name = normalize(product.name);
    return terms.every((term) => matchesTerm(name, term));
  });

  return limit ? results.slice(0, limit) : results;
}
