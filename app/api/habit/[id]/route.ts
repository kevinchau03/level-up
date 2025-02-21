import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Habit from "@/server/models/Habit";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
    await connectToDatabase();
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const habits = await Habit.find({ user: userId });
    if (!habits) {
        return NextResponse.json({ error: "Habits not found" }, { status: 404 });
    }

    return NextResponse.json(habits, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching habits:", error);
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
    }


    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const body = await req.json();


    const { habitname, category } = body;
    if (!habitname || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const habit = await Habit.create({
      user: userObjectId,
      name: habitname,
      category,
      level: 1,
      xp : 0,
      xpRequired: 100,
    });

    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating habit:", error);
    return NextResponse.json({ error: "Failed to create habit" }, { status: 500 });
  }
}
