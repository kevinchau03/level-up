"use client";
import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";

export const HabitForm: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userId = session?.user?.id;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const habitname = event.currentTarget.habitname.value;
    const category = event.currentTarget.category.value;

    const response = await fetch(`/api/habit/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, habitname, category }),
    });

    if (response.ok) {
      setMessage("✅ Habit created successfully!");
      event.currentTarget.reset();
    } else {
      setMessage("❌ Failed to create habit.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-80">
      <h2 className="text-lg font-bold text-black">Create a New Habit</h2>

      <input type="text" name="habitname" placeholder="Habit Name" required className="p-2 border rounded text-black" />
      <select name="category" required className="p-2 border rounded text-black">
        <option value="Health">Health</option>
        <option value="Learning">Learning</option>
        <option value="Productivity">Productivity</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition" disabled={loading}>
        {loading ? "Creating..." : "Add Habit"}
      </button>

      {message && <p className="text-sm text-center">{message}</p>}
    </form>
  );
}
