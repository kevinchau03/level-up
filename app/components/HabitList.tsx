"use client";
import React, { useEffect, useState } from "react";
import { HabitBar } from "./HabitBar";
import { useSession } from "next-auth/react";

interface Habit {
  _id: string;
  name: string;
  category: string;
  level: number;
  xp: number;
  xpRequired: number;
}

export const HabitList: React.FC = () => {
  const { data: session } = useSession();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    async function fetchHabits() {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/habits/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setHabits(data);
        }
      } catch (error) {
        console.error("❌ Error fetching habits:", error);
      }
    }

    fetchHabits();
  }, [session]);

  if (!session) return <p>Please log in to see your habits.</p>;

  return (
    <div className="flex flex-col gap-4">
      {habits.length > 0 ? (
        habits.map((habit) => (
          <HabitBar
            key={habit._id}
            habitId={habit._id}  // ✅ Pass habit _id for updates
            habit={habit.name}
            habitlevel={habit.level}
            category={habit.category}
            xp={habit.xp}
            xpRequired={habit.xpRequired}
          />
        ))
      ) : (
        <p>No habits found. Start tracking your first habit!</p>
      )}
    </div>
  );
};
