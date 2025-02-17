"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [theme, setTheme] = useState('light');

  // Optional theme toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-background text-text">

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-[url('/background.webp')] bg-cover bg-center bg-fixed text-center px-6">
        <div className="text-left">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">LevelUp</h1>
          <h3 className="text-xl md:text-2xl mb-6 drop-shadow-md">Gamify your habits. Level up your life.</h3>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition text-xl font-extrabold">Load Save</button>
          </Link>
          <Link href="/onboarding">
            <button className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition text-xl font-extrabold">New Game</button>
          </Link>
          <Link href="/about">
            <button className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition text-xl font-extrabold">Learn More</button>
          </Link>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4">
        {/* Features Section */}
        <section className="text-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Building habits can be tough, being a noob is tougher.</h2>
            <p className="md:text-lg opacity-90 mb-12 md:mb-20">Did you know? Only 6% of people stick with their new years resolution. We can help with that.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4 text-primary">🎯 Habit Tracking</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Track your daily habits with interactive, gamified tools that keep you motivated.</p>
            </div>
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4 text-secondary">🌱 Skill Tree Progression</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Grow your skills through an intuitive skill tree, unlocking new abilities along the way.</p>
            </div>
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4 text-green-500">🔥 Streaks & Rewards</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Stay consistent to build streaks and earn exciting rewards that reflect your growth.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Level Up?</h2>
          <p className="mb-6 text-lg">Start tracking your habits and leveling up your life today!</p>
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition">Get Started Now</button>
        </section>
      </div>
      {/* Footer */}
      <footer className="py-6 px-4 bg-neutral-900 text-neutral-300 text-center">
        <p className="mb-3">&copy; {new Date().getFullYear()} LevelUp. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
