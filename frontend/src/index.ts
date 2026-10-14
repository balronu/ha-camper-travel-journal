import "./summary-card";
import "./manager-card";
import "./card-editor";

declare global { interface Window { customCards?: Array<Record<string, unknown>> } }
const cards = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
];
window.customCards ??= [];
for (const card of cards) if (!window.customCards.some((entry) => entry.type === card.type)) window.customCards.push(card);
