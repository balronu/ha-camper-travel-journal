import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(root, "../custom_components/camper_travel_journal/manifest.json"), "utf8"));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const bundle = resolve(root, "../custom_components/camper_travel_journal/frontend/camper-travel-journal.js");

describe("frontend release contract", () => {
  it("keeps backend, npm metadata and beta bundle aligned", () => {
    expect(manifest.version).toBe("0.1.0-beta.2");
    expect(pkg.version).toBe(manifest.version);
    expect(existsSync(bundle)).toBe(true);
  });
  it("registers both cards idempotently", () => {
    const source = readFileSync(resolve(root, "src/index.ts"), "utf8");
    expect(source).toContain("customCards.some");
    expect(readFileSync(resolve(root, "src/base-card.ts"), "utf8")).toContain("customElements.get");
    expect(source).toContain("camper-travel-journal-summary-card");
    expect(source).toContain("camper-travel-journal-manager-card");
    const init = readFileSync(resolve(root, "../custom_components/camper_travel_journal/__init__.py"), "utf8");
    expect(init).toContain("async_register_static_paths");
    expect(init).toContain("add_extra_js_url");
    expect(init).toContain("frontend_registered");
  });
  it("contains no location data and exposes the versioned resource contract", () => {
    const source = readFileSync(bundle, "utf8");
    expect(source).not.toMatch(/49\.\d+|7\.\d+/);
    const constants = readFileSync(resolve(root, "../custom_components/camper_travel_journal/const.py"), "utf8");
    expect(constants).toContain("FRONTEND_URL");
    expect(constants).toContain("?v={FRONTEND_VERSION}");
  });
});
