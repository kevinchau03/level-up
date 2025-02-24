"use client";
import { useSession } from "next-auth/react";
import { PlayerCard } from "../components/PlayerCard";
import { SignOutButton } from "../components/SignOutButton";
import { HabitForm } from "../components/HabitForm";
import { HabitBar } from "../components/HabitBar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();

  // ✅ Fetch habits using React Query & fetch
  const { data: habits = [], isLoading: habitsLoading } = useQuery({
    queryKey: ["habits", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await fetch(`/api/habit/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch habits");
      return response.json();
    },
    enabled: !!userId, // Only fetch if userId is available
  });

  // ✅ Mutation to delete a habit
  const deleteHabitMutation = useMutation({
    mutationFn: async (habitId: string) => {
      const response = await fetch(`/api/habit/${habitId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete habit");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["habits", userId]); // ✅ Refetch habits after deleting
    },
  });

  if (!session) return <p>Please log in.</p>;
  if (habitsLoading) return <p>Loading habits...</p>;

  return (
    <div className="w-screen h-screen flex gap-4 p-4">
      <div>
        <PlayerCard username={session.user.name} level={1} xp={0} streak={50} xpRequired={100} />
        <SignOutButton />
      </div>

      <div>
        <h1 className="text-2xl font-bold">Habits</h1>
        {/* ✅ Render HabitBar for each habit */}
        {habits.length > 0 ? (
          habits.map((habit) => (
            <HabitBar
              key={habit._id}
              habitId={habit._id}
              habit={habit.name}
              habitlevel={habit.level}
              category={habit.category}
              xp={habit.xp}
              xpRequired={habit.xpRequired}
            />
          ))
        ) : (
          <p className="text-gray-500">No habits found. Add your first habit!</p>
        )}
      </div>

      <div>
        {/* ✅ No need for manual state updates, `useEffect` will trigger updates */}
        <HabitForm />
      </div>
    </div>
  );
}
