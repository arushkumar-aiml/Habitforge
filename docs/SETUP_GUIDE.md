# HabitForge Setup Guide

Complete step-by-step guide to set up HabitForge locally and in production.

## Prerequisites

- Node.js v16+ (for backend and frontend)
- Python 3.8+ (for AI service)
- npm or yarn
- Git

## Development Setup

### Step 1: Clone and Navigate

```bash
git clone <repository-url>
cd HabitForge-AI-ML
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your settings
# At minimum, set:
# JWT_SECRET=your-secure-random-string-here
# NODE_ENV=development
```

**Generate a secure JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the backend:
```bash
# Development mode (with nodemon)
npm run dev

# Or production mode
npm start
```

Expected output:
```
🚀 Server running on port 5000
```

### Step 3: AI/ML Service Setup

```bash
cd ../ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
```

Start the AI service:
```bash
python app.py
```

Expected output:
```
 * Running on http://0.0.0.0:5001
```

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Ensure .env contains:
# REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The app will open at http://localhost:3000

## Docker Setup (Recommended for Production)

### Prerequisites
- Docker
- Docker Compose

### Start All Services

```bash
# From project root
docker-compose up -d

# Check status
docker-compose ps
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- AI Service: http://localhost:5001
- MongoDB: localhost:27017

### Stop Services

```bash
docker-compose down

# Remove volumes (database data)
docker-compose down -v
```

## Configuration

### JWT Configuration

JWT is used for authentication. The token includes:
- User ID
- Email
- Expiration (7 days)

Example token payload:
```json
{
  "userId": "1234567890",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Database Configuration

**Development (In-Memory)**
- Uses in-memory storage for quick setup
- Data is lost on restart

**Production (MongoDB)**
Update `.env`:
```
MONGODB_URI=mongodb://username:password@host:port/habitforge
```

### CORS Configuration

The backend is configured to accept requests from:
- Frontend: http://localhost:3000 (development)
- Specific domains in production

Update `backend/server.js` for production domains:
```javascript
cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
})
```

## Testing the API

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Create Habit (requires token):**
```bash
curl -X POST http://localhost:5000/api/habits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Morning Exercise",
    "category": "Health",
    "frequency": "daily",
    "description": "30 minutes of morning workout"
  }'
```

### Using Postman

1. Import API collection from `docs/postman-collection.json`
2. Set environment variable `{{BASE_URL}}` to `http://localhost:5000`
3. Set `{{TOKEN}}` with your JWT token
4. Test endpoints

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Frontend Can't Connect to Backend

Check if backend is running and accessible:
```bash
curl http://localhost:5000/health
```

Update `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### AI Service Not Available

Verify Python is installed:
```bash
python --version  # Should be 3.8+
```

Check if service is running:
```bash
curl http://localhost:5001/health
```

### Database Connection Issues

For MongoDB, verify connection string:
```bash
# Test connection
mongo mongodb://username:password@localhost:27017/habitforge
```

## Performance Optimization

### Backend
- Use connection pooling for database
- Enable gzip compression
- Implement caching strategy
- Use clustering for multiple cores

### Frontend
- Code splitting
- Lazy loading components
- Image optimization
- Bundle size monitoring

### AI Service
- Cache model predictions
- Batch process requests
- Optimize ML algorithms

## Security Checklist

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Set NODE_ENV to production
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Set secure CORS origins
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement input validation
- [ ] Add request logging
- [ ] Set up error monitoring

## Deployment Checklist

Before deploying to production:

1. **Security**
   - [ ] Change all default credentials
   - [ ] Set production environment variables
   - [ ] Enable HTTPS/SSL
   - [ ] Configure firewall rules

2. **Performance**
   - [ ] Enable database indexing
   - [ ] Configure caching
   - [ ] Use CDN for static files
   - [ ] Set up load balancing

3. **Monitoring**
   - [ ] Set up error tracking (Sentry, etc.)
   - [ ] Configure logging
   - [ ] Set up health checks
   - [ ] Monitor resource usage

4. **Backup**
   - [ ] Set up database backups
   - [ ] Test restore procedures
   - [ ] Document recovery steps

## Common Commands

```bash
# Development
npm run dev              # Backend
python app.py          # AI Service
npm start              # Frontend

# Production
npm start              # Backend
npm run build && npm start  # Frontend
python app.py          # AI Service

# Database
mongo                  # Connect to MongoDB
db.habits.find()      # Query habits collection

# Docker
docker-compose up     # Start all services
docker-compose down   # Stop all services
docker-compose logs   # View service logs
```

## Next Steps

1. Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints
2. Check [ML_MODELS.md](./ML_MODELS.md) for AI/ML model details
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design

---

For issues or questions, refer to the main README.md or create an issue on GitHub.
