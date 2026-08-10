import { describe, expect, it } from "vitest";

import { getFoundationContent } from "@/content/foundation-content";
import { localeDirection, supportedLocales } from "@/content/content.types";

describe("foundation content", () => {
  it("provides complete content for every supported locale", () => {
    for (const locale of supportedLocales) {
      const content = getFoundationContent(locale);

      expect(content.title).not.toHaveLength(0);
      expect(content.description).not.toHaveLength(0);
      expect(content.skipLabel).not.toHaveLength(0);
    }
  });

  it("uses the expected text direction", () => {
    expect(localeDirection("en")).toBe("ltr");
    expect(localeDirection("fa")).toBe("rtl");
  });
});
