# ⚡ Quick Start Guide

Get the Job Portal Analytics Dashboard running in 5 minutes.

## Prerequisites
- Python 3.8+
- Node.js 16+
- Git

## 🚀 Local Development

### Terminal 1: Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
✅ Backend running at http://localhost:8000

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running at http://localhost:5173

### Access the Application
- **Dashboard:** http://localhost:5173
- **API Docs:** http://localhost:8000/docs
- **API Status:** http://localhost:8000

## 📊 What You'll See

1. **Dashboard Tab**
   - Real-time job metrics
   - 30-day market trends
   - Market distribution charts

2. **Trending Roles**
   - Top 5 job roles by search volume
   - Growth percentages
   - Salary ranges

3. **Salary Insights**
   - Compensation by experience level
   - Role comparisons
   - Market demand indicators

4. **Search Analytics**
   - Total searches and keywords
   - Location distribution
   - Top searched roles

## 🐳 Using Docker

```bash
docker-compose up -d
```

All services will be running:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL on 5432

## 📝 Project Structure

```
.
├── backend/              # FastAPI application
│   ├── main.py          # API endpoints
│   └── requirements.txt  # Dependencies
├── frontend/            # React application
│   ├── src/
│   │   ├── App.jsx      # Main app
│   │   └── components/  # Dashboard components
│   └── package.json
├── README.md            # Full documentation
└── DEPLOYMENT_GUIDE.md  # Production deployment
```

## 🎯 Next Steps

1. Explore the API at `/docs`
2. Check git commit history
3. Deploy to production using DEPLOYMENT_GUIDE.md
4. Add to your portfolio

## 📞 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**npm dependencies error?**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend connection error?**
- Check if backend is running on http://localhost:8000
- Check browser console for CORS errors
- Verify VITE_API_URL is correct

---

Ready? Start with `npm run dev` in the frontend folder! 🚀
