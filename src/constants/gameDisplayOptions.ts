export type DisplayMode =
  | "bestOfYear"
  | "releasedThisMonth"
  | "releasedThisWeek"
  | "popularLastYear"
  | "allTimeTop100";

export type ActiveKey = DisplayMode | `genre-${number}` | "allGames";

export interface DisplayOptions {
  mode: DisplayMode;
  count?: number;
  year?: number;
}

export const displayModeTitleMap: Record<DisplayMode, string> = {
  bestOfYear: `Best Games of ${new Date().getFullYear()}`,
  releasedThisMonth: "New Releases This Month",
  releasedThisWeek: "New Releases This Week",
  popularLastYear: `Popular in ${new Date().getFullYear() - 1}`,
  allTimeTop100: "All-Time Top 100",
};