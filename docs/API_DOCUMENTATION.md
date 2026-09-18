# HabitForge API Documentation

Complete API reference for HabitForge backend and AI services.

## Base URLs

- Backend: `http://localhost:5000`
- AI Service: `http://localhost:5001`
- Frontend: `http://localhost:3000`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

The JWT token is obtained after successful login and is valid for 7 days.

## Response Format

All responses are in JSON format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "error code"
}
```

## Authentication Endpoints

### Register User
- **Endpoint:** `POST /api/auth/register`
- **Authentication:** None
- **Description:** Register a new user account
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "userId": "1234567890",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 409 (Conflict)

### Login
- **Endpoint:** `POST /api/auth/login`
- **Authentication:** None
- **Description:** Authenticate user and get JWT token
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "userId": "1234567890",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 400 (Bad Request)

### Verify Token
- **Endpoint:** `GET /api/auth/verify`
- **Authentication:** Required
- **Description:** Verify if token is valid
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "userId": "1234567890",
      "email": "john@example.com"
    }
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized)

## Habit Endpoints

### Get All Habits
- **Endpoint:** `GET /api/habits`
- **Authentication:** Required
- **Description:** Retrieve all habits for the logged-in user
- **Query Parameters:** None
- **Response:**
  ```json
  {
    "success": true,
    "habits": [
      {
        "habitId": "123",
        "userId": "user123",
        "name": "Morning Exercise",
        "description": "30 minutes workout",
        "category": "Health",
        "frequency": "daily",
        "goal": "30",
        "streak": 5,
        "completedDays": ["2024-09-01", "2024-09-02"],
        "createdAt": "2024-09-01T10:00:00Z"
      }
    ],
    "total": 1
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized)

### Create Habit
- **Endpoint:** `POST /api/habits`
- **Authentication:** Required
- **Description:** Create a new habit
- **Request Body:**
  ```json
  {
    "name": "Morning Exercise",
    "description": "30 minutes of morning workout",
    "category": "Health",
    "frequency": "daily",
    "goal": "30"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Habit created successfully",
    "habit": {
      "habitId": "123",
      "userId": "user123",
      "name": "Morning Exercise",
      "category": "Health",
      "frequency": "daily",
      "streak": 0,
      "completedDays": [],
      "createdAt": "2024-09-18T10:00:00Z"
    }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized)

### Get Habit Details
- **Endpoint:** `GET /api/habits/:habitId`
- **Authentication:** Required
- **Description:** Get detailed information about a specific habit
- **Path Parameters:** habitId (string)
- **Response:**
  ```json
  {
    "success": true,
    "habit": {
      "habitId": "123",
      "name": "Morning Exercise",
      "category": "Health",
      "frequency": "daily",
      "streak": 5,
      "completedDays": ["2024-09-01", "2024-09-02"]
    }
  }
  ```
- **Status Codes:** 200 (OK), 404 (Not Found), 401 (Unauthorized)

### Update Habit
- **Endpoint:** `PUT /api/habits/:habitId`
- **Authentication:** Required
- **Description:** Update habit details
- **Path Parameters:** habitId (string)
- **Request Body:** (All fields optional)
  ```json
  {
    "name": "Evening Exercise",
    "description": "Updated description",
    "category": "Fitness",
    "frequency": "daily",
    "goal": "45"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Habit updated successfully",
    "habit": { /* Updated habit object */ }
  }
  ```
- **Status Codes:** 200 (OK), 404 (Not Found), 401 (Unauthorized)

### Mark Habit as Complete
- **Endpoint:** `POST /api/habits/:habitId/complete`
- **Authentication:** Required
- **Description:** Mark habit as completed for today
- **Path Parameters:** habitId (string)
- **Request Body:** (Empty)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Habit marked as completed",
    "habit": {
      "habitId": "123",
      "streak": 6,
      "completedDays": ["2024-09-01", "2024-09-02", "2024-09-03"]
    }
  }
  ```
- **Status Codes:** 200 (OK), 404 (Not Found), 401 (Unauthorized)

### Delete Habit
- **Endpoint:** `DELETE /api/habits/:habitId`
- **Authentication:** Required
- **Description:** Delete a habit
- **Path Parameters:** habitId (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Habit deleted successfully"
  }
  ```
- **Status Codes:** 200 (OK), 404 (Not Found), 401 (Unauthorized)

## Predictions Endpoints

### Predict Success Probability
- **Endpoint:** `POST /api/predictions/success`
- **Authentication:** Required
- **Description:** Predict success probability of a habit
- **Request Body:**
  ```json
  {
    "habitId": "123",
    "completedDays": ["2024-09-01", "2024-09-02"],
    "streak": 5,
    "frequency": "daily"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "prediction": {
      "habitId": "123",
      "successProbability": 0.85,
      "recommendation": "Excellent! You're on a great streak (5 days). Keep it up! 🚀",
      "confidence": 0.92
    }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request)

### Get Optimal Reminder Time
- **Endpoint:** `POST /api/predictions/reminder-time`
- **Authentication:** Required
- **Description:** Get optimal reminder time based on completion patterns
- **Request Body:**
  ```json
  {
    "habitId": "123",
    "completionTimes": ["09:30", "10:15", "09:45"]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "optimalTime": "09:50",
    "consistency": 0.87
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request)

### Get Recommendations
- **Endpoint:** `POST /api/predictions/recommendations`
- **Authentication:** Required
- **Description:** Get personalized habit recommendations
- **Request Body:**
  ```json
  {
    "habits": [ /* Array of user's habits */ ],
    "goals": "Improve overall health and productivity"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "recommendations": [
      {
        "title": "Start a morning routine",
        "reason": "Morning routines boost productivity",
        "habits": ["Meditation", "Exercise", "Breakfast"],
        "successRate": 85
      }
    ],
    "totalRecommendations": 5
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request)

### Analyze Habit Pattern
- **Endpoint:** `POST /api/predictions/pattern`
- **Authentication:** Required
- **Description:** Analyze completion patterns
- **Request Body:**
  ```json
  {
    "completedDays": ["2024-09-01", "2024-09-02", "2024-09-03"],
    "frequency": "daily"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "pattern": {
      "pattern": "Consistent Daily",
      "consistency": 0.89,
      "bestDay": "Wednesday",
      "worstDay": "Sunday",
      "insights": [
        "Great consistency! You're following the consistent daily pattern.",
        "You completed the habit today. Excellent!"
      ]
    }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request)

## Analytics Endpoints

### Get Statistics
- **Endpoint:** `GET /api/analytics/stats`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "stats": {
      "totalHabits": 5,
      "activeHabits": 3,
      "completedToday": 2,
      "averageStreak": 15,
      "bestStreak": 45,
      "successRate": 78.5
    }
  }
  ```

### Get Progress Data
- **Endpoint:** `GET /api/analytics/progress?habitId=123&days=30`
- **Authentication:** Required
- **Query Parameters:**
  - habitId (string): Habit ID
  - days (number): Number of days to retrieve
- **Response:**
  ```json
  {
    "success": true,
    "habitId": "123",
    "period": 30,
    "progress": [
      { "date": "2024-08-20", "completed": true },
      { "date": "2024-08-21", "completed": false }
    ]
  }
  ```

### Get Category Statistics
- **Endpoint:** `GET /api/analytics/category`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "categoryStats": {
      "Health": {
        "total": 5,
        "completed": 4,
        "percentage": 80
      }
    }
  }
  ```

### Get Weekly Summary
- **Endpoint:** `GET /api/analytics/weekly`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "weeklySummary": {
      "week": "Sep 11 - Sep 17, 2024",
      "totalHabits": 8,
      "completionRate": 75,
      "bestDay": "Wednesday",
      "habits": [
        { "name": "Morning Exercise", "completions": 5 }
      ]
    }
  }
  ```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server error |

## Rate Limiting

Planned implementation - currently no rate limiting.

## CORS

The backend is configured to accept requests from:
- Development: `http://localhost:3000`
- Production: Configured in `.env`

## Best Practices

1. **Always include the JWT token** in the Authorization header for protected endpoints
2. **Use HTTPS** in production
3. **Handle errors gracefully** in your frontend
4. **Cache responses** where appropriate
5. **Implement retry logic** for failed requests
6. **Log API errors** for debugging
7. **Validate input** before sending to the API

---

For more information, refer to [SETUP_GUIDE.md](./SETUP_GUIDE.md)
