import { sql } from "@vercel/postgres";
import { Trophy } from "lucide-react";
import { formatTime } from "@/lib/dateUtils";
import { isToday, isTomorrow, format } from "date-fns";

interface Match {
    id: number;
    teams: string;
    start_time: string;
    league: string | null;
    is_highlight: boolean;
}

export default async function FeaturedMatch() {
    let match: Match | null = null;
    let label = "";
    let isGold = false;

    try {
        // Fetch next 5 upcoming matches to determine priority in JS
        const result = await sql`
            SELECT * FROM matches 
            WHERE start_time > NOW() 
            ORDER BY start_time ASC 
            LIMIT 5
        `;

        if (result.rows.length === 0) {
            return null;
        }

        const matches = result.rows as Match[];

        // 1. Look for TODAY
        const todayMatches = matches.filter(m => isToday(new Date(m.start_time)));

        if (todayMatches.length > 0) {
            // Prioritize highlighted match today, otherwise earliest today
            match = todayMatches.find(m => m.is_highlight) || todayMatches[0];
            label = "TODAY";
            isGold = true;
        } else {
            // 2. Look for TOMORROW
            const tomorrowMatches = matches.filter(m => isTomorrow(new Date(m.start_time)));

            if (tomorrowMatches.length > 0) {
                // Prioritize highlighted match tomorrow, otherwise earliest tomorrow
                match = tomorrowMatches.find(m => m.is_highlight) || tomorrowMatches[0];
                label = "TOMORROW";
                isGold = false; // Tomorrow is standard white
            } else {
                // 3. Fallback to next upcoming
                match = matches[0];
                // Format: "Fri, 24. Jan"
                label = format(new Date(match.start_time), "EEE, d. MMM");
                isGold = false;
            }
        }

    } catch (error) {
        console.error("Error fetching featured match:", error);
        return null;
    }

    if (!match) return null;

    return (
        <div className="w-full bg-[#1E1E1E]/95 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-4">
                {/* Desktop: Centered Horizontal layout */}
                <div className="hidden md:flex items-center justify-center gap-12">
                    {/* Left: Badge */}
                    <div className="flex items-center gap-2 min-w-[140px] justify-end">
                        <Trophy className={`h-4 w-4 ${isGold ? "text-brand-gold" : "text-white/70"}`} />
                        <span className={`text-sm font-semibold tracking-widest uppercase ${isGold ? "text-brand-gold" : "text-white/70"}`}>
                            {label}
                        </span>
                    </div>

                    {/* Center: Teams */}
                    <h2 className="font-serif text-xl lg:text-2xl font-bold text-text-primary text-center">
                        {match.teams}
                    </h2>

                    {/* Right: Time */}
                    <span className="text-lg font-mono font-bold text-text-primary min-w-[80px]">
                        {formatTime(match.start_time)}
                    </span>
                </div>

                {/* Mobile: Stacked layout */}
                <div className="flex flex-col items-center gap-2 md:hidden">
                    <div className="flex items-center gap-2">
                        <Trophy className={`h-4 w-4 ${isGold ? "text-brand-gold" : "text-white/70"}`} />
                        <span className={`text-xs font-semibold tracking-widest uppercase ${isGold ? "text-brand-gold" : "text-white/70"}`}>
                            {label}
                        </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-text-primary text-center">
                        {match.teams}
                    </h2>
                    <span className="text-base font-mono font-bold text-text-primary">
                        {formatTime(match.start_time)}
                    </span>
                </div>
            </div>
        </div>
    );
}
