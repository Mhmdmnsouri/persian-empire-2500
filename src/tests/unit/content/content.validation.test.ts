import { describe, expect, it } from "vitest";

import {
  validateBilingualContent,
  validateSourceRegistry,
  validateStationContent,
  validateTerminologyGlossary,
} from "@/content/content.validation";
import { englishJourneyContent } from "@/content/en";
import { persianJourneyContent } from "@/content/fa";
import { sourceRegistry } from "@/content/sources";

describe("journey content validation", () => {
  it("keeps the English and Persian journey content in parity", () => {
    expect(validateBilingualContent(englishJourneyContent, persianJourneyContent)).toEqual([]);
  });

  it("resolves every factual station source from the registry", () => {
    for (const content of [englishJourneyContent, persianJourneyContent]) {
      for (const station of Object.values(content.stations)) {
        for (const sourceId of station.sourceIds) expect(sourceRegistry).toHaveProperty(sourceId);
      }
    }
  });

  it("validates the source registry and bilingual terminology glossary", () => {
    expect(validateSourceRegistry()).toEqual([]);
    expect(validateTerminologyGlossary()).toEqual([]);
  });

  it("rejects factual content without a source", () => {
    const station = { ...englishJourneyContent.stations.lamassu, sourceIds: [] };
    expect(validateStationContent(station)).toContain(
      "lamassu requires at least one source for factual content.",
    );
  });

  it("rejects more than three labels", () => {
    const station = {
      ...englishJourneyContent.stations.lamassu,
      labels: [
        ...englishJourneyContent.stations.lamassu.labels,
        { id: "one", title: "One", value: "One" },
        { id: "two", title: "Two", value: "Two" },
      ],
    };
    expect(validateStationContent(station)).toContain(
      "lamassu.labels must contain at most three entries.",
    );
  });
});
