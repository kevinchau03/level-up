import React from 'react';
import Image from 'next/image';

type Badge = {
  name: string;
  icon: string;
};

type PlayerCardProps = {
  username: string;
  level: number;
  streak: number;
  xp: number;
  xpRequired: number;
  badges: Badge[];
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  level,
  streak,
  xp,
  xpRequired,
  badges,
}) => {
  // Calculate progression percentage
  const xpProgress = Math.min((xp / xpRequired) * 100, 100);

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-800 text-white w-80 h-96 p-6 rounded-2xl shadow-xl border-4 border-indigo-500">
      
      {/* Top Banner */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black font-bold text-lg px-4 py-2 rounded-full border-2 border-black">
        Level {level}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-6">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white mb-4">
          {/* Placeholder or dynamic profile image */}
          <Image src="/default-avatar.jpg" width={100} height={100} alt="Player Avatar" className="w-full h-full rounded-full" />
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold tracking-wider uppercase">{username}</h2>

        {/* Streak */}
        <p className="text-sm text-neutral-200">🔥 {streak}-Day Streak</p>
      </div>

      {/* Progression Bar */}
      <div className="mt-4">
        <p className="mb-2 text-sm">XP Progress</p>
        <div className="w-full bg-neutral-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-400 h-4 transition-all"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-neutral-300 mt-1">
          {xp} / {xpRequired} XP
        </p>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <p className="mb-2 text-sm">🎖️ Badges</p>
        <div className="flex gap-2 overflow-x-auto">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={badge.icon} alt={badge.name} className="w-10 h-10" />
                <p className="text-xs mt-1">{badge.name}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-neutral-400">No badges yet</p>
          )}
        </div>
      </div>

      {/* Card Overlay/Design Element */}
      <div className="absolute top-0 left-0 w-full h-full border border-neutral-400 opacity-25 pointer-events-none rounded-xl"></div>
    </div>
  );
};
