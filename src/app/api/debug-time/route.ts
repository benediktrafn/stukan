import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const nowResult = await sql`SELECT NOW()`;
        const nextMatches = await sql`
            SELECT id, teams, start_time, is_highlight 
            FROM matches 
            WHERE start_time > NOW() 
            ORDER BY start_time ASC 
            LIMIT 5
        `;

        return NextResponse.json({
            server_time: nowResult.rows[0].now,
            next_matches: nextMatches.rows
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
