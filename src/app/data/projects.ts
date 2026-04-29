/**
 * Compatibility re-exports.
 *
 * Content was moved out of this file in two phases:
 *   - News      → /content/news/*.json (loader: ./news.ts)
 *   - Projects  → /content/projects/*.json (loader: ./projects-loader.ts)
 *   - People    → /content/people/*.json (loader: ./people.ts)
 *   - Highlights → /content/highlights/*.json (loader: ./highlights.ts)
 *
 * This file used to host the four arrays + their TypeScript types. It now only
 * re-exports them from their new homes so older imports keep working.
 */

export { projects, type ProjectItem as ProjectData } from "./projects-loader";
export { teamMembers, type Person as TeamMember } from "./people";
export { highlights as highlightDetailData, type HighlightItem as HighlightData } from "./highlights";
