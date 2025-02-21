"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PlayerCard } from "../components/PlayerCard";
import { SignOutButton } from "../components/SignOutButton";
import { HabitList } from "../components/HabitList";
import { HabitForm } from "../components/HabitForm";

export default function Dashboard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [user, setUser] = useState<{ username: string; email: string; level: number; xp: number } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      }
    }
    fetchUser();
  }, [userId]);

  if (!session) return <p>Please log in.</p>;
  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-4">
      <div>
        <PlayerCard username={user.username} level={user.level} xp={user.xp} streak={50} xpRequired={100} />
        <HabitForm />
      </div>
      <div className="border-l-2 border-gray-200 h-80">
        <HabitList />
        <SignOutButton />
      </div>
    </div>
  );
}
