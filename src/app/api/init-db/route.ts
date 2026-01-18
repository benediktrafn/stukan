import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS matches (
      id SERIAL PRIMARY KEY,
      teams TEXT NOT NULL,
      start_time TIMESTAMP WITH TIME ZONE NOT NULL,
      league TEXT,
      is_highlight BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

        await sql`CREATE TABLE IF NOT EXISTS drinks (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
        return NextResponse.json({ message: 'Table created successfully' });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
