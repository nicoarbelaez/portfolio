/** Tabs of the projects section (client vs personal). Order = display order. */
export const PROJECT_TABS = ['client', 'side'] as const;

export type ProjectTabId = (typeof PROJECT_TABS)[number];

/**
 * Deep link: `/?tab=side#projects` (or `/es/?tab=side#projects`) opens that tab.
 * Without the param (or with an unknown/empty tab) the first available tab is used.
 */
export const PROJECT_TAB_QUERY_PARAM = 'tab';

/**
 * Elements where a swipe must NOT move the tabs carousel (text/range selection and similar).
 * Links and buttons are intentionally NOT listed: project cards are fully clickable, so users
 * must be able to start a swipe on them; Embla suppresses the click that follows a drag.
 * Mark any custom control with `data-no-swipe` to opt out.
 */
export const PROJECT_SWIPE_IGNORE_SELECTOR = 'input, select, textarea, [data-no-swipe]';

/** Space between tab panes while dragging (Tailwind `gap-8` = 2rem, same as section rhythm). */
export const PROJECT_TAB_PANE_GAP_CLASS = 'gap-8';
