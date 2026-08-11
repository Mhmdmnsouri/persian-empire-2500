import { journeyStations } from "@/journey/journey.config";
import type { LocalizedJourneyContent } from "@/content/journey-content";

type StoryShellProps = Readonly<{ content: LocalizedJourneyContent }>;

export function StoryShell({ content }: StoryShellProps) {
  return (
    <main id="story" className="relative z-1">
      <a
        className="fixed inset-s-3 top-3 z-2 translate-y-[-200%] bg-paper px-4 py-3 text-ink focus:translate-y-0"
        href="#story-content"
      >
        {content.skipLabel}
      </a>
      {journeyStations.map((station) => {
        const stationContent = content.stations[station.id];
        const headingId = `station-${station.id}-title`;
        const Heading = station.id === "intro" ? "h1" : "h2";

        return (
          <section
            key={station.id}
            id={station.id === "intro" ? "story-content" : `station-${station.id}`}
            data-station={station.id}
            aria-labelledby={headingId}
            className="grid min-h-[120svh] items-end p-6 sm:p-12 lg:p-24"
          >
            <div className="max-w-2xl border border-stone-border bg-ink/78 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-stone">
                {station.index + 1} / {journeyStations.length}
              </p>
              <Heading
                id={headingId}
                className="mt-2 text-5xl leading-none sm:text-7xl lg:text-8xl"
              >
                {stationContent.title}
              </Heading>
              <p className="mt-6 text-base leading-relaxed sm:text-xl">
                {stationContent.description}
              </p>
            </div>
          </section>
        );
      })}
    </main>
  );
}
