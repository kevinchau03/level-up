import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Habit from "@/server/models/Habit";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: { habitId: string } }) {
  try {
    await connectToDatabase();
    
    console.log("✅ PATCH Request Received");
    console.log("✅ Habit ID:", params.habitId);

    if (!params.habitId) {
      console.log("❌ Habit ID is missing.");
      return NextResponse.json({ error: "Habit ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.habitId)) {
      console.log("❌ Invalid Habit ID:", params.habitId);
      return NextResponse.json({ error: "Invalid Habit ID format" }, { status: 400 });
    }

    const body = await req.json();
    console.log("📨 Received Data:", body);

    const updatedHabit = await Habit.findByIdAndUpdate(
      params.habitId,
      { xp: body.xp, level: body.level },
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

export async function DELETE(req: NextRequest, { params }: { params: { habitId: string } }) {
    try {
        await connectToDatabase();
        
        console.log("✅ DELETE Request Received");
        console.log("✅ Habit ID:", params.habitId);
    
        if (!params.habitId) {
        console.log("❌ Habit ID is missing.");
        return NextResponse.json({ error: "Habit ID is required" }, { status: 400 });
        }
    
        if (!mongoose.Types.ObjectId.isValid(params.habitId)) {
        console.log("❌ Invalid Habit ID:", params.habitId);
        return NextResponse.json({ error: "Invalid Habit ID format" }, { status: 400 });
        }
    
        const deletedHabit = await Habit.findByIdAndDelete(params.habitId);
    
        if (!deletedHabit) {
        return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Habit deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting habit:", error);
        return NextResponse.json({ error: "Failed to delete habit" }, { status: 500 });
    }
    }