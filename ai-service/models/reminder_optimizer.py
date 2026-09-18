import numpy as np
from datetime import datetime, time

class ReminderOptimizer:
    """
    Optimizes reminder times based on user's completion patterns
    """

    def __init__(self):
        self.name = "Reminder Time Optimizer"

    def optimize(self, completion_times):
        """
        Find optimal reminder time based on completion patterns
        
        Args:
            completion_times: List of times when habit was completed (e.g., ["09:30", "10:15"])
        
        Returns:
            String with optimal time in HH:MM format
        """
        try:
            if not completion_times:
                return "09:00"  # Default morning time

            # Convert times to minutes for calculation
            minutes_list = []
            for time_str in completion_times:
                try:
                    h, m = map(int, time_str.split(':'))
                    minutes_list.append(h * 60 + m)
                except:
                    continue

            if not minutes_list:
                return "09:00"

            # Calculate average time
            avg_minutes = np.mean(minutes_list)
            
            # Convert back to HH:MM format
            hours = int(avg_minutes // 60)
            minutes = int(avg_minutes % 60)
            
            return f"{hours:02d}:{minutes:02d}"

        except Exception as e:
            print(f"Error in reminder optimization: {e}")
            return "09:00"

    def get_consistency_score(self, completion_times):
        """
        Calculate consistency score based on time variations
        
        Args:
            completion_times: List of completion times
        
        Returns:
            Consistency score (0-1)
        """
        try:
            if not completion_times or len(completion_times) < 2:
                return 0.5

            # Convert to minutes
            minutes_list = []
            for time_str in completion_times:
                try:
                    h, m = map(int, time_str.split(':'))
                    minutes_list.append(h * 60 + m)
                except:
                    continue

            if len(minutes_list) < 2:
                return 0.5

            # Calculate standard deviation
            std_dev = np.std(minutes_list)
            
            # Convert to consistency score (lower std dev = higher consistency)
            # Assuming 120 minutes (2 hours) std dev = 0.5 consistency
            consistency = 1.0 - (std_dev / 240.0)
            consistency = max(0.0, min(1.0, consistency))

            return consistency

        except Exception as e:
            print(f"Error calculating consistency: {e}")
            return 0.5

    def get_best_times(self, completion_times, num_times=3):
        """
        Get the best reminder times
        
        Args:
            completion_times: List of completion times
            num_times: Number of recommended times
        
        Returns:
            List of suggested times
        """
        try:
            if not completion_times:
                return ["09:00", "12:00", "18:00"]

            # Convert to minutes
            minutes_list = []
            for time_str in completion_times:
                try:
                    h, m = map(int, time_str.split(':'))
                    minutes_list.append(h * 60 + m)
                except:
                    continue

            if not minutes_list:
                return ["09:00", "12:00", "18:00"]

            # Get optimal time
            avg_minutes = np.mean(minutes_list)
            
            # Create time windows (± 30 minutes)
            suggested_times = []
            for offset in [0, 1800, -1800]:  # 30 min intervals in seconds
                time_minutes = avg_minutes + (offset / 60)
                time_minutes = time_minutes % 1440  # 24 hours in minutes
                
                hours = int(time_minutes // 60)
                minutes = int(time_minutes % 60)
                suggested_times.append(f"{hours:02d}:{minutes:02d}")

            return suggested_times[:num_times]

        except Exception as e:
            print(f"Error in getting best times: {e}")
            return ["09:00", "12:00", "18:00"]
