/**
 * Formaterar pris enligt svensk standard (1 199,00 kr)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formaterar pris med decimaler (1 199,50 kr)
 */
export function formatPriceWithDecimals(price: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Konverterar storlek till display text
 */
export function getSizeLabel(size: 'S' | 'M' | 'L'): string {
  const labels = {
    S: 'Liten',
    M: 'Medium', 
    L: 'Stor'
  };
  return labels[size];
}

/**
 * Slugify funktion för URL-generering
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Ta bort diakritiska tecken
    .replace(/[^a-z0-9\s-]/g, '') // Ta bort specialtecken
    .trim()
    .replace(/\s+/g, '-') // Ersätt mellanslag med bindestreck
    .replace(/-+/g, '-'); // Ta bort flera bindestreck i rad
}