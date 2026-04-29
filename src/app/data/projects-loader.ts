/**
 * Projects content loader.
 * Edit / add via /admin/ — files live at /content/projects/*.json.
 */

export type ProjectSection = { heading: string; body: string; image?: string };

export type ProjectItem = {
  id: number;
  slug: string;
  order?: number;
  title: string;
  desc: string;
  heroImage: string;
  heroVideo?: string;
  embedHtml?: string;
  gallery: string[];
  tags: string[];
  year: string;
  status: string;
  overview: string;
  sections: ProjectSection[];
  team: string[];
};

const modules = import.meta.glob("/content/projects/*.json", { eager: true }) as Record<
  string,
  { default: ProjectItem }
>;

export const projects: ProjectItem[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));

export function findProjectBySlug(slug: string | undefined): ProjectItem | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
