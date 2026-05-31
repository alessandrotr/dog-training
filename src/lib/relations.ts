import type {TestimonialItem, BlogPost} from '../types';

// Pure, framework-agnostic selectors over the content lists. These centralise
// the per-service aggregations that were previously re-implemented in
// ServicesGrid, ServiceDetail, BlogPostTemplate, Testimonials and the routes.

/** Index any id-bearing list by id for O(1) lookup. */
export function mapById<T extends {id: string}>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

/** Count of case studies tagged to each service, keyed by service id. */
export function caseStudyCountByService(testimonials: TestimonialItem[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const t of testimonials) {
    if (t.serviceId) counts.set(t.serviceId, (counts.get(t.serviceId) ?? 0) + 1);
  }
  return counts;
}

/** Count of related guides (articles) per service id, from posts' serviceIds. */
export function guideCountByService(posts: BlogPost[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of posts) for (const id of p.serviceIds ?? []) counts.set(id, (counts.get(id) ?? 0) + 1);
  return counts;
}

/** Case studies tagged to a given service. */
export function caseStudiesForService(testimonials: TestimonialItem[], serviceId: string): TestimonialItem[] {
  return testimonials.filter((t) => t.serviceId === serviceId);
}
