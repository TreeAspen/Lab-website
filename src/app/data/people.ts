/**
 * People (team members) content loader.
 * Edit / add via /admin/ — files live at /content/people/*.json.
 */

export type MemberPublication = { title: string; venue: string; year: string; link?: string };

export type Person = {
  id: string;
  order?: number;
  name: string;
  role: string;
  title: string;
  category: "faculty" | "phd" | "master" | "alumni";
  avatar: string;
  bio: string;
  fullBio?: string;
  research: string[];
  email?: string;
  website?: string;
  education?: string[];
  publications?: MemberPublication[];
  projects?: string[];
};

const modules = import.meta.glob("/content/people/*.json", { eager: true }) as Record<
  string,
  { default: Person }
>;

export const teamMembers: Person[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function findPersonById(id: string | undefined): Person | undefined {
  if (!id) return undefined;
  return teamMembers.find((m) => m.id === id);
}
