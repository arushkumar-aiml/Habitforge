import React from 'react';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';

function HabitCard({ habit, onComplete, onDelete, onClick }) {
  const isCompletedToday = habit.completedDays?.includes(
    new Date().toISOString().split('T')[0]
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div onClick={onClick} className="flex-1 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">{habit.name}</h3>
          <p className="text-gray-600 text-sm">{habit.description}</p>
          <div className="mt-2 flex gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {habit.category}
            </span>
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
              {habit.frequency}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(habit.habitId)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          <FiTrash2 size={20} />
        </button>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700 font-semibold">Streak: {habit.streak || 0} days</p>
          <p className="text-gray-700 font-semibold">Goal: {habit.goal || 'N/A'}</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${Math.min(((habit.streak || 0) / 30) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      <button
        onClick={() => onComplete(habit.habitId)}
        className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          isCompletedToday
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={isCompletedToday}
      >
        <FiCheckCircle size={20} />
        {isCompletedToday ? 'Completed Today!' : 'Mark as Done'}
      </button>
    </div>
  );
}

export default HabitCard;
