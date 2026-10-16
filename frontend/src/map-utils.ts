export function sortDrivesChronologically<T extends { started_at?: string | null; id: string }>(drives: T[]): T[] {
  return [...drives].sort((left, right) => {
    const leftTime = left.started_at ? Date.parse(left.started_at) : Number.POSITIVE_INFINITY;
    const rightTime = right.started_at ? Date.parse(right.started_at) : Number.POSITIVE_INFINITY;
    if (leftTime !== rightTime) return leftTime - rightTime;
    return left.id.localeCompare(right.id);
  });
}
