import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import { analyticsAPI } from '../services/api';

function HabitDetail() {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, completeHabit, updateHabit } = useAppStore();
  const [habit, setHabit] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabitDetail();
  }, [habitId, habits]);

  const loadHabitDetail = async () => {
    setLoading(true);
    try {
      const foundHabit = habits.find((h) => h.habitId === habitId);
      if (foundHabit) {
        setHabit(foundHabit);
        // Load progress data
        const progressRes = await analyticsAPI.getProgress(habitId, 30);
        setProgress(progressRes.data.progress);
      } else {
        toast.error('Habit not found');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to load habit details');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await completeHabit(habitId);
      setHabit((prev) => ({
        ...prev,
        streak: (prev.streak || 0) + 1,
        completedDays: [...(prev.completedDays || []), new Date().toISOString().split('T')[0]],
      }));
      toast.success('Great job! Habit marked as complete! 🎉');
    } catch (error) {
      toast.error('Failed to mark habit as complete');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!habit) {
    return <div className="flex items-center justify-center min-h-screen">Habit not found</div>;
  }

  const completionPercentage = progress
    ? (progress.filter((p) => p.completed).length / progress.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{habit.name}</h1>
              <p className="text-gray-600 mt-2">{habit.description}</p>
            </div>
            <button
              onClick={handleMarkComplete}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Mark as Complete
            </button>
          </div>

          {/* Badges */}
          <div className="flex gap-3 mb-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              {habit.category}
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              {habit.frequency}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Current Streak</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{habit.streak || 0}</p>
              <p className="text-gray-500 text-xs mt-1">days</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Total Completions</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {habit.completedDays?.length || 0}
              </p>
              <p className="text-gray-500 text-xs mt-1">times</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Goal</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{habit.goal || 'N/A'}</p>
              <p className="text-gray-500 text-xs mt-1">days</p>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        {progress && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">30-Day Progress</h2>

            {/* Overall Completion */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-gray-700">Completion Rate</p>
                <p className="font-bold text-blue-600">{Math.round(completionPercentage)}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Calendar View */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 mb-2">
                  {day}
                </div>
              ))}
              {progress.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${
                    day.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {new Date(day.date).getDate()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HabitDetail;
