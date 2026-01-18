"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addMatch(formData: FormData) {
    const teams = formData.get("teams") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const league = (formData.get("league") as string) || null;
    const isHighlight = formData.get("isHighlight") === "on";

    if (!teams || !date || !time) {
        return { error: "Teams, date, and time are required" };
    }

    // Construct ISO timestamp
    const startTime = new Date(`${date}T${time}:00`);

    try {
        await sql`
      INSERT INTO matches (teams, start_time, league, is_highlight)
      VALUES (${teams}, ${startTime.toISOString()}, ${league}, ${isHighlight})
    `;

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error adding match:", error);
        return { error: String(error) };
    }
}

export async function deleteMatch(id: number) {
    try {
        await sql`DELETE FROM matches WHERE id = ${id}`;

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting match:", error);
        return { error: String(error) };
    }
}

export async function updateMatch(formData: FormData) {
    const id = Number(formData.get("id"));
    const teams = formData.get("teams") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const league = (formData.get("league") as string) || null;
    const isHighlight = formData.get("isHighlight") === "on";

    if (!id || !teams || !date || !time) {
        return { error: "ID, teams, date, and time are required" };
    }

    // Construct ISO timestamp
    const startTime = new Date(`${date}T${time}:00`);

    try {
        await sql`
      UPDATE matches 
      SET teams=${teams}, start_time=${startTime.toISOString()}, league=${league}, is_highlight=${isHighlight}
      WHERE id=${id}
    `;

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating match:", error);
        return { error: String(error) };
    }
}

export async function getMatches() {
    try {
        const result = await sql`
      SELECT id, teams, start_time, league, is_highlight 
      FROM matches 
      ORDER BY start_time ASC
    `;
        return result.rows;
    } catch (error) {
        console.error("Error fetching matches:", error);
        return [];
    }
}
