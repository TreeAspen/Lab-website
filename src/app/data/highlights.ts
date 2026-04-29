/**
 * Highlights content loader.
 * Edit / add via /admin/ — files live at /content/highlights/*.json.
 */

export type Publication = { citation: string; link?: string };

export type HighlightItem = {
  id: string;
  order?: number;
  title: string;
  label: string;
  num: string;
  tags: string[];
  summary: string;
  focus: string;
  homeVideo?: string;
  ourWorkDesc: string;
  ourWorkColor: string;
  heroImage: string;
  heroVideo?: string;
  embedHtml?: string;
  aspectRatio?: string;
  tagsDetail?: string[];
  overview: string[];
  focusPoints: string[];
  relatedProjects: string[];
  publications?: Publication[];
  conferences?: string[];
  mediaLink?: { label: string; url: string };
};

const modules = import.meta.glob("/content/highlights/*.json", { eager: true }) as Record<
  string,
  { default: HighlightItem }
>;

export const highlights: HighlightItem[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function findHighlightById(id: string | undefined): HighlightItem | undefined {
  if (!id) return undefined;
  return highlights.find((h) => h.id === id);
}
