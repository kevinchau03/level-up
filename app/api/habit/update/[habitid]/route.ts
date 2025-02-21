import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Habit from "@/server/models/Habit";

export async function PATCH(req: NextRequest, { params }: { params: { habitId: string } }) {
  try {
    await connectToDatabase();
    const { habitId } = params;

    if (!habitId) {
      return NextResponse.json({ error: "Habit ID is required" }, { status: 400 });
    }

    const { xp, level } = await req.json();

    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { xp, level },
      { new: true }
    );

    if (!updatedHabit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHabit, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating habit:", error);
    return NextResponse.json({ error: "Failed to update habit" }, { status: 500 });
  }
}
