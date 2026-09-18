from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import numpy as np
from datetime import datetime, timedelta

# Import prediction models
from models.success_predictor import SuccessPredictor
from models.reminder_optimizer import ReminderOptimizer
from models.recommendation_engine import RecommendationEngine
from models.pattern_analyzer import PatternAnalyzer

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize ML models
success_predictor = SuccessPredictor()
reminder_optimizer = ReminderOptimizer()
recommendation_engine = RecommendationEngine()
pattern_analyzer = PatternAnalyzer()

# Routes

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'HabitForge AI Service'}), 200

@app.route('/api/predict/success', methods=['POST'])
def predict_success():
    """
    Predict success probability for a habit
    Expected JSON:
    {
        "habitId": "123",
        "completedDays": ["2024-09-01", "2024-09-02", ...],
        "streak": 5,
        "frequency": "daily"
    }
    """
    try:
        data = request.json
        habitId = data.get('habitId')
        completedDays = data.get('completedDays', [])
        streak = data.get('streak', 0)
        frequency = data.get('frequency', 'daily')

        # Make prediction
        prediction = success_predictor.predict(
            completed_days=completedDays,
            streak=streak,
            frequency=frequency
        )

        return jsonify({
            'habitId': habitId,
            'successProbability': float(prediction['probability']),
            'recommendation': prediction['recommendation'],
            'confidence': float(prediction['confidence'])
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/predict/reminder-time', methods=['POST'])
def predict_reminder_time():
    """
    Predict optimal reminder time based on completion patterns
    Expected JSON:
    {
        "habitId": "123",
        "completionTimes": ["09:30", "10:15", "09:45", ...]
    }
    """
    try:
        data = request.json
        habitId = data.get('habitId')
        completionTimes = data.get('completionTimes', [])

        # Calculate optimal time
        optimal_time = reminder_optimizer.optimize(completion_times=completionTimes)

        return jsonify({
            'habitId': habitId,
            'optimalReminderTime': optimal_time,
            'consistency': reminder_optimizer.get_consistency_score(completionTimes)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/predict/recommendations', methods=['POST'])
def get_recommendations():
    """
    Get personalized habit recommendations
    Expected JSON:
    {
        "habits": [...],
        "goals": "Improve health"
    }
    """
    try:
        data = request.json
        habits = data.get('habits', [])
        goals = data.get('goals', '')

        # Generate recommendations
        recommendations = recommendation_engine.generate(
            habits=habits,
            goals=goals
        )

        return jsonify({
            'recommendations': recommendations,
            'totalRecommendations': len(recommendations)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/predict/pattern', methods=['POST'])
def analyze_pattern():
    """
    Analyze habit completion patterns
    Expected JSON:
    {
        "completedDays": ["2024-09-01", "2024-09-02", ...],
        "frequency": "daily"
    }
    """
    try:
        data = request.json
        completedDays = data.get('completedDays', [])
        frequency = data.get('frequency', 'daily')

        # Analyze patterns
        pattern = pattern_analyzer.analyze(
            completed_days=completedDays,
            frequency=frequency
        )

        return jsonify({
            'pattern': pattern['pattern_type'],
            'consistency': float(pattern['consistency']),
            'bestDay': pattern['best_day'],
            'worstDay': pattern['worst_day'],
            'insights': pattern['insights']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/stats/health', methods=['GET'])
def get_stats():
    """Get AI service statistics"""
    return jsonify({
        'models_loaded': True,
        'success_predictor': 'ready',
        'reminder_optimizer': 'ready',
        'recommendation_engine': 'ready',
        'pattern_analyzer': 'ready'
    }), 200

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 5001))
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    app.run(debug=DEBUG, port=PORT, host='0.0.0.0')
