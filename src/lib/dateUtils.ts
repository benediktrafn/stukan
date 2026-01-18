import { isToday, isTomorrow, format, parseISO } from "date-fns";

/**
 * Returns a relative date label for the given date.
 * - "TODAY" if the date is today
 * - "TOMORROW" if the date is tomorrow
 * - Otherwise, formatted as "Saturday, 24. January"
 */
export function getRelativeDateLabel(dateInput: string | Date): string {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isToday(date)) {
        return "TODAY";
    }

    if (isTomorrow(date)) {
        return "TOMORROW";
    }

    return format(date, "EEEE, d. MMMM");
}

/**
 * Returns the time portion of a date in HH:mm format.
 */
export function formatTime(dateInput: string | Date): string {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return format(date, "HH:mm");
}

/**
 * Database match type
 */
export interface DbMatch {
    id: number;
    teams: string;
    start_time: string;
    league: string | null;
    is_highlight: boolean;
}

/**
 * Groups database matches by their relative date label.
 */
export function groupMatchesByDate(
    matches: DbMatch[]
): Record<string, DbMatch[]> {
    const groups: Record<string, DbMatch[]> = {};

    // Sort by start_time first
    const sorted = [...matches].sort(
        (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

    for (const match of sorted) {
        const label = getRelativeDateLabel(match.start_time);
        if (!groups[label]) {
            groups[label] = [];
        }
        groups[label].push(match);
    }

    return groups;
}
