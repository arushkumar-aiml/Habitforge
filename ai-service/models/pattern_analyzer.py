import numpy as np
from datetime import datetime, timedelta
from collections import Counter

class PatternAnalyzer:
    """
    Analyzes habit completion patterns
    """

    def __init__(self):
        self.days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    def analyze(self, completed_days, frequency):
        """
        Analyze completion patterns
        
        Args:
            completed_days: List of dates when habit was completed
            frequency: Expected frequency (daily, weekly, etc.)
        
        Returns:
            Dictionary with pattern analysis results
        """
        try:
            if not completed_days:
                return {
                    'pattern_type': 'No Data',
                    'consistency': 0.0,
                    'best_day': 'N/A',
                    'worst_day': 'N/A',
                    'insights': ['Start tracking to build habits!']
                }

            # Convert dates
            dates = self._parse_dates(completed_days)
            if not dates:
                return self._default_response()

            # Analyze patterns
            pattern_type = self._detect_pattern(dates, frequency)
            consistency = self._calculate_consistency(dates)
            best_day, worst_day = self._analyze_weekday_patterns(dates)
            insights = self._generate_insights(dates, pattern_type, consistency)

            return {
                'pattern_type': pattern_type,
                'consistency': consistency,
                'best_day': best_day,
                'worst_day': worst_day,
                'insights': insights
            }

        except Exception as e:
            print(f"Error analyzing pattern: {e}")
            return self._default_response()

    def _parse_dates(self, completed_days):
        """Parse date strings to datetime objects"""
        dates = []
        for day in completed_days:
            try:
                date = datetime.fromisoformat(day)
                dates.append(date)
            except:
                try:
                    # Try other date formats
                    date = datetime.strptime(day, '%Y-%m-%d')
                    dates.append(date)
                except:
                    continue
        return sorted(dates)

    def _detect_pattern(self, dates, frequency):
        """Detect the pattern of habit completion"""
        if len(dates) < 2:
            return 'Insufficient Data'

        # Calculate gaps between completions
        gaps = []
        for i in range(1, len(dates)):
            gap = (dates[i] - dates[i-1]).days
            gaps.append(gap)

        avg_gap = np.mean(gaps)

        # Match to frequency
        if frequency.lower() == 'daily':
            if avg_gap < 1.5:
                return 'Consistent Daily'
            elif avg_gap < 3:
                return 'Regular But Skipping Days'
            else:
                return 'Sporadic'
        elif frequency.lower() == 'weekly':
            if 5 < avg_gap < 9:
                return 'Consistent Weekly'
            elif avg_gap > 9:
                return 'Irregular Weekly'
            else:
                return 'More Frequent Than Weekly'
        else:
            return 'Custom Pattern'

    def _calculate_consistency(self, dates):
        """Calculate consistency score (0-1)"""
        if len(dates) < 2:
            return 0.5

        gaps = []
        for i in range(1, len(dates)):
            gap = (dates[i] - dates[i-1]).days
            gaps.append(gap)

        # Standard deviation of gaps
        gap_std = np.std(gaps) if gaps else 0
        
        # Lower standard deviation = higher consistency
        # Normalize to 0-1 range
        consistency = 1.0 / (1.0 + gap_std / 2.0)
        return min(1.0, max(0.0, consistency))

    def _analyze_weekday_patterns(self, dates):
        """Analyze which days of week have most completions"""
        weekday_counts = Counter()

        for date in dates:
            weekday = date.weekday()  # Monday=0, Sunday=6
            weekday_counts[weekday] += 1

        if not weekday_counts:
            return 'N/A', 'N/A'

        best_weekday = max(weekday_counts, key=weekday_counts.get)
        worst_weekday = min(weekday_counts, key=weekday_counts.get)

        return (
            self.days_of_week[best_weekday],
            self.days_of_week[worst_weekday]
        )

    def _generate_insights(self, dates, pattern_type, consistency):
        """Generate insights from pattern"""
        insights = []

        # Pattern-based insights
        if 'Consistent' in pattern_type:
            insights.append(f"Great consistency! You're following the {pattern_type.lower()} pattern.")
        elif 'Sporadic' in pattern_type:
            insights.append("Your habit is sporadic. Try to establish a more regular schedule.")
        elif 'Irregular' in pattern_type:
            insights.append("Your completion pattern is irregular. Building a routine could help.")

        # Consistency insights
        if consistency > 0.8:
            insights.append("Excellent consistency! Keep maintaining this rhythm.")
        elif consistency > 0.6:
            insights.append("Good consistency. Try to reduce variations in completion timing.")
        elif consistency > 0.4:
            insights.append("Moderate consistency. Setting reminders might help stabilize your habit.")
        else:
            insights.append("Low consistency. Focus on creating a fixed schedule for this habit.")

        # Frequency insights
        days_since_last = (datetime.now() - dates[-1]).days if dates else float('inf')
        if days_since_last == 0:
            insights.append("Excellent! You completed the habit today.")
        elif days_since_last == 1:
            insights.append("You missed yesterday. Get back on track today!")
        elif days_since_last > 3:
            insights.append(f"You haven't completed this habit in {days_since_last} days. Let's restart!")

        return insights

    def _default_response(self):
        """Return default response"""
        return {
            'pattern_type': 'No Data',
            'consistency': 0.0,
            'best_day': 'N/A',
            'worst_day': 'N/A',
            'insights': ['No completion data available yet.']
        }

    def predict_next_completion(self, completed_days):
        """
        Predict when the next completion will likely occur
        
        Args:
            completed_days: List of completion dates
        
        Returns:
            Predicted completion date
        """
        try:
            dates = self._parse_dates(completed_days)
            if len(dates) < 2:
                return (datetime.now() + timedelta(days=1)).date()

            # Calculate average gap
            gaps = []
            for i in range(1, len(dates)):
                gap = (dates[i] - dates[i-1]).days
                gaps.append(gap)

            avg_gap = np.median(gaps)  # Use median to handle outliers
            
            # Predict next completion
            next_completion = dates[-1] + timedelta(days=avg_gap)
            return next_completion.date()

        except Exception as e:
            print(f"Error predicting next completion: {e}")
            return (datetime.now() + timedelta(days=1)).date()
