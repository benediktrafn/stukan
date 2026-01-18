import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Aggressive Wipe (User Confirmed DELETE worked where TRUNCATE failed)
        await sql`DELETE FROM matches;`;

        // 2. Reset Sequence
        await sql`ALTER SEQUENCE matches_id_seq RESTART WITH 1;`;

        // 3. Insert fresh data
        await sql`INSERT INTO matches (teams, start_time, league, is_highlight) VALUES 
      ('Wolverhampton vs Newcastle', '2026-01-18T14:00:00Z', 'Premier League', false),
      ('Aston Villa vs Everton', '2026-01-18T16:30:00Z', 'Premier League', false),
      ('Ísland vs Pólland', '2026-01-18T17:00:00Z', 'EHF Euro 2026', true),
      ('Houston Texans vs New England Patriots', '2026-01-18T20:00:00Z', 'NFL Playoffs', true),
      ('Los Angeles Rams vs Chicago Bears', '2026-01-18T23:30:00Z', 'NFL Playoffs', true),
      ('Brighton vs Bournemouth', '2026-01-19T20:00:00Z', 'Premier League', false),
      ('Kairat Almaty vs Club Brugge', '2026-01-20T15:30:00Z', 'Champions League', false),
      ('FK Bodø/Glimt vs Manchester City', '2026-01-20T17:45:00Z', 'Champions League', false),
      ('Hungary vs Iceland', '2026-01-20T19:30:00Z', 'EHF Euro 2026', true),
      ('Inter Milan vs Arsenal', '2026-01-20T20:00:00Z', 'Champions League', true),
      ('Tottenham vs Borussia Dortmund', '2026-01-20T20:00:00Z', 'Champions League', true),
      ('Sporting CP vs PSG', '2026-01-20T20:00:00Z', 'Champions League', false),
      ('Real Madrid vs Monaco', '2026-01-20T20:00:00Z', 'Champions League', true),
      ('Villarreal vs Ajax', '2026-01-20T20:00:00Z', 'Champions League', false),
      ('Galatasaray vs Atlético Madrid', '2026-01-21T17:45:00Z', 'Champions League', false),
      ('Qarabag vs Eintracht Frankfurt', '2026-01-21T17:45:00Z', 'Champions League', false),
      ('Newcastle vs PSV Eindhoven', '2026-01-21T20:00:00Z', 'Champions League', false),
      ('Marseille vs Liverpool', '2026-01-21T20:00:00Z', 'Champions League', true),
      ('Chelsea vs Pafos', '2026-01-21T20:00:00Z', 'Champions League', false),
      ('Juventus vs Benfica', '2026-01-21T20:00:00Z', 'Champions League', false),
      ('Bayern Munich vs Union Saint-Gilloise', '2026-01-21T20:00:00Z', 'Champions League', false),
      ('Atalanta vs Athletic Bilbao', '2026-01-21T20:00:00Z', 'Champions League', false),
      ('Burnley vs Tottenham', '2026-01-24T15:00:00Z', 'Premier League', false),
      ('Bournemouth vs Liverpool', '2026-01-24T17:30:00Z', 'Premier League', false),
      ('Crystal Palace vs Chelsea', '2026-01-25T14:00:00Z', 'Premier League', false),
      ('Newcastle vs Aston Villa', '2026-01-25T14:00:00Z', 'Premier League', false),
      ('Arsenal vs Manchester United', '2026-01-25T16:30:00Z', 'Premier League', true),
      ('Everton vs Leeds United', '2026-01-26T20:00:00Z', 'Premier League', false);`;

        revalidatePath('/');

        return NextResponse.json({
            message: `Database wiped (DELETE) and reseeded successfully with 28 games!`,
            version: 'v5-final-delete-strategy',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
