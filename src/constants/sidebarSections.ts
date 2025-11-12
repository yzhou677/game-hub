import { BarChart2, Crown, Flame, Star, Trophy } from "lucide-react";

export const lastYear = new Date().getFullYear() - 1;

export const createSections = (actions: any) => [
    {
        title: "New Releases",
        items: [
            { key: "releasedThisMonth", label: "This Month", icon: Star, onClick: actions.thisMonth },
            { key: "releasedThisWeek", label: "This Week", icon: Flame, onClick: actions.thisWeek },
        ],
    },
    {
        title: "Top",
        items: [
            { key: "bestOfYear", label: "Best of the year", icon: Trophy, onClick: actions.bestOfYear },
            { key: "popularLastYear", label: `Popular in ${lastYear}`, icon: BarChart2, onClick: actions.popularLastYear },
            { key: "allTimeTop100", label: "All time top 100", icon: Crown, onClick: actions.allTimeTop100 },
        ],
    },
];