"use client";
import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const HabitForm: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();

  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("Health");

  // ✅ Mutation to add a habit using fetch
  const addHabitMutation = useMutation({
    mutationFn: async ({ name, category }: { name: string; category: string }) => {
      const response = await fetch(`/api/habit/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habitname: name, category }),
      });

      if (!response.ok) {
        throw new Error("Failed to create habit");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["habits", userId]); // ✅ Refetch habits after adding
      setHabitName(""); // Clear input fields
      setCategory("Health");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!habitName.trim()) return;

    addHabitMutation.mutate({ name: habitName, category }); // ✅ Trigger habit addition
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-80">
      <h2 className="text-lg font-bold text-black">Create a New Habit</h2>

      <input
        type="text"
        name="habitname"
        placeholder="Habit Name"
        required
        className="p-2 border rounded text-black"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />

      <select
        name="category"
        required
        className="p-2 border rounded text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Health">Health</option>
        <option value="Learning">Learning</option>
        <option value="Productivity">Productivity</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition"
        disabled={addHabitMutation.isLoading}
      >
        {addHabitMutation.isLoading ? "Creating..." : "Add Habit"}
      </button>

      {addHabitMutation.isError && <p className="text-sm text-red-500 text-center">❌ Failed to create habit.</p>}
      {addHabitMutation.isSuccess && <p className="text-sm text-green-500 text-center">✅ Habit created successfully!</p>}
    </form>
  );
};
