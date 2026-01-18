"use client";

import { useRef, useEffect, useState } from "react";
import {
    addMatch, deleteMatch, getMatches, updateMatch,
    addDrink, deleteDrink, getDrinks, updateDrink
} from "@/lib/actions";

interface Match {
    id: number;
    teams: string;
    start_time: string;
    league: string | null;
    is_highlight: boolean;
}

interface Drink {
    id: number;
    name: string;
    description: string | null;
    price: number;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState<'schedule' | 'drinks'>('schedule');

    // Data States
    const [matches, setMatches] = useState<Match[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);

    // Edit States
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);
    const [editingDrink, setEditingDrink] = useState<Drink | null>(null);

    const matchFormRef = useRef<HTMLFormElement>(null);
    const drinkFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Check URL for password
        const params = new URLSearchParams(window.location.search);
        const pass = params.get("pass");
        if (pass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || pass === "stukan2026") {
            setIsAuthenticated(true);
            loadData();
        }
    }, []);

    async function loadData() {
        const matchesData = await getMatches();
        setMatches(matchesData as Match[]);

        const drinksData = await getDrinks();
        setDrinks(drinksData as Drink[]);
    }

    // --- MATCH HANDLERS ---
    async function handleMatchSubmit(formData: FormData): Promise<void> {
        let result;
        if (editingMatch) {
            result = await updateMatch(formData);
        } else {
            result = await addMatch(formData);
        }

        if (result?.error) alert(result.error);
        if (result?.success) {
            matchFormRef.current?.reset();
            setEditingMatch(null);
            loadData();
        }
    }

    async function handleMatchDelete(id: number): Promise<void> {
        if (!confirm("Delete this match?")) return;
        const result = await deleteMatch(id);
        if (result?.success) loadData();
    }

    // --- DRINK HANDLERS ---
    async function handleDrinkSubmit(formData: FormData): Promise<void> {
        let result;
        if (editingDrink) {
            result = await updateDrink(formData);
        } else {
            result = await addDrink(formData);
        }

        if (result?.error) alert(result.error);
        if (result?.success) {
            drinkFormRef.current?.reset();
            setEditingDrink(null);
            loadData();
        }
    }

    async function handleDrinkDelete(id: number): Promise<void> {
        if (!confirm("Delete this drink?")) return;
        const result = await deleteDrink(id);
        if (result?.success) loadData();
    }

    // --- HELPERS ---
    function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        window.location.href = `/admin?pass=${password}`;
    }

    const getDateValue = (startTime: string) => new Date(startTime).toISOString().split('T')[0];
    const getTimeValue = (startTime: string) => new Date(startTime).toISOString().substring(11, 16);

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-bg-main flex items-center justify-center p-4">
                <div className="bg-bg-card p-8 rounded-xl border border-white/10 max-w-md w-full">
                    <h1 className="font-serif text-2xl text-brand-gold mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary mb-4 focus:border-brand-gold focus:outline-none"
                            autoFocus
                        />
                        <button type="submit" className="w-full py-3 bg-brand-gold text-bg-main font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors">
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
                <h1 className="font-serif text-3xl text-brand-gold mb-8 text-center">Dashboard</h1>

                {/* TABS */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`flex-1 py-4 text-center rounded-xl font-bold tracking-widest uppercase transition-all ${activeTab === 'schedule'
                                ? "bg-brand-gold text-bg-main shadow-lg"
                                : "bg-bg-card text-text-primary/50 hover:bg-white/5"
                            }`}
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => setActiveTab('drinks')}
                        className={`flex-1 py-4 text-center rounded-xl font-bold tracking-widest uppercase transition-all ${activeTab === 'drinks'
                                ? "bg-brand-gold text-bg-main shadow-lg"
                                : "bg-bg-card text-text-primary/50 hover:bg-white/5"
                            }`}
                    >
                        Drinks
                    </button>
                </div>

                {/* --- SCHEDULE TAB --- */}
                {activeTab === 'schedule' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Match Form */}
                        <div className="bg-bg-card p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-text-primary">
                                    {editingMatch ? "Edit Match" : "Add Match"}
                                </h2>
                                {editingMatch && (
                                    <button onClick={() => { setEditingMatch(null); matchFormRef.current?.reset(); }} className="text-sm text-text-primary/70 hover:text-white underline">
                                        Cancel
                                    </button>
                                )}
                            </div>
                            <form ref={matchFormRef} action={handleMatchSubmit} className="space-y-4" key={editingMatch?.id || "new-match"}>
                                <input type="hidden" name="id" value={editingMatch?.id || ""} />
                                <input type="text" name="teams" placeholder="Home vs Away" required defaultValue={editingMatch?.teams || ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" name="date" required defaultValue={editingMatch ? getDateValue(editingMatch.start_time) : ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                    <input type="time" name="time" required defaultValue={editingMatch ? getTimeValue(editingMatch.start_time) : ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                </div>
                                <input type="text" name="league" placeholder="League (Optional)" defaultValue={editingMatch?.league || ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="isHighlight" id="isHighlight" defaultChecked={editingMatch?.is_highlight || false} className="w-4 h-4 accent-brand-gold" />
                                    <label htmlFor="isHighlight" className="text-sm text-text-primary/70">Highlight Event</label>
                                </div>
                                <button type="submit" className={`w-full py-3 font-bold rounded-lg ${editingMatch ? "bg-blue-600 text-white" : "bg-brand-gold text-bg-main"}`}>
                                    {editingMatch ? "Update Match" : "Add to Schedule"}
                                </button>
                            </form>
                        </div>

                        {/* Match List */}
                        <div className="bg-bg-card p-6 rounded-xl border border-white/10">
                            <h2 className="text-lg font-semibold text-text-primary mb-4">Current Schedule</h2>
                            <ul className="divide-y divide-white/10">
                                {matches.map((match) => (
                                    <li key={match.id} className="flex items-center justify-between py-3">
                                        <div>
                                            <div className="font-medium text-text-primary">
                                                {match.is_highlight && <span className="text-brand-gold mr-2">★</span>}
                                                {match.teams}
                                            </div>
                                            <div className="text-xs text-text-primary/50">
                                                {new Date(match.start_time).toLocaleString("en-GB", { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingMatch(match); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-2 text-blue-400 hover:bg-white/5 rounded">✏️</button>
                                            <button onClick={() => handleMatchDelete(match.id)} className="p-2 text-red-500 hover:bg-white/5 rounded">✕</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* --- DRINKS TAB --- */}
                {activeTab === 'drinks' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Drink Form */}
                        <div className="bg-bg-card p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-text-primary">
                                    {editingDrink ? "Edit Drink" : "Add Drink"}
                                </h2>
                                {editingDrink && (
                                    <button onClick={() => { setEditingDrink(null); drinkFormRef.current?.reset(); }} className="text-sm text-text-primary/70 hover:text-white underline">
                                        Cancel
                                    </button>
                                )}
                            </div>
                            <form ref={drinkFormRef} action={handleDrinkSubmit} className="space-y-4" key={editingDrink?.id || "new-drink"}>
                                <input type="hidden" name="id" value={editingDrink?.id || ""} />

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <input type="text" name="name" placeholder="Drink Name (e.g. Víking Gull)" required defaultValue={editingDrink?.name || ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" name="price" placeholder="Price (kr)" required defaultValue={editingDrink?.price || ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />
                                    </div>
                                </div>
                                <input type="text" name="description" placeholder="Description (e.g. Draft 0.5L)" defaultValue={editingDrink?.description || ""} className="w-full px-4 py-3 bg-bg-main border border-white/20 rounded-lg text-text-primary focus:border-brand-gold focus:outline-none" />

                                <button type="submit" className={`w-full py-3 font-bold rounded-lg ${editingDrink ? "bg-blue-600 text-white" : "bg-brand-gold text-bg-main"}`}>
                                    {editingDrink ? "Update Drink" : "Add Drink"}
                                </button>
                            </form>
                        </div>

                        {/* Drink List */}
                        <div className="bg-bg-card p-6 rounded-xl border border-white/10">
                            <h2 className="text-lg font-semibold text-text-primary mb-4">Current Menu</h2>
                            <ul className="divide-y divide-white/10">
                                {drinks.map((drink) => (
                                    <li key={drink.id} className="flex items-center justify-between py-3">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-text-primary">{drink.name}</span>
                                                <span className="text-brand-gold font-mono text-sm">{drink.price.toLocaleString('is-IS')} kr</span>
                                            </div>
                                            {drink.description && (
                                                <div className="text-xs text-text-primary/50">{drink.description}</div>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingDrink(drink); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-2 text-blue-400 hover:bg-white/5 rounded">✏️</button>
                                            <button onClick={() => handleDrinkDelete(drink.id)} className="p-2 text-red-500 hover:bg-white/5 rounded">✕</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <p className="text-center text-text-primary/30 text-sm mt-12 hover:text-white transition-colors">
                    <a href="/">← Back to Home</a>
                </p>
            </div>
        </main>
    );
}
