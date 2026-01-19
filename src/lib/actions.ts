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
        // Use Postgres native date comparison to filter out past days
        const result = await sql`
      SELECT id, teams, start_time, league, is_highlight 
      FROM matches 
      WHERE start_time >= CURRENT_DATE
      ORDER BY start_time ASC
    `;

        // Ensure the page gets fresh data on every request
        revalidatePath('/');

        return result.rows;
    } catch (error) {
        console.error("Error fetching matches:", error);
        return [];
    }
}

// --- DRINKS ACTIONS ---

export async function getDrinks() {
    try {
        const result = await sql`SELECT * FROM drinks ORDER BY created_at ASC`;
        return result.rows;
    } catch (error) {
        console.error("Error fetching drinks:", error);
        return [];
    }
}

export async function addDrink(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    if (!name || !price) {
        return { error: "Name and price are required" };
    }

    try {
        await sql`
      INSERT INTO drinks (name, description, price)
      VALUES (${name}, ${description}, ${price})
    `;
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error adding drink:", error);
        return { error: String(error) };
    }
}

export async function updateDrink(formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    if (!id || !name || !price) {
        return { error: "ID, Name, and Price are required" };
    }

    try {
        await sql`
      UPDATE drinks 
      SET name=${name}, description=${description}, price=${price}
      WHERE id=${id}
    `;
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating drink:", error);
        return { error: String(error) };
    }
}

export async function deleteDrink(id: number) {
    try {
        await sql`DELETE FROM drinks WHERE id = ${id}`;
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting drink:", error);
        return { error: String(error) };
    }
}
