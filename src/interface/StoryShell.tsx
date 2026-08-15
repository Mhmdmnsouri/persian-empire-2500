import { journeyStations } from "@/journey/journey.config";
import type { LocalizedJourneyContent } from "@/content/content.types";
import { IntroTypography } from "./IntroTypography";
import { JourneyControls } from "./JourneyControls";

type StoryShellProps = Readonly<{ content: LocalizedJourneyContent }>;

export function StoryShell({ content }: StoryShellProps) {
  return (
    <main id="story" className="relative z-1">
      <JourneyControls content={content} />
      <a
        className="fixed inset-s-3 top-3 z-2 translate-y-[-200%] bg-paper px-4 py-3 text-ink focus:translate-y-0"
        href="#station-grand-stairway"
      >
        {content.interface.skipLabel}
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
            className="relative grid min-h-[120svh] items-end p-6 sm:p-12 lg:p-24"
          >
            {station.id === "intro" ? <IntroTypography content={content.introMotion} /> : null}
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
              <p className="mt-4 text-lg leading-relaxed text-paper sm:text-2xl">
                {stationContent.lead}
              </p>
              <p className="mt-6 text-base leading-relaxed sm:text-xl">
                {stationContent.description}
              </p>
              {stationContent.labels.length > 0 ? (
                <dl className="mt-6 grid gap-3 border-t border-stone-border pt-4 sm:grid-cols-2">
                  {stationContent.labels.map((label) => (
                    <div key={label.id}>
                      <dt className="text-xs uppercase tracking-[0.16em] text-stone">
                        {label.title}
                      </dt>
                      <dd className="mt-1 text-sm text-paper">{label.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {stationContent.focusLabels && stationContent.focusLabels.length > 0 ? (
                <dl className="mt-6 grid gap-3 border-t border-stone-border pt-4 sm:grid-cols-3">
                  {stationContent.focusLabels.map((label) => (
                    <div key={label.id}>
                      <dt className="text-xs uppercase tracking-[0.16em] text-stone">
                        {label.title}
                      </dt>
                      <dd className="mt-1 text-sm text-paper">{label.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {stationContent.uncertaintyNote ? (
                <aside className="mt-6 border-s-2 border-stone-border ps-4 text-sm leading-relaxed text-stone">
                  <h3 className="font-medium text-paper">{content.interface.uncertaintyHeading}</h3>
                  <p className="mt-2">{stationContent.uncertaintyNote}</p>
                </aside>
              ) : null}
            </div>
          </section>
        );
      })}
    </main>
  );
}
