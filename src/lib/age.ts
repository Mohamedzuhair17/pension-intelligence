/** Age in full years from ISO date string (YYYY-MM-DD). */
export function calculateAgeFromDob(dobIso: string): number {
  const d = new Date(dobIso + (dobIso.length === 10 ? 'T12:00:00' : ''));
  if (Number.isNaN(d.getTime())) return 0;
  const t = new Date();
  let age = t.getFullYear() - d.getFullYear();
  const md = t.getMonth() - d.getMonth();
  if (md < 0 || (md === 0 && t.getDate() < d.getDate())) age -= 1;
  return Math.max(0, age);
}
