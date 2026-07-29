/**
 * Restrict write access to courses assigned to the instructor.
 * Assigned course ids come from admin user custom field `assignedCourseIds`.
 * Unscoped admins (no assignedCourseIds) pass through.
 */
export default async (
  policyContext: {
    state: { user?: { assignedCourseIds?: Array<string | number> } };
    request: { body?: { data?: { course?: unknown; courseId?: unknown } } };
  },
) => {
  const user = policyContext.state.user;
  if (!user) return false;

  const assigned = user.assignedCourseIds;
  if (!assigned || !Array.isArray(assigned) || assigned.length === 0) {
    return true;
  }

  const body = policyContext.request.body?.data ?? {};
  const courseId = body.course ?? body.courseId;
  if (!courseId) return true;

  return assigned.map(String).includes(String(courseId));
};
