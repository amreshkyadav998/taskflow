'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ThreeScene from '@/components/ThreeScene';
import { useTheme } from '@/lib/theme';
import { ChartBarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    teamMembers: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4 gradient-text">
                Welcome back, {session?.user?.name}!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<ChartBarIcon className="h-6 w-6" />}
                  label="Projects"
                  value={stats.projects}
                />
                <StatCard
                  icon={<ClockIcon className="h-6 w-6" />}
                  label="Tasks"
                  value={stats.tasks}
                />
                <StatCard
                  icon={<UserGroupIcon className="h-6 w-6" />}
                  label="Team Members"
                  value={stats.teamMembers}
                />
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {/* Add recent activity items here */}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card h-[600px]"
          >
            <h2 className="text-2xl font-semibold mb-4 gradient-text">
              3D Project View
            </h2>
            <div className="h-[500px]">
              <ThreeScene />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 