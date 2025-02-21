import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Db } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const db: Db = await connectToDatabase();

    // List all collections
    const collections = await db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections.map((col: { name: any; }) => col.name);

    // Return the list of collections
    return NextResponse.json({ collections: collectionNames }, { status: 200 });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
