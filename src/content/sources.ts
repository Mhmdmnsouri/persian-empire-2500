import type { HistoricalSource } from "./content.types";

export const sourceRegistry = {
  "UNESCO-PERSEPOLIS": {
    id: "UNESCO-PERSEPOLIS",
    title: "Persepolis",
    publisher: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/pg.cfm?cid=31&id_site=114",
    type: "institution",
    accessedAt: "2026-08-12",
  },
  "ISAC-GATE-XERXES": {
    id: "ISAC-GATE-XERXES",
    title: "The Gate of Xerxes",
    publisher: "Institute for the Study of Ancient Cultures, University of Chicago",
    url: "https://isac.uchicago.edu/collections/photographic-archives/persepolis/gate-xerxes",
    type: "institution",
    accessedAt: "2026-08-12",
  },
  "MET-BULL-CAPITAL": {
    id: "MET-BULL-CAPITAL",
    title: "Bull's head from column capital",
    publisher: "The Metropolitan Museum of Art",
    url: "https://www.metmuseum.org/art/collection/search/324025",
    type: "museum",
    accessedAt: "2026-08-12",
  },
  "ISAC-ANCIENT-IRAN-MUSEUM": {
    id: "ISAC-ANCIENT-IRAN-MUSEUM",
    title: "Ancient Iran in the ISAC Museum",
    publisher: "Institute for the Study of Ancient Cultures, University of Chicago",
    url: "https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Publications/ISACMP/isacmp3.pdf",
    type: "museum",
    accessedAt: "2026-08-12",
  },
} as const satisfies Record<string, HistoricalSource>;

export type SourceId = keyof typeof sourceRegistry;
