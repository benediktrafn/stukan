import { sql } from "@vercel/postgres";
import { Trophy } from "lucide-react";
import { formatTime, getRelativeDateLabel } from "@/lib/dateUtils";
import { isToday } from "date-fns";

interface Match {
    id: number;
    teams: string;
    start_time: string;
    league: string | null;
    is_highlight: boolean;
}

export default async function FeaturedMatch() {
    // Try to get a highlighted match, otherwise get the next upcoming match
    let match: Match | null = null;

    try {
        // First try to get a highlighted match
        const highlightResult = await sql`
      SELECT * FROM matches 
      WHERE is_highlight = true AND start_time > NOW() 
      ORDER BY start_time ASC 
      LIMIT 1
    `;

        if (highlightResult.rows.length > 0) {
            match = highlightResult.rows[0] as Match;
        } else {
            // Fallback to next upcoming match
            const nextResult = await sql`
        SELECT * FROM matches 
        WHERE start_time > NOW() 
        ORDER BY start_time ASC 
        LIMIT 1
      `;
            if (nextResult.rows.length > 0) {
                match = nextResult.rows[0] as Match;
            }
        }
    } catch (error) {
        console.error("Error fetching featured match:", error);
        return null;
    }

    if (!match) {
        return null;
    }

    const matchDate = new Date(match.start_time);
    const isMatchToday = isToday(matchDate);

    // Label Logic
    const label = match.is_highlight
        ? "FEATURED EVENT"
        : (isMatchToday ? "TODAY" : "UPCOMING");

    // Color Logic (Gold if Today or Highlight)
    const isGold = match.is_highlight || isMatchToday;

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
