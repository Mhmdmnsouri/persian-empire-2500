import type { LocalizedJourneyContent } from "./content.types";

export const englishJourneyContent = {
  interface: {
    skipLabel: "Skip to story",
    fallbackStatus: "The decorative WebGL scene is unavailable. The story remains available below.",
    sourceHeading: "Sources",
    uncertaintyHeading: "About this reconstruction",
  },
  stations: {
    intro: {
      id: "intro",
      navigationTitle: "Introduction",
      title: "Persian Empire 2500",
      lead: "Stone can carry memory across centuries.",
      description:
        "This is a curated, scroll-driven introduction to selected forms from Persepolis. Historical statements in the journey are linked to listed sources.",
      labels: [],
      evidence: "editorial",
      sourceIds: [],
    },
    "grand-stairway": {
      id: "grand-stairway",
      navigationTitle: "Grand Stairway",
      title: "The Grand Stairway",
      lead: "A ceremonial approach in stone.",
      description:
        "Persepolis includes monumental stairways and sculpted friezes within a large architectural ensemble.",
      labels: [
        { id: "context", title: "Site context", value: "Persepolis terrace" },
        { id: "evidence", title: "Visible evidence", value: "Stairways and sculpted friezes" },
      ],
      uncertaintyNote:
        "This GLB is a placeholder and does not reproduce the surviving stairway or relief sequence.",
      evidence: "confirmed",
      sourceIds: ["UNESCO-PERSEPOLIS"],
    },
    lamassu: {
      id: "lamassu",
      navigationTitle: "Guardian figures",
      title: "Guardian figures",
      lead: "A threshold framed by protective imagery.",
      description:
        "At the Gate of Xerxes, guardian bulls and Assyrian-style man-bulls stood at the entrances.",
      labels: [
        { id: "context", title: "Architectural context", value: "Gate of Xerxes" },
        { id: "evidence", title: "Sculptural form", value: "Guardian bull and man-bull figures" },
      ],
      uncertaintyNote:
        "The current GLB is a placeholder, not a verified reconstruction of a Persepolis guardian figure.",
      evidence: "confirmed",
      sourceIds: ["ISAC-GATE-XERXES"],
    },
    "bull-capital": {
      id: "bull-capital",
      navigationTitle: "Bull Capital",
      title: "Bull Capital",
      lead: "Sculpture shaped to carry structure.",
      description:
        "At Persepolis, some stone capitals used paired foreparts of bulls to support wooden roof beams.",
      labels: [
        { id: "function", title: "Function", value: "Roof-beam support" },
        { id: "form", title: "Form", value: "Paired bull protomes" },
      ],
      uncertaintyNote:
        "This digital assembly is a simplified placeholder rather than a measured architectural reconstruction.",
      evidence: "confirmed",
      sourceIds: ["MET-BULL-CAPITAL", "ISAC-ANCIENT-IRAN-MUSEUM"],
    },
    outro: {
      id: "outro",
      navigationTitle: "Conclusion",
      title: "Memory in Stone",
      lead: "What remains invites careful looking.",
      description:
        "This foundation preserves room for sourced historical content, explicit uncertainty, and future reviewed reconstructions.",
      labels: [],
      evidence: "editorial",
      sourceIds: [],
    },
  },
} as const satisfies LocalizedJourneyContent;
