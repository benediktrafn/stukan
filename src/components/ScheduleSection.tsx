import { groupMatchesByDate, formatTime, DbMatch } from "@/lib/dateUtils";
import { getMatches } from "@/lib/actions";

export default async function ScheduleSection() {
    let matches: DbMatch[] = [];

    try {
        const data = await getMatches();
        matches = data as DbMatch[];
    } catch (error) {
        console.error("Error fetching matches:", error);
    }

    const groupedSchedule = groupMatchesByDate(matches);

    if (matches.length === 0) {
        return (
            <section id="schedule" className="py-16 px-4 bg-bg-main">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-2xl md:text-3xl text-brand-gold mb-8">
                        Upcoming Events
                    </h2>
                    <p className="text-text-primary/50">No matches scheduled.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="schedule" className="py-16 px-4 bg-bg-main">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-gold text-center mb-12">
                    Upcoming Events
                </h2>

                <div className="space-y-10">
                    {Object.entries(groupedSchedule).map(([dateLabel, dayMatches]) => (
                        <div key={dateLabel}>
                            {/* Date Header */}
                            <h3 className="text-lg md:text-xl font-bold text-brand-gold mb-4 tracking-wide">
                                {dateLabel}
                            </h3>

                            {/* Games List */}
                            <ul className="divide-y divide-white/10">
                                {dayMatches.map((match) => (
                                    <li
                                        key={match.id}
                                        className="flex items-center gap-4 py-4"
                                    >
                                        {/* Time */}
                                        <span className="text-brand-gold font-mono text-sm md:text-base min-w-[55px]">
                                            {formatTime(match.start_time)}
                                        </span>

                                        <span className="text-white/30">|</span>

                                        {/* Teams */}
                                        <span className="text-text-primary flex-1">
                                            {match.is_highlight && (
                                                <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded mr-2">
                                                    ★
                                                </span>
                                            )}
                                            {match.teams}
                                        </span>

                                        {/* League */}
                                        <span className="text-text-primary/50 text-sm hidden md:block">
                                            {match.league}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
