/**
 * HabitForge - AI/ML Habit Tracking Platform
 * ---------------------------------------------
 * Project metadata, structured in JavaScript instead of Markdown.
 * Import this file anywhere you need to render docs, an "About" page,
 * or feed structured content into a UI component.
 */

const habitForge = {
  name: "HabitForge",
  tagline: "AI/ML Habit Tracking Platform",
  description:
    "A comprehensive habit tracking application with AI/ML predictions, built with React, Node.js, and Python. Features JWT-based authentication, real-time analytics, and intelligent habit recommendations.",

  features: [
    "User Authentication: Secure JWT-based auth with password hashing",
    "Habit Management: Create, update, track, and delete habits",
    "AI/ML Predictions: success probability, optimal reminder time, personalized recommendations, completion pattern analysis",
    "Analytics Dashboard: Real-time habit tracking and analytics",
    "Category-based Tracking: Organize habits by categories",
    "Progress Visualization: Calendar view and progress charts",
  ],

  techStack: {
    frontend: [
      "React 18 with React Router v6",
      "Tailwind CSS for styling",
      "Zustand for state management",
      "Axios for HTTP requests",
      "Chart.js for visualizations",
      "React Icons for UI components",
    ],
    backend: [
      "Node.js & Express for REST API",
      "JWT for authentication & security",
      "bcryptjs for password hashing",
      "Express Validator for input validation",
      "Helmet for security headers",
      "CORS configuration",
    ],
    aiService: [
      "Python 3.8+",
      "Flask for API server",
      "Scikit-learn for ML models",
      "NumPy & Pandas for data processing",
      "Scipy for statistical analysis",
    ],
  },

  projectStructure: `
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
`,

  prerequisites: ["Node.js (v16+)", "Python (v3.8+)", "npm or yarn", "pip"],

  quickStart: {
    backend: {
      title: "1. Backend Setup",
      commands: [
        "cd backend",
        "npm install",
        "cp .env.example .env",
        "# Update .env with your configuration",
        "# Set JWT_SECRET to a strong random key",
        "JWT_SECRET=your-super-secret-key-here",
        "npm run dev",
        "# Server runs on http://localhost:5000",
      ],
    },
    aiService: {
      title: "2. AI/ML Service Setup",
      commands: [
        "cd ai-service",
        "python -m venv venv",
        "source venv/bin/activate  # On Windows: venv\\Scripts\\activate",
        "pip install -r requirements.txt",
        "cp .env.example .env",
        "python app.py",
        "# Service runs on http://localhost:5001",
      ],
    },
    frontend: {
      title: "3. Frontend Setup",
      commands: [
        "cd frontend",
        "npm install",
        "cp .env.example .env",
        "# Update .env with your API URLs",
        "REACT_APP_API_URL=http://localhost:5000/api",
        "npm start",
        "# App runs on http://localhost:3000",
      ],
    },
  },

  securityFeatures: [
    "JWT Authentication: Secure token-based authentication",
    "Password Hashing: bcryptjs with salt rounds",
    "Input Validation: Express validator on all inputs",
    "CORS Configuration: Restricted to frontend origin",
    "Helmet.js: Security headers for Express",
    "Rate Limiting: (Ready for implementation)",
    "Environment Variables: Sensitive data in .env files",
  ],

  apiEndpoints: {
    authentication: [
      { method: "POST", path: "/api/auth/register", description: "Register new user" },
      { method: "POST", path: "/api/auth/login", description: "Login user" },
      { method: "GET", path: "/api/auth/verify", description: "Verify JWT token" },
    ],
    habits: [
      { method: "GET", path: "/api/habits", description: "Get all habits" },
      { method: "POST", path: "/api/habits", description: "Create new habit" },
      { method: "GET", path: "/api/habits/:habitId", description: "Get habit details" },
      { method: "PUT", path: "/api/habits/:habitId", description: "Update habit" },
      { method: "DELETE", path: "/api/habits/:habitId", description: "Delete habit" },
      { method: "POST", path: "/api/habits/:habitId/complete", description: "Mark as complete" },
    ],
    predictions: [
      { method: "POST", path: "/api/predictions/success", description: "Predict success" },
      { method: "POST", path: "/api/predictions/reminder-time", description: "Get optimal reminder time" },
      { method: "POST", path: "/api/predictions/recommendations", description: "Get recommendations" },
      { method: "POST", path: "/api/predictions/pattern", description: "Analyze pattern" },
    ],
    analytics: [
      { method: "GET", path: "/api/analytics/stats", description: "Get statistics" },
      { method: "GET", path: "/api/analytics/progress", description: "Get progress data" },
      { method: "GET", path: "/api/analytics/category", description: "Get category stats" },
      { method: "GET", path: "/api/analytics/weekly", description: "Get weekly summary" },
    ],
  },

  aiModels: [
    {
      name: "Success Predictor",
      description: "Predicts the probability of successfully completing a habit based on:",
      factors: ["Current streak", "Completion history", "Habit frequency", "Recent performance"],
    },
    {
      name: "Reminder Optimizer",
      description: "Finds optimal reminder times using:",
      factors: ["Historical completion times", "Time consistency analysis", "User's active hours"],
    },
    {
      name: "Recommendation Engine",
      description: "Generates personalized recommendations based on:",
      factors: ["Missing habit categories", "User goals", "Success rate data"],
    },
    {
      name: "Pattern Analyzer",
      description: "Analyzes completion patterns:",
      factors: ["Consistency scoring", "Best/worst days identification", "Trend analysis", "Next completion prediction"],
    },
  ],

  frontendComponents: {
    pages: [
      { name: "Login", description: "User authentication" },
      { name: "Register", description: "New user registration" },
      { name: "Dashboard", description: "Main habit tracking interface" },
      { name: "HabitDetail", description: "Detailed habit view" },
      { name: "Analytics", description: "Analytics dashboard" },
      { name: "Predictions", description: "AI recommendations" },
    ],
    components: [
      { name: "HabitCard", description: "Habit display card" },
      { name: "CreateHabitModal", description: "Modal for creating habits" },
      { name: "Navbar", description: "Navigation bar" },
      { name: "ProtectedRoute", description: "Route protection with auth" },
    ],
  },

  testing: {
    backend: ["cd backend", "npm test"],
    frontend: ["cd frontend", "npm test"],
  },

  deployment: {
    docker: ["# Build and run with Docker Compose (when ready)", "docker-compose up"],
    envVars: {
      backend: {
        PORT: 5000,
        NODE_ENV: "production",
        JWT_SECRET: "<strong-random-secret>",
        MONGODB_URI: "<your-mongodb-uri>",
        FRONTEND_URL: "<your-frontend-domain>",
      },
      aiService: {
        PORT: 5001,
        DEBUG: false,
      },
      frontend: {
        REACT_APP_API_URL: "<your-backend-url>/api",
      },
    },
  },

  dataFlow: [
    "User logs in through Frontend",
    "Backend validates credentials and issues JWT",
    "Frontend stores JWT in localStorage",
    "API requests include JWT in Authorization header",
    "Backend verifies JWT for protected routes",
    "AI service processes predictions asynchronously",
    "Analytics calculated from habit completion data",
  ],

  futureEnhancements: [
    { done: false, task: "MongoDB integration" },
    { done: false, task: "Advanced ML models (LSTM, etc.)" },
    { done: false, task: "Mobile app (React Native)" },
    { done: false, task: "Social features (friend sharing)" },
    { done: false, task: "Email notifications" },
    { done: false, task: "Habit templates" },
    { done: false, task: "Gamification system" },
    { done: false, task: "Dark mode" },
    { done: false, task: "Real-time notifications" },
    { done: false, task: "Habit statistics export" },
  ],

  license: "MIT License - feel free to use this project for personal or commercial purposes.",
  contributing: "Contributions are welcome! Please feel free to submit a Pull Request.",
  support: "For issues, feature requests, or questions, please open an issue on GitHub.",
};

module.exports = habitForge;
// For ES module usage instead, replace the line above with:
// export default habitForge;
