import type { Course, Lesson, Module } from "@/types";
import { courses } from "./index";
import type { CourseRepository } from "@/lib/courseRepository";

export class StaticCourseRepository implements CourseRepository {
  async getCourse(slug: string): Promise<Course | null> {
    return courses.find((c) => c.slug === slug || c.id === slug) ?? null;
  }

  async getModule(legacyId: string): Promise<Module | null> {
    for (const course of courses) {
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
    const results: Lesson[] = [];
    for (const course of courses) {
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
