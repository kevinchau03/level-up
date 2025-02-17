import { PlayerCard } from "../components/PlayerCard";
import { fetchPlayer } from "../actions/fetchPlayer";

export default async function Dashboard() {
    const player = await fetchPlayer("kevchau");

    if (!player) {
        return (
          <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
            <p className="text-xl">Player not found.</p>
          </div>
        );
      }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-800">
            <PlayerCard
                username={player.username}
                level={player.level}
                streak={player.streak}
                xp={player.xp}
                xpRequired={500}
                badges={[
                    { icon: "badge1" },
                    { icon: "badge2" },
                    { icon: "badge3" },
                ]}
            />
        </div>
    );
}

