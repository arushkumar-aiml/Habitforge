import numpy as np

class RecommendationEngine:
    """
    Generates personalized habit recommendations
    """

    def __init__(self):
        self.recommendations_db = {
            'Health': {
                'morning_routine': {
                    'title': 'Start a morning routine',
                    'reason': 'Morning routines boost productivity and set a positive tone for the day',
                    'habits': ['Meditation', 'Morning Exercise', 'Healthy Breakfast'],
                    'base_success_rate': 85
                },
                'fitness': {
                    'title': 'Add a fitness habit',
                    'reason': 'Regular exercise improves physical health and mental wellbeing',
                    'habits': ['Gym workout', 'Running', 'Yoga'],
                    'base_success_rate': 78
                },
                'nutrition': {
                    'title': 'Track your nutrition',
                    'reason': 'Monitoring diet leads to better health outcomes',
                    'habits': ['Water intake', 'Healthy meals', 'Meal prep'],
                    'base_success_rate': 72
                }
            },
            'Productivity': {
                'focus_time': {
                    'title': 'Schedule focus time',
                    'reason': 'Dedicated focus time dramatically improves output quality',
                    'habits': ['Deep work session', 'No phone time', 'Task completion'],
                    'base_success_rate': 82
                },
                'organization': {
                    'title': 'Organize your workspace',
                    'reason': 'A clean workspace enhances focus and reduces distractions',
                    'habits': ['Desk cleanup', 'Task planning', 'Priority setting'],
                    'base_success_rate': 75
                }
            },
            'Learning': {
                'reading': {
                    'title': 'Daily reading habit',
                    'reason': 'Reading expands knowledge and improves concentration',
                    'habits': ['Book reading', 'Article reading', 'Book summary'],
                    'base_success_rate': 78
                },
                'skill_learning': {
                    'title': 'Learn a new skill',
                    'reason': 'Continuous learning keeps your mind sharp and career relevant',
                    'habits': ['Online course', 'Coding practice', 'Language learning'],
                    'base_success_rate': 70
                }
            },
            'Mental Health': {
                'meditation': {
                    'title': 'Daily meditation',
                    'reason': 'Meditation reduces stress and improves emotional resilience',
                    'habits': ['Guided meditation', 'Breathing exercises', 'Mindfulness'],
                    'base_success_rate': 76
                },
                'journaling': {
                    'title': 'Daily journaling',
                    'reason': 'Writing about your day improves self-awareness',
                    'habits': ['Gratitude journaling', 'Reflection', 'Goal tracking'],
                    'base_success_rate': 74
                }
            },
            'Social': {
                'connections': {
                    'title': 'Strengthen connections',
                    'reason': 'Social connections are vital for wellbeing',
                    'habits': ['Call a friend', 'Family time', 'Group activities'],
                    'base_success_rate': 72
                }
            }
        }

    def generate(self, habits, goals):
        """
        Generate personalized recommendations
        
        Args:
            habits: List of user's existing habits
            goals: String describing user's goals
        
        Returns:
            List of recommendation dictionaries
        """
        try:
            recommendations = []

            # Analyze existing habits
            existing_categories = self._extract_categories(habits)

            # Find gaps
            all_categories = set(self.recommendations_db.keys())
            missing_categories = all_categories - existing_categories

            # Generate recommendations from missing categories
            for category in missing_categories:
                for rec_key, rec_data in self.recommendations_db[category].items():
                    rec = {
                        'title': rec_data['title'],
                        'reason': rec_data['reason'],
                        'habits': rec_data['habits'],
                        'successRate': rec_data['base_success_rate'],
                        'category': category
                    }
                    recommendations.append(rec)

            # Sort by success rate
            recommendations.sort(
                key=lambda x: x['successRate'],
                reverse=True
            )

            # Return top recommendations
            return recommendations[:5]

        except Exception as e:
            print(f"Error generating recommendations: {e}")
            return self._get_default_recommendations()

    def _extract_categories(self, habits):
        """Extract categories from existing habits"""
        categories = set()

        for habit in habits:
            category = habit.get('category', '').lower()
            
            if 'health' in category or 'fitness' in category or 'exercise' in category:
                categories.add('Health')
            elif 'productivity' in category or 'work' in category or 'focus' in category:
                categories.add('Productivity')
            elif 'learning' in category or 'reading' in category or 'course' in category:
                categories.add('Learning')
            elif 'mental' in category or 'meditation' in category or 'mindfulness' in category:
                categories.add('Mental Health')
            elif 'social' in category or 'friend' in category or 'connection' in category:
                categories.add('Social')

        return categories

    def _get_default_recommendations(self):
        """Return default recommendations"""
        return [
            {
                'title': 'Start a morning routine',
                'reason': 'Morning routines set a positive tone for your day',
                'habits': ['Meditation', 'Exercise', 'Healthy Breakfast'],
                'successRate': 85,
                'category': 'Health'
            },
            {
                'title': 'Add exercise to your routine',
                'reason': 'Regular exercise improves physical and mental health',
                'habits': ['Morning Jog', 'Gym', 'Yoga'],
                'successRate': 78,
                'category': 'Health'
            },
            {
                'title': 'Schedule daily reading',
                'reason': 'Reading expands knowledge and improves focus',
                'habits': ['Book Reading', 'Article Reading'],
                'successRate': 74,
                'category': 'Learning'
            }
        ]

    def adapt_recommendation(self, recommendation, user_progress):
        """
        Adapt recommendation based on user's progress
        
        Args:
            recommendation: Original recommendation
            user_progress: User's progress data
        
        Returns:
            Adapted recommendation
        """
        try:
            success_rate = recommendation.get('successRate', 70)

            # Adjust based on user's history
            if user_progress.get('average_completion_rate', 0) > 0.8:
                success_rate += 5
            elif user_progress.get('average_completion_rate', 0) < 0.3:
                success_rate -= 10

            recommendation['successRate'] = min(100, max(0, success_rate))
            return recommendation

        except Exception as e:
            print(f"Error adapting recommendation: {e}")
            return recommendation
