"use server";
import clientPromise from "@/lib/mongodb";

// Define interface for fetched user
interface Player {
  username: string;
  level: number;
  xp: number;
  xpRequired: number;
  streak: number;
}

export async function fetchPlayer(username: string): Promise<Player | null> {
  try {
    const client = await clientPromise;
    const db = client.db("LevelUp");
    const user = await db.collection("users").findOne({ username });

    if (!user) return null;

    // Populate badges from badges collection if needed const badges = await db.collection("badges").find({ _id: { $in: user.badges } }).toArray();

    return {
      username: user.username,
      level: user.level,
      xp: user.xp,
      xpRequired: 1000, // Placeholder; you can calculate this dynamically
      streak: user.streak,
    };
  } catch (error) {
    console.error("Failed to fetch player:", error);
    return null;
  }
}
