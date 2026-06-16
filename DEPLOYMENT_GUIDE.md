# 🚀 Deployment Guide

Deploy the Job Portal Analytics Dashboard to production in minutes.

## Option 1: Deploy Backend to Railway (Recommended)

Railway makes backend deployment effortless with automatic scaling.

### Prerequisites
- GitHub account with your repo pushed
- Railway account (free tier available)

### Steps

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Authorize and select your repository

2. **Configure Environment**
   ```
   PYTHON_VERSION=3.11
   DATABASE_URL=postgresql://...
   ```

3. **Deploy**
   - Railway auto-deploys on git push
   - Your backend URL: `https://yourdomain.railway.app`

## Option 2: Deploy Backend to Render

### Steps

1. **Create render.yaml**
   ```yaml
   services:
     - type: web
       name: job-portal-api
       env: python
       plan: free
       startCommand: "uvicorn backend.main:app --host 0.0.0.0"
       envVars:
         - key: DATABASE_URL
           scope: build
   ```

2. **Push to GitHub**
3. **Deploy on Render**
   - Connect GitHub repository
   - Select `render.yaml`
   - Click Deploy

## Option 3: Deploy Frontend to Vercel

Vercel specializes in React applications with instant deployments.

### Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment**
   - Set `VITE_API_URL` to your backend URL
   - Example: `https://yourdomain.railway.app`

4. **Auto-Deploy**
   - Connect GitHub repository
   - Vercel auto-deploys on every push

## Docker Deployment

### Build and Run Locally

```bash
docker-compose up -d
```

Accessible at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

### Push to Docker Hub

```bash
docker build -t yourusername/job-portal-backend ./backend
docker push yourusername/job-portal-backend

docker build -t yourusername/job-portal-frontend ./frontend
docker push yourusername/job-portal-frontend
```

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] CORS configured properly
- [ ] Environment variables set
- [ ] Database configured
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Error logging configured
- [ ] Performance optimized
- [ ] Domain registered

## Live Demo URLs

**Backend API:** `https://job-portal-api.railway.app`
**Frontend:** `https://job-portal-analytics.vercel.app`
**API Documentation:** `https://job-portal-api.railway.app/docs`

## Troubleshooting

### CORS Issues
- Backend CORS is configured for `*` (update in production)
- Set `FRONTEND_URL` env variable for specific domain

### API Not Connecting
- Check `VITE_API_URL` in frontend environment
- Verify backend is running
- Check browser console for errors

### Database Connection
- Ensure `DATABASE_URL` is correct
- Verify PostgreSQL is running
- Check connection pool settings

## Performance Optimization

1. **Frontend**
   - Run `npm run build` for production
   - Enable gzip compression
   - Use CDN for static assets

2. **Backend**
   - Enable Redis caching
   - Implement database query optimization
   - Use connection pooling

3. **Infrastructure**
   - Setup load balancing
   - Enable auto-scaling
   - Configure monitoring

## Security in Production

- [ ] Use HTTPS/SSL
- [ ] Set secure CORS origins
- [ ] Implement rate limiting
- [ ] Add API authentication
- [ ] Use environment variables for secrets
- [ ] Enable CSRF protection
- [ ] Setup Web Application Firewall

---

**Deployment status:** Ready for production ✅
