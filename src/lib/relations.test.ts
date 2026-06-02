import {describe, it, expect} from 'vitest';
import {mapById, caseStudyCountByService, guideCountByService, caseStudiesForService} from './relations';
import type {ServiceItem, TestimonialItem, BlogPost} from '@/types';

// Minimal fixtures — the selectors only read id / serviceId / serviceIds.
const svc = (id: string) => ({id} as ServiceItem);
const story = (id: string, serviceId?: string) => ({id, serviceId} as TestimonialItem);
const post = (id: string, serviceIds: string[]) => ({id, serviceIds} as BlogPost);

describe('relations selectors', () => {
  it('mapById indexes items by id', () => {
    const m = mapById([svc('a'), svc('b')]);
    expect(m.get('a')?.id).toBe('a');
    expect(m.size).toBe(2);
  });

  it('caseStudyCountByService counts tagged stories, ignores untagged', () => {
    const m = caseStudyCountByService([story('1', 's1'), story('2', 's1'), story('3', 's2'), story('4')]);
    expect(m.get('s1')).toBe(2);
    expect(m.get('s2')).toBe(1);
    expect(m.has('')).toBe(false);
  });

  it('guideCountByService counts posts per related service', () => {
    const m = guideCountByService([post('p1', ['s1', 's2']), post('p2', ['s1']), post('p3', [])]);
    expect(m.get('s1')).toBe(2);
    expect(m.get('s2')).toBe(1);
  });

  it('caseStudiesForService returns only stories for that service', () => {
    const list = caseStudiesForService([story('1', 's1'), story('2', 's2'), story('3', 's1')], 's1');
    expect(list.map((s) => s.id)).toEqual(['1', '3']);
  });
});
