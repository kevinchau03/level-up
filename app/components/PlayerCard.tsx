import React from 'react';
import Image from 'next/image';

type PlayerCardProps = {
  username: string;
  level: number;
  streak: number;
  xp: number;
  xpRequired: number;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  level,
  streak,
  xp,
  xpRequired,
}) => {
  // Calculate progression percentage
  const xpProgress = Math.min((xp / xpRequired) * 100, 100);

  return (
    <div className="relative text-white w-80 h-96 p-6 rounded-2xl shadow-xl">
      {/* Profile Info */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-6">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white mb-4">
          {/* Placeholder or dynamic profile image */}
          <Image src="/default-avatar.jpg" width={100} height={100} alt="Player Avatar" className="w-full h-full rounded-full" />
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold tracking-wider uppercase">{username}</h2>
        
        {/* Level */}
        <p className="text-sm text-neutral-200">Level {level}</p>

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

      {/* Card Overlay/Design Element */}
      <div className="absolute top-0 left-0 w-full h-full border border-neutral-400 opacity-25 pointer-events-none rounded-xl"></div>
    </div>
  );
};
