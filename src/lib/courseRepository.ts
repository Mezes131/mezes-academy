import type { Course, Lesson, Module } from "@/types";
import { fetchCourseBySlug, fetchModuleByLegacyId, searchLessons } from "./strapi/courses";
import { StaticCourseRepository } from "@/data/courses/staticCourseRepository";

export interface CourseRepository {
  getCourse(slug: string): Promise<Course | null>;
  getModule(legacyId: string): Promise<Module | null>;
  search(query: string): Promise<Lesson[]>;
}

export class StrapiCourseRepository implements CourseRepository {
  getCourse(slug: string) {
    return fetchCourseBySlug(slug);
  }
  getModule(legacyId: string) {
    return fetchModuleByLegacyId(legacyId);
  }
  search(query: string) {
    return searchLessons(query);
  }
}

export function createCourseRepository(): CourseRepository {
  const enabled = import.meta.env.VITE_STRAPI_CONTENT_ENABLED === "true";
  if (enabled) return new StrapiCourseRepository();
  return new StaticCourseRepository();
}
