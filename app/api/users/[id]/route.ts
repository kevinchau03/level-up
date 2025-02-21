import { NextRequest, NextResponse } from "next/server";
import User from "@/server/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId).select("username email _id level xp streak xpRequired profilePicture");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
