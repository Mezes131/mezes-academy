import { strapiFetch } from "./client";
import { mapCourse, mapModule } from "./mapper";
import type { StrapiCourseAttrs, StrapiListResponse, StrapiModuleAttrs } from "./types";
import type { Course, Lesson, Module } from "@/types";
import { readStoredLocale } from "@/i18n/storage";

const COURSE_POPULATE =
  "populate[phases][populate][modules][populate][0]=quiz" +
  "&populate[phases][populate][modules][populate][1]=exercises" +
  "&populate[phases][populate][modules][populate][lessons][populate][0]=quiz" +
  "&populate[phases][populate][modules][populate][lessons][populate][1]=exercises" +
  "&populate[phases][populate][modules][populate][quiz][populate][questions][populate]=answers";

function localeQuery(): string {
  return `locale=${encodeURIComponent(readStoredLocale())}`;
}

export async function fetchCourseBySlug(slug: string): Promise<Course | null> {
  const res = await strapiFetch<StrapiListResponse<StrapiCourseAttrs>>(
    `/api/courses?filters[slug][$eq]=${encodeURIComponent(slug)}&${COURSE_POPULATE}&${localeQuery()}`,
  );
  const first = res.data?.[0];
  if (!first) return null;
  return mapCourse(first as unknown as StrapiCourseAttrs);
}

export async function fetchModuleByLegacyId(legacyId: string): Promise<Module | null> {
  const res = await strapiFetch<StrapiListResponse<StrapiModuleAttrs>>(
    `/api/modules?filters[legacyId][$eq]=${encodeURIComponent(legacyId)}` +
      `&populate[quiz][populate][questions][populate]=answers` +
      `&populate[exercises]=true` +
      `&populate[lessons][populate][0]=quiz&populate[lessons][populate][1]=exercises` +
      `&${localeQuery()}`,
  );
  const first = res.data?.[0];
  if (!first) return null;
  return mapModule(first as unknown as StrapiModuleAttrs);
}

export async function searchLessons(query: string): Promise<Lesson[]> {
  const q = query.trim();
  if (!q) return [];
  const res = await strapiFetch<StrapiListResponse<{ legacyId: string; title: string; desc?: string; tags?: string[] }>>(
    `/api/lessons?filters[$or][0][title][$containsi]=${encodeURIComponent(q)}` +
      `&filters[$or][1][desc][$containsi]=${encodeURIComponent(q)}` +
      `&pagination[pageSize]=20&${localeQuery()}`,
  );
  return (res.data ?? []).map((raw) => {
    const lesson = raw as { legacyId?: string; title?: string; desc?: string; tags?: string[]; attributes?: { legacyId: string; title: string; desc?: string; tags?: string[] } };
    const attrs = lesson.attributes ?? lesson;
    return {
      id: attrs.legacyId ?? "",
      title: attrs.title ?? "",
      desc: attrs.desc ?? "",
      tags: attrs.tags,
    };
  });
}
