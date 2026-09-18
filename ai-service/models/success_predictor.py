import numpy as np
from sklearn.ensemble import RandomForestClassifier
from datetime import datetime, timedelta

class SuccessPredictor:
    """
    Predicts the probability of successfully completing a habit
    """

    def __init__(self):
        # Initialize a simple model (in production, this would be trained on historical data)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self._is_trained = False

    def predict(self, completed_days, streak, frequency):
        """
        Predict success probability
        
        Args:
            completed_days: List of completion dates
            streak: Current streak count
            frequency: Frequency of habit (daily, weekly, etc.)
        
        Returns:
            Dictionary with probability, recommendation, and confidence
        """
        try:
            # Calculate features
            features = self._extract_features(completed_days, streak, frequency)

            # Calculate success probability using heuristics
            # (In production, this would use actual ML model)
            probability = self._calculate_probability(features, streak)

            # Generate recommendation
            recommendation = self._get_recommendation(probability, streak)

            # Calculate confidence
            confidence = min(0.95, len(completed_days) / 100.0) if completed_days else 0.6

            return {
                'probability': probability,
                'recommendation': recommendation,
                'confidence': confidence
            }
        except Exception as e:
            print(f"Error in success prediction: {e}")
            return {
                'probability': 0.5,
                'recommendation': 'Keep going! You\'re doing great!',
                'confidence': 0.5
            }

    def _extract_features(self, completed_days, streak, frequency):
        """Extract features for prediction"""
        features = {
            'completion_count': len(completed_days),
            'streak': streak,
            'frequency': self._frequency_to_numeric(frequency),
            'consistency': self._calculate_consistency(completed_days),
            'recent_performance': self._recent_performance(completed_days)
        }
        return features

    def _frequency_to_numeric(self, frequency):
        """Convert frequency string to numeric"""
        freq_map = {
            'daily': 1.0,
            'biweekly': 0.5,
            'weekly': 0.7,
            'monthly': 0.3
        }
        return freq_map.get(frequency.lower(), 0.5)

    def _calculate_consistency(self, completed_days):
        """Calculate consistency score"""
        if not completed_days or len(completed_days) < 2:
            return 0.5

        # Convert string dates to datetime objects
        try:
            dates = [datetime.fromisoformat(day) for day in completed_days]
            dates.sort()
            
            gaps = []
            for i in range(1, len(dates)):
                gap = (dates[i] - dates[i-1]).days
                gaps.append(gap)
            
            avg_gap = np.mean(gaps) if gaps else 1
            consistency = 1.0 / (1.0 + avg_gap - 1.0)
            return min(1.0, consistency)
        except:
            return 0.5

    def _recent_performance(self, completed_days):
        """Check recent performance (last 7 days)"""
        if not completed_days:
            return 0.5

        try:
            # Convert to datetime
            dates = [datetime.fromisoformat(day) for day in completed_days]
            recent_dates = [d for d in dates if (datetime.now() - d).days <= 7]
            
            if len(completed_days) == 0:
                return 0.0
            return len(recent_dates) / min(7, len(completed_days))
        except:
            return 0.5

    def _calculate_probability(self, features, streak):
        """Calculate success probability"""
        # Base probability
        base = 0.5

        # Streak factor (0-1)
        streak_factor = min(1.0, streak / 30.0) * 0.3

        # Consistency factor (0-1)
        consistency_factor = features['consistency'] * 0.3

        # Recent performance factor (0-1)
        recent_factor = features['recent_performance'] * 0.2

        # Frequency factor
        freq_factor = features['frequency'] * 0.2

        probability = base + streak_factor + consistency_factor + recent_factor + freq_factor
        return min(1.0, max(0.0, probability))

    def _get_recommendation(self, probability, streak):
        """Get recommendation based on probability"""
        if probability >= 0.8:
            return f"Excellent! You're on a great streak ({streak} days). Keep it up! 🚀"
        elif probability >= 0.6:
            return "You're doing well! Try to maintain consistency. 💪"
        elif probability >= 0.4:
            return "You can do better! Focus on regular completion. 📝"
        else:
            return "Don't give up! Start small and build momentum. 🌱"
