import { readFile, writeFile } from "node:fs/promises";

const bundle = new URL("../../custom_components/camper_travel_journal/frontend/camper-travel-journal.js", import.meta.url);
const source = await readFile(bundle, "utf8");
// Keep the tab character represented inside generated template literals without
// leaving actual trailing whitespace that makes git's patch check fail.
const normalized = source.replace(/\t(?=\n)/g, "\\t");
if (normalized !== source) await writeFile(bundle, normalized);
