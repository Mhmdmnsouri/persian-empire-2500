import { stationIds } from "@/journey/journey.types";

import type { LocalizedJourneyContent, StationContent } from "./content.types";
import { sourceRegistry } from "./sources";
import { terminologyGlossary } from "./glossary";

const rawUrlPattern = /https?:\/\//i;
const unresolvedTokenPattern = /\{\{[^}]+\}\}|\[(?:todo|tbd)\]/i;
const htmlPattern = /<\/?[a-z][^>]*>/i;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function validateText(value: string, label: string): string[] {
  if (!value.trim()) return [`${label} must not be empty.`];
  if (rawUrlPattern.test(value)) return [`${label} must not include a raw URL.`];
  if (unresolvedTokenPattern.test(value)) {
    return [`${label} contains an unresolved placeholder token.`];
  }
  if (htmlPattern.test(value)) return [`${label} must not include HTML.`];
  return [];
}

export function validateStationContent(station: StationContent): string[] {
  const errors = [
    ...validateText(station.navigationTitle, `${station.id}.navigationTitle`),
    ...validateText(station.title, `${station.id}.title`),
    ...validateText(station.lead, `${station.id}.lead`),
    ...validateText(station.description, `${station.id}.description`),
  ];

  if (station.labels.length > 3)
    errors.push(`${station.id}.labels must contain at most three entries.`);

  const labelIds = new Set<string>();
  for (const label of station.labels) {
    if (labelIds.has(label.id))
      errors.push(`${station.id}.labels contains duplicate id "${label.id}".`);
    labelIds.add(label.id);
    errors.push(...validateText(label.title, `${station.id}.labels.${label.id}.title`));
    errors.push(...validateText(label.value, `${station.id}.labels.${label.id}.value`));
  }

  if (station.uncertaintyNote) {
    errors.push(...validateText(station.uncertaintyNote, `${station.id}.uncertaintyNote`));
  }
  if (station.evidence !== "editorial" && station.sourceIds.length === 0) {
    errors.push(`${station.id} requires at least one source for factual content.`);
  }
  for (const sourceId of station.sourceIds) {
    if (!(sourceId in sourceRegistry))
      errors.push(`${station.id} references unknown source "${sourceId}".`);
  }
  return errors;
}

export function validateJourneyContent(content: LocalizedJourneyContent): string[] {
  const errors = [
    ...validateText(content.interface.skipLabel, "interface.skipLabel"),
    ...validateText(content.interface.fallbackStatus, "interface.fallbackStatus"),
    ...validateText(content.interface.sourceHeading, "interface.sourceHeading"),
    ...validateText(content.interface.uncertaintyHeading, "interface.uncertaintyHeading"),
    ...content.introMotion.words.flatMap((word, index) =>
      validateText(word, `introMotion.words.${index}`),
    ),
    ...validateText(content.introMotion.sentence, "introMotion.sentence"),
  ];
  for (const stationId of stationIds) {
    const station = content.stations[stationId];
    if (station.id !== stationId) errors.push(`Station "${stationId}" must declare the same id.`);
    errors.push(...validateStationContent(station));
  }
  return errors;
}

export function validateSourceRegistry(): string[] {
  const errors: string[] = [];
  for (const source of Object.values(sourceRegistry)) {
    errors.push(...validateText(source.id, "source.id"));
    errors.push(...validateText(source.title, `${source.id}.title`));
    errors.push(...validateText(source.publisher, `${source.id}.publisher`));
    if (!isoDatePattern.test(source.accessedAt)) {
      errors.push(`${source.id}.accessedAt must use the YYYY-MM-DD format.`);
    }
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:") errors.push(`${source.id}.url must use HTTPS.`);
    } catch {
      errors.push(`${source.id}.url must be a valid URL.`);
    }
  }
  return errors;
}

export function validateTerminologyGlossary(): string[] {
  const errors: string[] = [];
  for (const [termId, term] of Object.entries(terminologyGlossary)) {
    errors.push(...validateText(term.en, `${termId}.en`));
    errors.push(...validateText(term.fa, `${termId}.fa`));
  }
  return errors;
}

export function validateBilingualContent(
  english: LocalizedJourneyContent,
  persian: LocalizedJourneyContent,
): string[] {
  const errors = [
    ...validateSourceRegistry(),
    ...validateTerminologyGlossary(),
    ...validateJourneyContent(english),
    ...validateJourneyContent(persian),
  ];
  if (english.introMotion.words.length !== persian.introMotion.words.length) {
    errors.push("introMotion must preserve its word count across locales.");
  }
  for (const stationId of stationIds) {
    const englishStation = english.stations[stationId];
    const persianStation = persian.stations[stationId];
    const englishSources = new Set(englishStation.sourceIds);
    const persianSources = new Set(persianStation.sourceIds);
    if (englishStation.evidence !== persianStation.evidence) {
      errors.push(`${stationId} must preserve evidence strength across locales.`);
    }
    if (Boolean(englishStation.uncertaintyNote) !== Boolean(persianStation.uncertaintyNote)) {
      errors.push(`${stationId} must preserve its uncertainty note across locales.`);
    }
    if (
      englishSources.size !== persianSources.size ||
      [...englishSources].some((sourceId) => !persianSources.has(sourceId))
    ) {
      errors.push(`${stationId} must preserve source IDs across locales.`);
    }
    const englishLabelIds = englishStation.labels.map((label) => label.id).sort();
    const persianLabelIds = persianStation.labels.map((label) => label.id).sort();
    if (englishLabelIds.join("|") !== persianLabelIds.join("|")) {
      errors.push(`${stationId} must preserve label IDs across locales.`);
    }
  }
  return errors;
}

export function assertValidBilingualContent(
  english: LocalizedJourneyContent,
  persian: LocalizedJourneyContent,
): void {
  const errors = validateBilingualContent(english, persian);
  if (errors.length > 0) throw new Error(`Invalid journey content:\n${errors.join("\n")}`);
}
