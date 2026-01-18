export interface ScheduleItem {
    id: number;
    match: string;
    time: string;
    league: string;
}

export const schedule: ScheduleItem[] = [
    { id: 1, match: "Man Utd vs Liverpool", time: "20:00", league: "Premier League" },
    { id: 2, match: "Barcelona vs Real Madrid", time: "21:00", league: "La Liga" },
    { id: 3, match: "Bayern vs Dortmund", time: "18:30", league: "Bundesliga" },
    { id: 4, match: "Arsenal vs Chelsea", time: "17:00", league: "Premier League" },
    { id: 5, match: "PSG vs Marseille", time: "21:00", league: "Ligue 1" },
];
