export const formatDate = (s?: string) =>
    !s ? "" : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
        .format(new Date(s));

export const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim();

export const formatLongText = (limit: number, text: string) => text.substring(0, limit) + "...";