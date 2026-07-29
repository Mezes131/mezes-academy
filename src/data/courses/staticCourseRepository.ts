import type { Course, Lesson, Module } from "@/types";
import { getCourses } from "./index";
import { readStoredLocale } from "@/i18n/storage";
import type { CourseRepository } from "@/lib/courseRepository";

export class StaticCourseRepository implements CourseRepository {
  async getCourse(slug: string): Promise<Course | null> {
    const locale = readStoredLocale();
    return (
      getCourses(locale).find((c) => c.slug === slug || c.id === slug) ?? null
    );
  }

  async getModule(legacyId: string): Promise<Module | null> {
    const locale = readStoredLocale();
    for (const course of getCourses(locale)) {
      for (const phase of course.phases) {
        const mod = phase.modules.find((m) => m.id === legacyId);
        if (mod) return mod;
      }
    }
    return null;
  }

  async search(query: string): Promise<Lesson[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const locale = readStoredLocale();
    const results: Lesson[] = [];
    for (const course of getCourses(locale)) {
      for (const phase of course.phases) {
        for (const mod of phase.modules) {
          for (const block of mod.content) {
            if (block.kind !== "lessons") continue;
            for (const lesson of block.items) {
              const hay = `${lesson.title} ${lesson.desc ?? ""} ${(lesson.tags ?? []).join(" ")}`.toLowerCase();
              if (hay.includes(q)) results.push(lesson);
            }
          }
        }
      }
    }
    return results;
  }
}
