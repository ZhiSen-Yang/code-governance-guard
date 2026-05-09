# Frontend UI Rules

Use `ui-ux-pro-max` for frontend tasks when available. If it is missing, use these fallback rules.

## Product Quality

1. Build the actual usable workflow first, not a marketing placeholder.
2. Match the app domain: operational tools should be dense, calm, and scan-friendly; creative tools and games can be more expressive.
3. Use realistic data and meaningful labels instead of vague placeholders.
4. Include expected states: loading, empty, error, disabled, validation, success, and permission-limited views.
5. Keep navigation paths clear and reversible.

## Interaction

1. Use familiar controls for the job: icon buttons for tool actions, toggles for binary options, tabs for views, menus for option sets, sliders or inputs for numeric values.
2. Add tooltips for icon-only controls that are not universally obvious.
3. Keep keyboard focus visible and interactions reachable by keyboard where practical.
4. Avoid layout shift from hover states, loading labels, dynamic counters, or validation messages.
5. Do not put explanatory instruction text into the app unless the product genuinely needs it.

## Visual Design

1. Use existing design systems and tokens before adding custom styling.
2. Avoid one-note palettes dominated by a single hue family.
3. Avoid decorative orbs, blobs, and visual filler.
4. Keep cards for repeated items, modals, and framed tools; do not nest cards inside cards.
5. Use stable dimensions for boards, grids, toolbars, icon buttons, counters, and tiles.
6. Do not scale font size with viewport width.
7. Ensure text fits within buttons, cards, panels, and mobile layouts.

## Responsive And Accessibility

1. Check desktop and mobile layouts.
2. Preserve readable line lengths and tappable target sizes.
3. Use semantic HTML where possible.
4. Associate labels with form controls.
5. Use accessible names for icon buttons.
6. Maintain sufficient contrast and visible focus states.

## Verification

For substantial frontend changes, run the app and verify with browser screenshots when feasible. Check that:

1. The main view is not blank.
2. Primary workflows are reachable.
3. Assets load.
4. Text does not overlap.
5. Desktop and mobile layouts both work.
