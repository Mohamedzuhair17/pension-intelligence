/** Indian locale currency (₹ with lakh/crore-style grouping). */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Full INR with Indian digit grouping, e.g. ₹1,00,000
 */
export function formatINR(amount: number): string {
  if (!Number.isFinite(amount)) return '₹0';
  return inrFormatter.format(Math.round(amount));
}

/**
 * Short form for large numbers in UI (Cr / L style via compact notation).
 */
export function formatINRCompact(amount: number): string {
  if (!Number.isFinite(amount)) return '₹0';
  if (Math.abs(amount) >= 1e7) return `₹${(amount / 1e7).toFixed(2)} Cr`;
  if (Math.abs(amount) >= 1e5) return `₹${(amount / 1e5).toFixed(2)} L`;
  return formatINR(amount);
}

/**
 * Raw number with Indian grouping (no symbol), for tables.
 */
export function formatINRNumber(amount: number): string {
  if (!Number.isFinite(amount)) return '0';
  return Math.round(amount).toLocaleString('en-IN');
}
