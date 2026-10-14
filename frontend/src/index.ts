import "./summary-card";
import "./manager-card";

declare global { interface Window { customCards?: Array<Record<string, unknown>> } }
const cards = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal Übersicht", description: "Kompakte Reiseübersicht" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal Verwaltung", description: "Reiseverwaltung" },
];
window.customCards ??= [];
for (const card of cards) if (!window.customCards.some((entry) => entry.type === card.type)) window.customCards.push(card);
