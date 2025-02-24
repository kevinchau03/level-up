"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti'

export default function Home() {
  const [xp, setXp] = useState(0);
  const [habitLevel, setHabitLevel] = useState(2);

  const xpProgress = Math.min((xp / 100) * 100, 100);

  const handleIncrement = () => {
    setXp((prevXp) => Math.min(prevXp + 10, 100));
    const audio = new Audio('/click.wav');
    audio.play();
  };

  useEffect(() => {
    if (xp >= 100) {
      const audio = new Audio('/level-up.mp3');
      audio.play();
      // Trigger confetti animation
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.6 },
      });
      // Level up
      setXp(0);
      setHabitLevel((prevLevel) => prevLevel + 1);
    }
  }, [xp]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4">
        <Link href="/" className="font-bold text-xl">LEVEL UP</Link>
        <div className="flex gap-4">
          <Link href="/onboarding">Start Questing</Link>
          <Link href="/dashboard">Load Save</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left">
        <div className="w-full md:w-7/12 md:mr-8">
          <h1 className="font-extrabold text-4xl md:text-5xl">
            Become the <span className="text-primary">Main Character</span>
          </h1>
          <h2 className="text-lg md:text-xl">Gamify your life, turn self-improvement into a game.</h2>
          <div className="gap-4 mt-8">
            <Link href="/onboarding" className="bg-primary p-4 rounded-lg font-bold">
              Start Questing
            </Link>
            <Link href="/dashboard" className="p-4 rounded-lg font-bold">
              Load Save
            </Link>
          </div>
        </div>
        <div className="relative w-full md:w-5/12">
          <div className="flex flex-col gap-2 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md w-70">
            <h1 className="text-xl font-bold text-neutral-800 dark:">Example Habit #1</h1>
            <h2 className="text-sm text-neutral-500 dark:text-neutral-300">Mastery: {habitLevel}</h2>
            <div className="relative w-full h-6 bg-neutral-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
              <div
                className="absolute h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{xp}/{100} XP</p>
            <button
              onClick={handleIncrement}
              className=" rounded-lg hover:bg-primary-dark transition"
            >
              ✅
            </button>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="h-full flex flex-col gap-4 justify-center items-center mt-12">
        <div className="text-center">
          <h2 className="font-extrabold text-3xl md:text-4xl text-primary">
            Building habits is tough. Staying a noob is tougher.
          </h2>
          <h3 className="text-lg">
            Did you know? Only 6% of people stick with their new year's resolution. Let's change that.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-xl">🎮 Gamify Your Life</h3>
            <p>Turn your life into a game. Level up your habits, earn XP, and become the hero of your own story.</p>
          </div>
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-xl">📈 Build Habits</h3>
            <p>Start building habits that stick. Track your progress, stay motivated, and level up your life.</p>
          </div>
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-xl">🔥 Stay Motivated</h3>
            <p>Get rewarded for your hard work. Stay motivated, build momentum, and become the best version of yourself.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='h-full flex flex-col gap-4 justify-center items-center mt-12'>
        <div className="text-center">
          <h2 className="font-extrabold text-3xl md:text-4xl text-primary">
            Let's transform the way people go about building habits. Let's make it fun.
          </h2>
          <h3 className="text-lg">
            Get to where you want to be with a little help from your friends. Level up your life.
          </h3>
        </div>

        <div>
          <div className="flex flex-col gap-8 mt-12">
            <div className="text-left flex flex-col md:flex-row md:gap-12">
              {/* Feature 1 */}
              <div className="text-left space-y-4 md:space-y-6">
                <p>Your Very Own Story Line</p>
                <h3 className="font-extrabold text-2xl">Create your own quest lines!</h3>
                <p>Treat your goals like quests in a video game. Every completed task gets you closer to the next level.
                  Users have the ability to choose what quests they choose to take on!
                </p>
                <Link href="/onboarding" className="bg-primary p-4 rounded-lg font-bold mt-8">
                  Start Your Journey Now
                </Link>
              </div>
              <div>
                <Image src="/quests.webp" alt="quest line" width={500} height={500} />
              </div>
              {/* Feature 2 */}
              <div className="text-left space-y-4 md:space-y-6">
                <p>Skills and Progression</p>
                <h3 className="font-bold text-xl">Choose your skills and master them!</h3>
                <p>Start building habits that stick. You can choose your own skills and level them up. Each skill will help you with your quests.
                  Keep leveling them up to become the best version of yourself.
                </p>
                <Link href="/dashboard" className="bg-primary p-4 rounded-lg font-bold mt-8">
                  Create My Skills
                </Link>
                <div>
                  <Image src="/skill-tree.jpg" alt="skills" width={500} height={500} />
                </div>
              </div>
              {/* Feature 3 */}
              <div className="text-left space-y-4 md:space-y-6">
                <p>Motivate Your Friends</p>
                <h3 className="font-bold text-xl">Leaderboards</h3>
                <p>To help push yourselves and others, users can add their friends to compete with eachother!</p>
                <Link href="/dashboard" className="bg-primary p-4 rounded-lg font-bold mt-8">
                  Create My Skills
                </Link>
                <div>
                  <Image src="/skill-tree.jpg" alt="skills" width={500} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
