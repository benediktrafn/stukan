import { sql } from "@vercel/postgres";
import { Trophy } from "lucide-react";
import { formatTime, getRelativeDateLabel } from "@/lib/dateUtils";

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

    const dateLabel = getRelativeDateLabel(match.start_time);

    return (
        <div className="w-full bg-[#1E1E1E]/95 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-4">
                {/* Desktop: Horizontal layout */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left: Badge */}
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-brand-gold" />
                        <span className="text-sm font-semibold tracking-widest text-brand-gold uppercase">
                            {match.is_highlight ? "FEATURED EVENT" : dateLabel}
                        </span>
                    </div>

                    {/* Center: Teams */}
                    <h2 className="font-serif text-xl lg:text-2xl font-bold text-text-primary">
                        {match.teams}
                    </h2>

                    {/* Right: Time */}
                    <span className="text-lg font-mono font-bold text-text-primary">
                        {formatTime(match.start_time)}
                    </span>
                </div>

                {/* Mobile: Stacked layout */}
                <div className="flex flex-col items-center gap-2 md:hidden">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-brand-gold" />
                        <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                            {match.is_highlight ? "FEATURED EVENT" : dateLabel}
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
