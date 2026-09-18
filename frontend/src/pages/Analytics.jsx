import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { analyticsAPI } from '../services/api';

function Analytics() {
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [statsRes, categoryRes, weeklyRes] = await Promise.all([
        analyticsAPI.getStats(),
        analyticsAPI.getCategoryStats(),
        analyticsAPI.getWeeklySummary(),
      ]);

      setStats(statsRes.data.stats);
      setCategoryStats(categoryRes.data.categoryStats);
      setWeeklySummary(weeklyRes.data.weeklySummary);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Analytics</h1>

        {/* Key Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Success Rate</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{stats.successRate}%</p>
              <p className="text-gray-500 text-sm mt-2">All habits completed</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Current Streak</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stats.bestStreak} days</p>
              <p className="text-gray-500 text-sm mt-2">Best habit streak</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Active Habits</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{stats.activeHabits}</p>
              <p className="text-gray-500 text-sm mt-2">Out of {stats.totalHabits} total</p>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {categoryStats && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Habits by Category</h2>
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, data]) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-gray-700">{category}</p>
                    <p className="text-gray-600">{data.completed}/{data.total}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-500 mt-1">{data.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Summary */}
        {weeklySummary && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Summary</h2>
            <p className="text-gray-600 mb-4">{weeklySummary.week}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">{weeklySummary.completionRate}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Best Day</p>
                <p className="text-3xl font-bold text-blue-600">{weeklySummary.bestDay}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Top Habits This Week</h3>
              <ul className="space-y-2">
                {weeklySummary.habits.map((habit) => (
                  <li key={habit.name} className="flex justify-between text-sm">
                    <span className="text-gray-700">{habit.name}</span>
                    <span className="font-semibold text-gray-800">{habit.completions} times</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
