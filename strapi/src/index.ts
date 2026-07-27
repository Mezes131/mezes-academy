import type { Core } from '@strapi/strapi';

const PUBLIC_READ = [
  'api::course.course',
  'api::phase.phase',
  'api::module.module',
  'api::lesson.lesson',
  'api::exercise.exercise',
  'api::quiz.quiz',
  'api::quiz-question.quiz-question',
  'api::quiz-answer.quiz-answer',
  'api::resource.resource',
  'api::checklist.checklist',
  'api::checklist-item.checklist-item',
  'api::project-brief.project-brief',
  'api::learning-stage.learning-stage',
  'api::rubric.rubric',
] as const;

async function enablePublicFind(strapi: Core.Strapi) {
  const roleService = strapi.plugin('users-permissions').service('role');
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (!publicRole) return;

  const permissions = publicRole.permissions ?? [];
  for (const uid of PUBLIC_READ) {
    for (const action of ['find', 'findOne'] as const) {
      const actionId = `${uid}.${action}`;
      const exists = permissions.some(
        (p: { action?: string }) => p.action === actionId,
      );
      if (!exists) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: actionId,
            role: publicRole.id,
          },
        });
      }
    }
  }

  // Refresh role cache so new permissions apply without restart loops.
  await roleService.updateRole(publicRole.id, {});
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await enablePublicFind(strapi);
    } catch (err) {
      // ponytail: first boot before users-permissions tables exist — ignore once
      strapi.log.warn(`Public read bootstrap skipped: ${String(err)}`);
    }
  },
};
