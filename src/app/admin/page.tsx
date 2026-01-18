"use client";

import { useRef, useEffect, useState } from "react";
import { addMatch, deleteMatch, getMatches, updateMatch } from "@/lib/actions";

interface Match {
    id: number;
    teams: string;
    start_time: string;
    league: string | null;
    is_highlight: boolean;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [matches, setMatches] = useState<Match[]>([]);
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Check URL for password
        const params = new URLSearchParams(window.location.search);
        const pass = params.get("pass");
        if (pass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || pass === "stukan2026") {
            setIsAuthenticated(true);
            loadMatches();
        }
    }, []);

    async function loadMatches() {
        const data = await getMatches();
        setMatches(data as Match[]);
    }

    async function handleSubmit(formData: FormData): Promise<void> {
        let result;

        if (editingMatch) {
            // Include ID in formData explicitly if needed, but it's redundant if hidden input works
            // The hidden input <input name="id" ... /> handles it.
            result = await updateMatch(formData);
        } else {
            result = await addMatch(formData);
        }

        if (result?.error) {
            alert(result.error);
        }
        if (result?.success) {
            formRef.current?.reset();
            setEditingMatch(null);
            alert(editingMatch ? "Match Updated!" : "Match Added!");
            await loadMatches();
        }
    }

    async function handleDelete(id: number): Promise<void> {
        if (!confirm("Are you sure you want to delete this match?")) return;

        const result = await deleteMatch(id);
        if (result?.error) {
            alert(result.error);
        }
        if (result?.success) {
            await loadMatches();
            // If we deleted the item being edited, clear edit state
            if (editingMatch?.id === id) {
                setEditingMatch(null);
                formRef.current?.reset();
            }
        }
    }

    function handleEdit(match: Match) {
        setEditingMatch(match);
        // Scroll to top to see form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleCancelEdit() {
        setEditingMatch(null);
        formRef.current?.reset();
    }

    function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        window.location.href = `/admin?pass=${password}`;
    }

    // Helper to format date for input (YYYY-MM-DD)
    const getDateValue = (startTime: string) => {
        return new Date(startTime).toISOString().split('T')[0];
    };

    // Helper to format time for input (HH:mm)
    const getTimeValue = (startTime: string) => {
        return new Date(startTime).toISOString().substring(11, 16);
    };

    // Password form
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-bg-main flex items-center justify-center p-4">
                <div className="bg-bg-card p-8 rounded-xl border border-white/10 max-w-md w-full">
                    <h1 className="font-serif text-2xl text-brand-gold mb-6 text-center">
                        Admin Access
                    </h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary mb-4 focus:border-brand-gold focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-brand-gold text-bg-main font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors"
                        >
                            Enter
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg-main p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-3xl text-brand-gold mb-8 text-center">
                    Admin Dashboard
                </h1>

                {/* Create/Edit Match Form */}
                <div className="bg-bg-card p-6 rounded-xl border border-white/10 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-text-primary">
                            {editingMatch ? "Edit Match" : "Add New Match"}
                        </h2>
                        {editingMatch && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="text-sm text-text-primary/70 hover:text-white underline"
                            >
                                Cancel Editing
                            </button>
                        )}
                    </div>

                    <form
                        ref={formRef}
                        action={handleSubmit}
                        className="space-y-4"
                        key={editingMatch ? editingMatch.id : "new"} // Force re-render when switching modes
                    >
                        {/* Hidden ID field for updates */}
                        <input type="hidden" name="id" value={editingMatch?.id || ""} />

                        <div>
                            <label className="block text-sm text-text-primary/70 mb-1">
                                Teams
                            </label>
                            <input
                                type="text"
                                name="teams"
                                placeholder="Home Team vs Away Team"
                                required
                                defaultValue={editingMatch?.teams || ""}
                                className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-primary/70 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    defaultValue={editingMatch ? getDateValue(editingMatch.start_time) : ""}
                                    className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary/70 mb-1">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    required
                                    defaultValue={editingMatch ? getTimeValue(editingMatch.start_time) : ""}
                                    className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-text-primary/70 mb-1">
                                League (optional)
                            </label>
                            <input
                                type="text"
                                name="league"
                                placeholder="Premier League, Champions League, etc."
                                defaultValue={editingMatch?.league || ""}
                                className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isHighlight"
                                id="isHighlight"
                                defaultChecked={editingMatch?.is_highlight || false}
                                className="w-4 h-4 accent-brand-gold"
                            />
                            <label htmlFor="isHighlight" className="text-sm text-text-primary/70">
                                Featured Event (Highlight)
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 font-semibold rounded-lg transition-colors ${editingMatch
                                ? "bg-blue-600 hover:bg-blue-500 text-white"
                                : "bg-brand-gold hover:bg-brand-gold/90 text-bg-main"
                                }`}
                        >
                            {editingMatch ? "Update Match" : "Add to Schedule"}
                        </button>
                    </form>
                </div>

                {/* Current Schedule */}
                <div className="bg-bg-card p-6 rounded-xl border border-white/10">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">
                        Current Schedule ({matches.length} matches)
                    </h2>

                    {matches.length === 0 ? (
                        <p className="text-text-primary/50 text-center py-8">
                            No matches scheduled yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-white/10">
                            {matches.map((match) => (
                                <li key={match.id} className={`flex items-center justify-between py-3 ${editingMatch?.id === match.id ? "bg-white/5 rounded px-2 -mx-2" : ""}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            {match.is_highlight && (
                                                <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded">
                                                    HIGHLIGHT
                                                </span>
                                            )}
                                            <span className="text-text-primary font-medium">
                                                {match.teams}
                                            </span>
                                        </div>
                                        <div className="text-sm text-text-primary/50 mt-1">
                                            {new Date(match.start_time).toLocaleString("en-GB", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                            {match.league && `• ${match.league}`}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(match)}
                                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                            title="Edit match"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(match.id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete match"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <p className="text-center text-text-primary/30 text-sm mt-8">
                    <a href="/" className="hover:text-brand-gold transition-colors">
                        ← Back to Home
                    </a>
                </p>
            </div>
        </main>
    );
}
