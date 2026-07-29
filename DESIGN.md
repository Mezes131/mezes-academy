# Design Context

## Direction

React Learn uses a restrained technical learning interface: documentation
clarity, code-editor cues, and a warm accent for actions and progress.

The interface should feel like a well-designed developer tool, not a
marketing site or a toy classroom.

## Theme

Support light and dark themes. Dark mode is the preferred learning environment
for code-heavy views, while long-form reading must remain comfortable in both
themes. Color tokens are defined under Color below; do not introduce
per-component raw colors when a semantic token exists.

## Typography

- Body: IBM Plex Sans (loaded), with system-ui fallback.
- Code and technical labels: JetBrains Mono.
- Body text: 16px base, lesson prose ~17px with 65–75ch measure (`.prose-lesson`).
- Fixed rem scale (~1.125). Hierarchy via weight and size, not color alone.
- No gradient text. Em dashes (—) are banned in copy; use commas, colons, or parentheses.

## Color

Restrained strategy: indigo-tinted neutrals + one accent for actions, selection, and progress.

Semantic tokens (never raw hex in components when a token exists):

- `--bg`, `--bg2`, `--bg3`, `--bg4`
- `--fg`, `--fg2`, `--fg3`
- `--accent`, `--accent2`, `--accent3`
- `--border`, `--border-strong`

`fg2` is tuned for long-form reading contrast. Accent stays within ~10% of the surface.

## Layout

- Use an 8px spacing rhythm.
- Keep lesson content readable and separate from navigation chrome.
- Use a persistent course navigation on desktop and a compact, accessible
  alternative on small screens.
- Avoid nesting cards inside cards. Use sections, dividers, and surface changes
  to group content.
- Preserve space for fixed navigation and respect mobile viewport height.

## Components

- Use Lucide or another single SVG icon family.
- Keep interactive targets at least 44px.
- Every icon-only action needs an accessible label.
- Use visible focus states and preserve keyboard navigation.
- Buttons have one clear primary action per view.
- Loading, empty, error, success, and disabled states are explicit.

## Motion

- Use short 150–300ms transitions for state changes.
- Animate opacity and transforms only.
- Respect `prefers-reduced-motion`.
- Motion should clarify navigation or feedback, never decorate a lesson.

## Content Surfaces

- Lesson pages prioritize explanation, example, practice, and next step.
- Code exercises reserve stable space for the editor and output.
- Progress is shown near the learner's current context, not only in a separate
  dashboard.
- Search and bookmarks should remain easy to reach from the course area.

## Accessibility

- Maintain WCAG AA contrast.
- Do not use color as the only state indicator.
- Keep heading order sequential.
- Associate visible labels with form fields.
- Move focus to meaningful content after route changes where appropriate.
- Test at 375px, 768px, 1024px, and 1440px.
