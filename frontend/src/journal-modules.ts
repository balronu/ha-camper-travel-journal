/** Internal module registry for the central Journal Card.
 *
 * The registry is frontend-only in beta 1.  It deliberately does not create
 * provider requests or persist module data; future modules can be enabled in
 * the editor without changing the current journal data contract.
 */
export const JOURNAL_MODULE_IDS = [
  "overview",
  "drives",
  "stays",
  "expenses",
  "map",
  "gpx",
  "pdf",
  "tankbook",
] as const;

export type JournalModuleId = typeof JOURNAL_MODULE_IDS[number];

export const DEFAULT_JOURNAL_MODULES: readonly JournalModuleId[] = [
  "overview",
  "drives",
  "stays",
  "expenses",
  "map",
  "gpx",
  "pdf",
];

export function normalizeJournalModules(value: unknown): JournalModuleId[] {
  if (!Array.isArray(value)) return [...DEFAULT_JOURNAL_MODULES];
  const selected = value.filter((item): item is JournalModuleId =>
    typeof item === "string" && (JOURNAL_MODULE_IDS as readonly string[]).includes(item),
  );
  return [...new Set(selected)];
}

export function sameJournalModules(left: unknown, right: unknown): boolean {
  const a = normalizeJournalModules(left);
  const b = normalizeJournalModules(right);
  return a.length === b.length && a.every((module, index) => module === b[index]);
}
