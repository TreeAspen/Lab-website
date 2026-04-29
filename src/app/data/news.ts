/**
 * News content loader.
 * Reads every JSON file in /content/news/ at build time and exposes:
 *   - newsItems: sorted by date desc, used by News.tsx and NewsDetailPage.tsx
 *   - findNewsBySlug: resolves a URL param to a news entry (supports legacy aliases)
 *
 * To add or edit a news item, edit/create a file under /content/news/ — either by
 * hand or via the Decap CMS UI at /admin/. No code changes needed.
 */

export type NewsMedia = {
  type: "image" | "video";
  src: string;
};

export type NewsSection = {
  heading: string;
  body: string;
  images?: string[];
};

export type NewsItem = {
  id: number;
  slug: string;
  aliases?: string[];
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  sponsor?: string;
  mentors?: string;
  tags: string[];
  desc: string;
  detail: string;
  externalLink?: string;
  homeMedia?: NewsMedia;
  heroMedia?: NewsMedia;
  contentMedia?: NewsMedia;
  content: string[];
  sections?: NewsSection[];
};

const modules = import.meta.glob("/content/news/*.json", { eager: true }) as Record<
  string,
  { default: NewsItem }
>;

export const newsItems: NewsItem[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id));

export function findNewsBySlugOrId(idOrSlug: string | undefined): NewsItem | undefined {
  if (!idOrSlug) return undefined;
  const key = String(idOrSlug);
  return newsItems.find(
    (n) =>
      n.slug === key ||
      String(n.id) === key ||
      (n.aliases && n.aliases.includes(key))
  );
}
