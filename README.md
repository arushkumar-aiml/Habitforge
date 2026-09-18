# HabitForge - AI/ML Habit Tracking Platform

A comprehensive habit tracking application with AI/ML predictions, built with React, Node.js, and Python. Features JWT-based authentication, real-time analytics, and intelligent habit recommendations.

## 🎯 Features

- **User Authentication**: Secure JWT-based auth with password hashing
- **Habit Management**: Create, update, track, and delete habits
- **AI/ML Predictions**: 
  - Success probability prediction
  - Optimal reminder time optimization
  - Personalized habit recommendations
  - Completion pattern analysis
- **Analytics Dashboard**: Real-time habit tracking and analytics
- **Category-based Tracking**: Organize habits by categories
- **Progress Visualization**: Calendar view and progress charts

## 🏗️ Tech Stack

### Frontend
- **React 18** with React Router v6
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for HTTP requests
- **Chart.js** for visualizations
- **React Icons** for UI components

### Backend
- **Node.js & Express** for REST API
- **JWT** for authentication & security
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** configuration

### AI/ML Service
- **Python 3.8+**
- **Flask** for API server
- **Scikit-learn** for ML models
- **NumPy & Pandas** for data processing
- **Scipy** for statistical analysis

## 📁 Project Structure

```
HabitForge-AI-ML/
├── frontend/                  # React Application
│   ├── public/
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── services/         # API services
│   │   ├── store/            # State management (Zustand)
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
│
├── backend/                   # Node.js Backend
│   ├── middleware/           # Auth & validation middleware
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── habits.js        # Habit management routes
│   │   ├── predictions.js   # AI prediction routes
│   │   └── analytics.js     # Analytics routes
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env.example
│
├── ai-service/              # Python AI/ML Service
│   ├── models/              # ML Models
│   │   ├── success_predictor.py
│   │   ├── reminder_optimizer.py
│   │   ├── recommendation_engine.py
│   │   └── pattern_analyzer.py
│   ├── app.py              # Flask application
│   ├── requirements.txt
│   └── .env.example
│
└── docs/                    # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn
- pip

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Update .env with your configuration
# Set JWT_SECRET to a strong random key
JWT_SECRET=your-super-secret-key-here

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

### 2. AI/ML Service Setup

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env

# Start the AI service
python app.py
# Service runs on http://localhost:5001
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env

# Update .env with your API URLs
REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
# App runs on http://localhost:3000
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Express validator on all inputs
- **CORS Configuration**: Restricted to frontend origin
- **Helmet.js**: Security headers for Express
- **Rate Limiting**: (Ready for implementation)
- **Environment Variables**: Sensitive data in .env files

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create new habit
- `GET /api/habits/:habitId` - Get habit details
- `PUT /api/habits/:habitId` - Update habit
- `DELETE /api/habits/:habitId` - Delete habit
- `POST /api/habits/:habitId/complete` - Mark as complete

### Predictions (AI Service)
- `POST /api/predictions/success` - Predict success
- `POST /api/predictions/reminder-time` - Get optimal reminder time
- `POST /api/predictions/recommendations` - Get recommendations
- `POST /api/predictions/pattern` - Analyze pattern

### Analytics
- `GET /api/analytics/stats` - Get statistics
- `GET /api/analytics/progress` - Get progress data
- `GET /api/analytics/category` - Get category stats
- `GET /api/analytics/weekly` - Get weekly summary

## 🤖 AI/ML Models

### 1. Success Predictor
Predicts the probability of successfully completing a habit based on:
- Current streak
- Completion history
- Habit frequency
- Recent performance

### 2. Reminder Optimizer
Finds optimal reminder times using:
- Historical completion times
- Time consistency analysis
- User's active hours

### 3. Recommendation Engine
Generates personalized recommendations based on:
- Missing habit categories
- User goals
- Success rate data

### 4. Pattern Analyzer
Analyzes completion patterns:
- Consistency scoring
- Best/worst days identification
- Trend analysis
- Next completion prediction

## 📱 Frontend Components

### Pages
- **Login** - User authentication
- **Register** - New user registration
- **Dashboard** - Main habit tracking interface
- **HabitDetail** - Detailed habit view
- **Analytics** - Analytics dashboard
- **Predictions** - AI recommendations

### Components
- **HabitCard** - Habit display card
- **CreateHabitModal** - Modal for creating habits
- **Navbar** - Navigation bar
- **ProtectedRoute** - Route protection with auth

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose (when ready)
docker-compose up
```

### Environment Variables for Production

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
MONGODB_URI=<your-mongodb-uri>
FRONTEND_URL=<your-frontend-domain>
```

**AI Service (.env)**
```
PORT=5001
DEBUG=False
```

**Frontend (.env)**
```
REACT_APP_API_URL=<your-backend-url>/api
```

## 🔄 Data Flow

1. User logs in through Frontend
2. Backend validates credentials and issues JWT
3. Frontend stores JWT in localStorage
4. API requests include JWT in Authorization header
5. Backend verifies JWT for protected routes
6. AI service processes predictions asynchronously
7. Analytics calculated from habit completion data

## 🛣️ Future Enhancements

- [ ] MongoDB integration
- [ ] Advanced ML models (LSTM, etc.)
- [ ] Mobile app (React Native)
- [ ] Social features (friend sharing)
- [ ] Email notifications
- [ ] Habit templates
- [ ] Gamification system
- [ ] Dark mode
- [ ] Real-time notifications
- [ ] Habit statistics export

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

Built with ❤️ for habit tracking enthusiasts
