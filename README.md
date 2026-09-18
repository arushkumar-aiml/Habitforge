<div align="center">

# 🔥 HabitForge

### AI/ML Habit Tracking Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#)
[![Node](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-FF7A45?style=for-the-badge)](#)

Habits, tracked — and predicted before they slip.

</div>

A comprehensive habit tracking application with AI/ML predictions, built with React, Node.js, and Python. Features JWT-based authentication, real-time analytics, and intelligent habit recommendations.

---

## ✨ Features

- 🔐 **User Authentication** — Secure JWT-based auth with password hashing
- ✅ **Habit Management** — Create, update, track, and delete habits
- 🤖 **AI/ML Predictions** — success probability, optimal reminder time, personalized recommendations, completion pattern analysis
- 📊 **Analytics Dashboard** — Real-time habit tracking and analytics
- 🗂️ **Category-based Tracking** — Organize habits by categories
- 📈 **Progress Visualization** — Calendar view and progress charts

---

## 🏗️ Tech Stack

| Layer | Stack |
|---|---|
| **Frontend** | React 18, React Router v6, Tailwind CSS, Zustand, Axios, Chart.js, React Icons |
| **Backend** | Node.js, Express, JWT, bcryptjs, Express Validator, Helmet, CORS |
| **AI Service** | Python 3.8+, Flask, Scikit-learn, NumPy, Pandas, Scipy |

<details>
<summary><b>📁 Project structure</b></summary>

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
│   ├── middleware/            # Auth & validation middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── habits.js         # Habit management routes
│   │   ├── predictions.js    # AI prediction routes
│   │   └── analytics.js      # Analytics routes
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── ai-service/                # Python AI/ML Service
│   ├── models/
│   │   ├── success_predictor.py
│   │   ├── reminder_optimizer.py
│   │   ├── recommendation_engine.py
│   │   └── pattern_analyzer.py
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
└── docs/                       # Documentation
```

</details>

---

## 🚀 Quick Start

### Prerequisites
`Node.js (v16+)` · `Python (v3.8+)` · `npm or yarn` · `pip`

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Update .env — set JWT_SECRET to a strong random key
JWT_SECRET=your-super-secret-key-here

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

python app.py
# Service runs on http://localhost:5001
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env

# Update .env with your API URL
REACT_APP_API_URL=http://localhost:5000/api

npm start
# App runs on http://localhost:3000
```

---

## 🔐 Security Features

- JWT Authentication — secure token-based sessions
- Password hashing with bcryptjs
- Input validation via Express Validator
- CORS restricted to the frontend origin
- Helmet.js security headers
- Rate limiting (ready for implementation)
- Secrets kept in `.env` files

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/auth/verify` | Verify JWT token |

### Habits
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/habits` | Get all habits |
| `POST` | `/api/habits` | Create new habit |
| `GET` | `/api/habits/:habitId` | Get habit details |
| `PUT` | `/api/habits/:habitId` | Update habit |
| `DELETE` | `/api/habits/:habitId` | Delete habit |
| `POST` | `/api/habits/:habitId/complete` | Mark as complete |

### Predictions (AI Service)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/predictions/success` | Predict success |
| `POST` | `/api/predictions/reminder-time` | Get optimal reminder time |
| `POST` | `/api/predictions/recommendations` | Get recommendations |
| `POST` | `/api/predictions/pattern` | Analyze pattern |

### Analytics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/stats` | Get statistics |
| `GET` | `/api/analytics/progress` | Get progress data |
| `GET` | `/api/analytics/category` | Get category stats |
| `GET` | `/api/analytics/weekly` | Get weekly summary |

---

## 🤖 AI/ML Models

**1. Success Predictor**
Predicts the probability of successfully completing a habit based on: current streak, completion history, habit frequency, recent performance.

**2. Reminder Optimizer**
Finds optimal reminder times using: historical completion times, time consistency analysis, user's active hours.

**3. Recommendation Engine**
Generates personalized recommendations based on: missing habit categories, user goals, success rate data.

**4. Pattern Analyzer**
Analyzes completion patterns: consistency scoring, best/worst days identification, trend analysis, next completion prediction.

---

## 📱 Frontend Map

**Pages** — Login · Register · Dashboard · HabitDetail · Analytics · Predictions

**Components** — HabitCard · CreateHabitModal · Navbar · ProtectedRoute

---

## 🧪 Testing

```bash
cd backend && npm test
cd frontend && npm test
```

---

## 📦 Deployment

```bash
# Build and run with Docker Compose (when ready)
docker-compose up
```

<details>
<summary><b>Environment variables for production</b></summary>

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

</details>

---

## 🔄 Data Flow

1. User logs in through Frontend
2. Backend validates credentials and issues JWT
3. Frontend stores JWT in localStorage
4. API requests include JWT in Authorization header
5. Backend verifies JWT for protected routes
6. AI service processes predictions asynchronously
7. Analytics calculated from habit completion data

---

## 🛣️ Roadmap

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

---

## 📄 License

MIT License — free to use for personal or commercial purposes.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub.

<div align="center">

Built with ❤️ for habit tracking enthusiasts

</div>
