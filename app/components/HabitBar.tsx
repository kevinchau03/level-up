"use client";
import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

type HabitBarProps = {
  habitId: string;
  habit: string;
  habitlevel: number;
  category: string;
  xp: number;
  xpRequired: number;
};

export const HabitBar: React.FC<HabitBarProps> = ({
  habitId,
  habit,
  habitlevel,
  category,
  xp: initialXp,
  xpRequired,
}) => {
  const [xp, setXp] = useState(initialXp);
  const [habitLevel, setHabitLevel] = useState(habitlevel);
  const habitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setXp(initialXp);
    setHabitLevel(habitlevel);
  }, [initialXp, habitlevel]);

  // Calculate XP progress
  const xpProgress = Math.min((xp / xpRequired) * 100, 100);

  // Function to update XP & Level in the database
  const updateHabit = async (newXp: number, newLevel: number) => {
    try {
      const response = await fetch(`/api/habit/update/${habitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xp: newXp, level: newLevel }),
      });

      if (!response.ok) {
        throw new Error("Failed to update habit");
      }
    } catch (error) {
      console.error("❌ Error updating habit:", error);
    }
  };

  const deleteHabit = async () => {
    try {
        const response = await fetch(`/api/habit/update/${habitId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    
        if (!response.ok) {
            throw new Error("Failed to delete habit");
        }
        }
        catch (error) {
        console.error("❌ Error deleting habit:", error);
        }
    };

  // Increment XP when button is clicked
  const handleIncrement = async () => {
    const audio = new Audio("/click.wav");
    audio.play();
    let newXp = xp + 20;
    let newLevel = habitLevel;

    if (newXp >= xpRequired) {
      newXp = 0;
      newLevel += 1;

      // Play level-up sound and trigger confetti
      const audio = new Audio("/level-up.mp3");
      audio.play();

      if (habitRef.current) {
        const rect = habitRef.current.getBoundingClientRect();
        confetti({
          particleCount: 200,
          spread: 80,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        });
      }
    }

    setXp(newXp);
    setHabitLevel(newLevel);
    await updateHabit(newXp, newLevel);
  };

  return (
    <div ref={habitRef} className="flex flex-col gap-2 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md w-64">
      <h1 className="text-xl font-bold text-neutral-800 dark:text-white">{habit}</h1>
      <h2 className="text-sm text-neutral-500 dark:text-neutral-300">
        Mastery: {category} | Level: {habitLevel}
      </h2>
      <div className="relative w-full h-6 bg-neutral-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
        <div
          className="absolute h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${xpProgress}%` }}
        />
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
        {xp}/{xpRequired} XP
      </p>

      {/* Increment XP Button */}
      <button
        onClick={handleIncrement}
        className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        ✅
      </button>
      <button
        onClick={deleteHabit}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
        Delete
        </button>
    </div>
  );
};
