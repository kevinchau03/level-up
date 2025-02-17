import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

// Handle GET requests
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db();
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: "MongoDB connection successful!",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
  } finally {
    await client.close();
  }
}
