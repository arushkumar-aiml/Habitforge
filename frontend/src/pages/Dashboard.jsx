import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import HabitCard from '../components/HabitCard';
import CreateHabitModal from '../components/CreateHabitModal';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const {
    habits,
    fetchHabits,
    completeHabit,
    deleteHabit,
    loading,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      await fetchHabits();
    } catch (error) {
      toast.error('Failed to load habits');
    }
  };

  const handleCompleteHabit = async (habitId) => {
    try {
      await completeHabit(habitId);
      toast.success('Habit marked as completed! 🎉');
    } catch (error) {
      toast.error('Failed to complete habit');
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await deleteHabit(habitId);
        toast.success('Habit deleted');
      } catch (error) {
        toast.error('Failed to delete habit');
      }
    }
  };

  const handleHabitClick = (habitId) => {
    navigate(`/habit/${habitId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Habits</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            + New Habit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Habits</p>
            <p className="text-3xl font-bold text-blue-600">{habits.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Completed Today</p>
            <p className="text-3xl font-bold text-green-600">
              {habits.filter(h => h.completedDays?.includes(new Date().toISOString().split('T')[0])).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Current Streak</p>
            <p className="text-3xl font-bold text-yellow-600">
              {Math.max(0, ...habits.map(h => h.streak || 0))} days
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Success Rate</p>
            <p className="text-3xl font-bold text-purple-600">
              {habits.length > 0 ? Math.round((habits.filter(h => h.completedDays?.length > 0).length / habits.length) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Habits Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading habits...</p>
          </div>
        ) : habits.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 mb-4">No habits yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard
                key={habit.habitId}
                habit={habit}
                onComplete={handleCompleteHabit}
                onDelete={handleDeleteHabit}
                onClick={() => handleHabitClick(habit.habitId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Habit Modal */}
      {showModal && (
        <CreateHabitModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            loadHabits();
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
