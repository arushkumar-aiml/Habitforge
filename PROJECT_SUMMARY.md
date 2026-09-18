# HabitForge - Project Summary & Quick Reference

## 🎯 Project Overview

HabitForge is a comprehensive AI/ML-powered habit tracking platform built with modern web technologies. It helps users build and maintain healthy habits with intelligent predictions and recommendations.

## 📦 What You Get

This complete project includes:

1. **Frontend (React 18)** - Beautiful UI for habit tracking
2. **Backend (Node.js + Express)** - Secure REST API with JWT auth
3. **AI/ML Service (Python + Flask)** - Intelligent predictions and recommendations
4. **Documentation** - Complete setup and API guides
5. **Docker Setup** - Easy deployment with Docker Compose

## 🚀 Quick Start (3 Steps)

### 1. Backend
```bash
cd backend
npm install
npm run dev
```

### 2. AI Service
```bash
cd ai-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
```

✅ All running on: http://localhost:3000

## 📋 Project Structure

```
HabitForge-AI-ML/
├── backend/           # Node.js REST API
├── frontend/          # React app
├── ai-service/        # Python ML models
├── docs/              # Documentation
└── README.md          # Main guide
```

## 🔐 Security Features

- ✅ JWT authentication (7-day expiry)
- ✅ Password hashing with bcryptjs
- ✅ Input validation on all endpoints
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Environment variables for secrets

## 🤖 AI/ML Capabilities

| Model | Purpose |
|-------|---------|
| Success Predictor | Predicts habit completion probability |
| Reminder Optimizer | Finds optimal reminder times |
| Recommendation Engine | Suggests new habits to add |
| Pattern Analyzer | Analyzes completion patterns |

## 📊 Key Features

### User Features
- ✅ Create, update, delete habits
- ✅ Track daily completions
- ✅ View success statistics
- ✅ Get AI recommendations
- ✅ Analyze patterns and trends

### Admin Features
- ✅ User analytics
- ✅ Habit performance tracking
- ✅ System monitoring

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register       - Create account
POST   /api/auth/login          - Login user
GET    /api/auth/verify         - Verify token
```

### Habits
```
GET    /api/habits              - Get all habits
POST   /api/habits              - Create habit
GET    /api/habits/:id          - Get habit details
PUT    /api/habits/:id          - Update habit
DELETE /api/habits/:id          - Delete habit
POST   /api/habits/:id/complete - Mark complete
```

### Predictions (AI Service)
```
POST   /api/predictions/success        - Predict success
POST   /api/predictions/reminder-time  - Get reminder time
POST   /api/predictions/recommendations - Get suggestions
POST   /api/predictions/pattern        - Analyze pattern
```

### Analytics
```
GET    /api/analytics/stats     - Get statistics
GET    /api/analytics/progress  - Get progress data
GET    /api/analytics/category  - Category stats
GET    /api/analytics/weekly    - Weekly summary
```

## 🛠️ Technology Stack

**Frontend**
- React 18
- React Router v6
- Zustand (state management)
- Tailwind CSS
- Axios
- React Icons

**Backend**
- Node.js
- Express
- JWT
- bcryptjs
- MongoDB (ready)
- Helmet
- CORS

**AI/ML Service**
- Python 3.8+
- Flask
- Scikit-learn
- NumPy/Pandas
- Scipy

**DevOps**
- Docker
- Docker Compose
- Environmental configuration

## 📈 Usage Example

```javascript
// 1. Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}

// 2. Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure123"
}
// Receive: { token: "eyJ..." }

// 3. Create Habit
POST /api/habits (with Authorization header)
{
  "name": "Morning Run",
  "category": "Fitness",
  "frequency": "daily"
}

// 4. Mark Complete
POST /api/habits/123/complete

// 5. Get Prediction
POST /api/predictions/success
{
  "habitId": "123",
  "streak": 5,
  "completedDays": ["2024-09-01", "2024-09-02"]
}
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove all data
docker-compose down -v
```

## 📚 Documentation Files

- `README.md` - Main project guide
- `docs/SETUP_GUIDE.md` - Detailed setup instructions
- `docs/API_DOCUMENTATION.md` - Complete API reference
- `.env.example` - Environment configuration template

## 🔑 Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/habitforge
FRONTEND_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:5001
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AI_SERVICE_URL=http://localhost:5001/api
```

**AI Service (.env)**
```
PORT=5001
DEBUG=True
```

## 💡 Key Implementation Details

### JWT Flow
1. User registers/logs in
2. Backend generates JWT token
3. Frontend stores token in localStorage
4. All requests include token in Authorization header
5. Backend verifies token for protected routes

### Habit Tracking
1. User creates habit with category and frequency
2. User marks habit as complete daily
3. System tracks streak and completion dates
4. AI models analyze patterns
5. Recommendations generated based on data

### ML Predictions
1. Features extracted from habit history
2. Models process features
3. Predictions returned with confidence scores
4. Results cached for performance
5. Insights displayed to user

## 🚢 Deployment Ready

This project is production-ready with:
- ✅ Error handling
- ✅ Security best practices
- ✅ Input validation
- ✅ Logging
- ✅ Environment configuration
- ✅ Docker support
- ✅ API documentation
- ✅ Performance optimization

## 📞 Common Issues & Solutions

**Port already in use**
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection**
```bash
# Verify connection
mongo mongodb://localhost:27017/habitforge
```

**CORS errors**
```javascript
// Update CORS in backend/server.js
cors({ origin: 'your-domain.com' })
```

## 🎓 Learning Resources

- JWT: https://jwt.io
- React: https://react.dev
- Express: https://expressjs.com
- Flask: https://flask.palletsprojects.com
- Scikit-learn: https://scikit-learn.org

## ✨ Future Enhancements

- [ ] Real MongoDB integration
- [ ] Advanced ML models (LSTM)
- [ ] Mobile app (React Native)
- [ ] Social features
- [ ] Email notifications
- [ ] Habit templates
- [ ] Gamification
- [ ] Real-time notifications
- [ ] Dark mode
- [ ] Analytics export

## 📄 License

MIT License - Free for personal and commercial use

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

- GitHub Issues: Report bugs
- Documentation: Check docs/ folder
- README: Main reference guide

---

## Quick Checklist for Getting Started

- [ ] Clone/extract the project
- [ ] Install dependencies (npm install, pip install)
- [ ] Copy .env.example to .env
- [ ] Start backend (npm run dev)
- [ ] Start AI service (python app.py)
- [ ] Start frontend (npm start)
- [ ] Open http://localhost:3000
- [ ] Register and test the app

---

**Built with ❤️ for habit enthusiasts**

Questions? Check the documentation or open an issue!
