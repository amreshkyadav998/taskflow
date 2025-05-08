'use client';

import { useTheme } from '@/lib/theme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import ThreeScene from '@/components/ThreeScene';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="font-serif min-h-screen bg-[#0f172a] dark:bg-[#0f172a] text-text dark:text-text-dark transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl md:text-4xl text-gray-200 font-bold gradient-text">Taskflow 3D</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mb-16">
          <div className="w-full max-w-3xl md:max-w-6xl h-[350px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-4xl flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <ThreeScene />
          </div>
          <h2 className="mt-8 text-3xl md:text-4xl font-extrabold text-center gradient-text text-blue-400">Project Management, Reimagined in 3D</h2>
          <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl">
            Experience your workflow in a whole new dimension. Visualize, collaborate, and analyze your projects with stunning 3D interfaces.
          </p>
        </section>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <FeatureCard
            title="3D Visualization"
            description="View your projects in an immersive 3D environment."
            icon="🎮"
          />
          <FeatureCard
            title="Real-time Collaboration"
            description="Work together with your team in real-time."
            icon="👥"
          />
          <FeatureCard
            title="Advanced Analytics"
            description="Get detailed insights into your project progress."
            icon="📊"
          />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="btn-primary text-lg font-semibold shadow-xl p-3 bg-indigo-500 rounded-xl border-blue-500 hover:bg-blue-300 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="card flex flex-col items-center text-center border-2 rounded-xl p-9 bg-indigo-600">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
