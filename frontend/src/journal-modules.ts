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

function validModuleIds(value: unknown): JournalModuleId[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is JournalModuleId =>
    typeof item === "string" && (JOURNAL_MODULE_IDS as readonly string[]).includes(item),
  ))];
}

/**
 * The complete editor order is separate from the enabled-module list. This
 * keeps an inactive module at its previous position when it is enabled again.
 * The missing fields are intentionally reconstructed for old YAML configs.
 */
export function normalizeJournalModuleOrder(order: unknown, legacyModules?: unknown): JournalModuleId[] {
  const selected = validModuleIds(order);
  const legacy = validModuleIds(legacyModules);
  const base = selected.length ? selected : legacy;
  return [...base, ...JOURNAL_MODULE_IDS.filter((module) => !base.includes(module))];
}

export function normalizeJournalModules(value: unknown): JournalModuleId[] {
  if (!Array.isArray(value)) return [...DEFAULT_JOURNAL_MODULES];
  return validModuleIds(value);
}

export function orderedJournalModules(value: unknown, order: unknown): JournalModuleId[] {
  const enabled = new Set(normalizeJournalModules(value));
  return normalizeJournalModuleOrder(order, value).filter((module) => enabled.has(module));
}

export function sameJournalModuleOrder(left: unknown, right: unknown, leftModules?: unknown, rightModules?: unknown): boolean {
  const a = normalizeJournalModuleOrder(left, leftModules);
  const b = normalizeJournalModuleOrder(right, rightModules);
  return a.length === b.length && a.every((module, index) => module === b[index]);
}

export function sameJournalModules(left: unknown, right: unknown, leftOrder?: unknown, rightOrder?: unknown): boolean {
  const a = orderedJournalModules(left, leftOrder);
  const b = orderedJournalModules(right, rightOrder);
  return a.length === b.length && a.every((module, index) => module === b[index]);
}
