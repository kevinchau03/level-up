"use server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/server/models/User";
import Habit from "@/server/models/Habit";
import bcrypt from "bcryptjs";

export const register = async ({ email, password, username }: { email: string; password: string; username: string }) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Create a default habit for the user
    const exampleHabits = [
        { user: newUser._id, name: "Morning Exercise", category: "Health", level: 1, xp: 0, xpRequired: 100, streak: 0 },
        { user: newUser._id, name: "Read 10 Pages", category: "Learning", level: 1, xp: 0, xpRequired: 100, streak: 0 },
        { user: newUser._id, name: "Drink Water", category: "Health", level: 1, xp: 0, xpRequired: 100, streak: 0 },
      ];
  
    await Habit.insertMany(exampleHabits);

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "An error occurred during registration." };
  }
};