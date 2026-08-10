import type { FoundationContent } from "@/content/content.types";

type StoryShellProps = Readonly<{ content: FoundationContent }>;

export function StoryShell({ content }: StoryShellProps) {
  return (
    <main id="story" className="relative z-1 grid min-h-svh items-end p-6 sm:p-12 lg:p-24">
      <a
        className="fixed inset-s-3 top-3 z-2 translate-y-[-200%] bg-paper px-4 py-3 text-ink focus:translate-y-0"
        href="#story-content"
      >
        {content.skipLabel}
      </a>
      <section
        id="story-content"
        className="max-w-2xl border border-stone-border bg-ink/78 p-6"
        aria-labelledby="journey-title"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-stone">Foundation</p>
        <h1 id="journey-title" className="mt-2 text-5xl leading-none sm:text-7xl lg:text-8xl">
          {content.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed sm:text-xl">{content.description}</p>
        <p className="sr-only">{content.fallbackLabel}</p>
      </section>
    </main>
  );
}
