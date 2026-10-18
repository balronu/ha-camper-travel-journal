import "./summary-card";
import "./manager-card";
import "./diagnostic-card";
import "./map-card";
import "./journal-card";
import "./card-editor";

declare global { interface Window { customCards?: Array<Record<string, unknown>> } }
const cards = [
  { type: "camper-travel-journal-journal-card", name: "Camper Travel Journal – Journal", description: "Zentraler Einstieg: Reise öffnen und alle Funktionen in einem Reisebereich nutzen.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
];
window.customCards ??= [];
for (const card of cards) if (!window.customCards.some((entry) => entry.type === card.type)) window.customCards.push(card);
