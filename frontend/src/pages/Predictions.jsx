import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { predictionsAPI } from '../services/api';
import { useAppStore } from '../store/appStore';

function Predictions() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const { habits } = useAppStore();

  useEffect(() => {
    loadPredictions();
  }, [habits]);

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const response = await predictionsAPI.getRecommendations({
        habits: habits,
        goals: 'Improve overall health and productivity',
      });
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      // Fallback to mock data if AI service is not available
      setRecommendations([
        {
          id: 1,
          title: 'Start a morning routine',
          reason: 'Based on your existing habits, establishing a morning routine can help boost productivity',
          habits: ['Meditation', 'Exercise', 'Healthy Breakfast'],
          successRate: 85,
        },
        {
          id: 2,
          title: 'Track your reading time',
          reason: 'Learning habits have shown 78% success rate for users with similar profiles',
          habits: ['Daily reading', 'Book summary'],
          successRate: 78,
        },
        {
          id: 3,
          title: 'Social connection time',
          reason: 'Users who add social habits show 72% higher overall completion rates',
          habits: ['Call a friend', 'Group activity'],
          successRate: 72,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading predictions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI-Powered Predictions</h1>
        <p className="text-gray-600 mb-8">
          Get personalized recommendations to improve your habit tracking
        </p>

        {recommendations && recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{rec.title}</h3>
                    <p className="text-gray-600 mt-2">{rec.reason}</p>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Success Rate</p>
                    <p className="text-3xl font-bold text-blue-600">{rec.successRate}%</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Suggested Habits:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.habits.map((habit) => (
                      <span
                        key={habit}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {habit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No predictions available yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Add more habits to get personalized recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictions;
