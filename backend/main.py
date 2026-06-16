"""
Job Portal Analytics Dashboard - FastAPI Backend
Tracks real-time job market trends, salary data, and job search patterns
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
from datetime import datetime, timedelta
import random

app = FastAPI(
    title="Job Portal Analytics API",
    description="Real-time job market analytics and salary insights",
    version="1.0.0"
)

# CORS configuration for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== Data Models =====================

class JobListing(BaseModel):
    job_id: str
    title: str
    company: str
    location: str
    salary_min: int
    salary_max: int
    experience_required: str
    job_type: str
    posted_date: str

class SalaryInsight(BaseModel):
    role: str
    experience_level: str
    avg_salary: int
    salary_min: int
    salary_max: int
    market_demand: str
    job_count: int

class TrendingRole(BaseModel):
    role: str
    search_count: int
    growth_percentage: float
    avg_salary: int
    top_companies: List[str]

class SearchAnalytics(BaseModel):
    total_searches: int
    trending_keywords: List[str]
    top_locations: List[dict]
    top_roles: List[dict]

# ===================== Mock Data (Simulating Real Data) =====================

JOBS_DATA = [
    {"title": "Python Developer", "company": "TechCorp", "location": "Bangalore", "salary_min": 500000, "salary_max": 1000000, "exp": "1-3 years"},
    {"title": "Full Stack Engineer", "company": "StartupXYZ", "location": "Mumbai", "salary_min": 600000, "salary_max": 1200000, "exp": "2-4 years"},
    {"title": "Data Scientist", "company": "DataCo", "location": "Bangalore", "salary_min": 800000, "salary_max": 1500000, "exp": "3-5 years"},
    {"title": "DevOps Engineer", "company": "CloudNet", "location": "Hyderabad", "salary_min": 700000, "salary_max": 1400000, "exp": "2-4 years"},
    {"title": "Frontend Developer", "company": "WebStudio", "location": "Pune", "salary_min": 450000, "salary_max": 900000, "exp": "1-3 years"},
    {"title": "Backend Developer", "company": "ApiWorks", "location": "Bangalore", "salary_min": 550000, "salary_max": 1100000, "exp": "2-4 years"},
    {"title": "AI/ML Engineer", "company": "AILabs", "location": "Bangalore", "salary_min": 1000000, "salary_max": 2000000, "exp": "3-6 years"},
    {"title": "Mobile Developer", "company": "AppStudio", "location": "Delhi", "salary_min": 500000, "salary_max": 1000000, "exp": "2-4 years"},
]

ROLES = ["Python Developer", "Full Stack Engineer", "Data Scientist", "DevOps Engineer", "Frontend Developer", "Backend Developer", "AI/ML Engineer", "Mobile Developer"]
LOCATIONS = ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Delhi", "Gurgaon", "Noida", "Chennai"]
COMPANIES = ["TechCorp", "StartupXYZ", "DataCo", "CloudNet", "WebStudio", "ApiWorks", "AILabs", "AppStudio", "Google", "Amazon", "Microsoft", "Meta"]

# ===================== Endpoints =====================

@app.get("/")
async def root():
    """Root endpoint - API status"""
    return {
        "status": "running",
        "name": "Job Portal Analytics API",
        "version": "1.0.0",
        "endpoints": {
            "dashboard": "/api/dashboard",
            "trending_roles": "/api/trending-roles",
            "salary_insights": "/api/salary-insights",
            "search_analytics": "/api/search-analytics",
            "jobs_by_location": "/api/jobs/{location}",
            "market_trends": "/api/market-trends"
        }
    }

@app.get("/api/dashboard")
async def get_dashboard():
    """Main dashboard metrics"""
    total_jobs = len(JOBS_DATA) * random.randint(5, 20)
    new_jobs_today = random.randint(50, 150)
    avg_salary = 800000
    companies_hiring = len(COMPANIES)
    
    return {
        "total_jobs_available": total_jobs,
        "new_jobs_today": new_jobs_today,
        "avg_salary_offered": avg_salary,
        "companies_actively_hiring": companies_hiring,
        "job_seekers_active": random.randint(5000, 15000),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/trending-roles")
async def get_trending_roles() -> List[TrendingRole]:
    """Get top trending job roles in the market"""
    trending = []
    for i, role in enumerate(ROLES[:5]):
        trending.append({
            "role": role,
            "search_count": random.randint(1000, 5000),
            "growth_percentage": round(random.uniform(5, 45), 2),
            "avg_salary": random.randint(600000, 1500000),
            "top_companies": random.sample(COMPANIES, 3)
        })
    return trending

@app.get("/api/salary-insights")
async def get_salary_insights() -> List[SalaryInsight]:
    """Salary data by role and experience level"""
    insights = []
    experience_levels = ["0-1 years", "1-3 years", "3-5 years", "5+ years"]
    
    for role in ROLES[:4]:
        for exp in experience_levels:
            base = random.randint(400000, 800000)
            insights.append({
                "role": role,
                "experience_level": exp,
                "avg_salary": base + (experience_levels.index(exp) * 200000),
                "salary_min": base,
                "salary_max": base + 600000,
                "market_demand": random.choice(["High", "Very High", "Medium"]),
                "job_count": random.randint(50, 500)
            })
    return insights

@app.get("/api/search-analytics")
async def get_search_analytics() -> SearchAnalytics:
    """What are job seekers searching for?"""
    return {
        "total_searches": random.randint(50000, 100000),
        "trending_keywords": ["remote", "python", "react", "cloud", "AI", "machine learning", "devops", "startup"],
        "top_locations": [
            {"location": "Bangalore", "searches": 25000, "percentage": 35},
            {"location": "Mumbai", "searches": 15000, "percentage": 21},
            {"location": "Hyderabad", "searches": 12000, "percentage": 17},
            {"location": "Pune", "searches": 10000, "percentage": 14},
        ],
        "top_roles": [
            {"role": "Full Stack Engineer", "searches": 15000},
            {"role": "Data Scientist", "searches": 12000},
            {"role": "DevOps Engineer", "searches": 10000},
            {"role": "AI/ML Engineer", "searches": 9000},
        ]
    }

@app.get("/api/jobs/{location}")
async def get_jobs_by_location(location: str):
    """Get job listings filtered by location"""
    jobs = []
    for i in range(random.randint(8, 15)):
        job = random.choice(JOBS_DATA).copy()
        job["location"] = location
        job["job_id"] = f"JOB-{location}-{i}"
        job["posted_date"] = (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat()
        jobs.append(job)
    return {"location": location, "total_jobs": len(jobs), "jobs": jobs}

@app.get("/api/market-trends")
async def get_market_trends():
    """Historical market trends data"""
    dates = [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(30, 0, -1)]
    
    return {
        "trends": [
            {
                "date": date,
                "total_jobs": 8000 + random.randint(-500, 500),
                "new_jobs": random.randint(100, 300),
                "avg_salary": 750000 + random.randint(-50000, 50000)
            }
            for date in dates
        ]
    }

@app.get("/api/salary-comparison")
async def get_salary_comparison(role: str, location: str):
    """Compare salaries across locations and companies"""
    base_salary = random.randint(600000, 1200000)
    
    return {
        "role": role,
        "locations": [
            {"location": "Bangalore", "avg_salary": base_salary, "companies_hiring": random.randint(10, 50)},
            {"location": "Mumbai", "avg_salary": base_salary - 50000, "companies_hiring": random.randint(8, 40)},
            {"location": "Hyderabad", "avg_salary": base_salary - 100000, "companies_hiring": random.randint(5, 30)},
            {"location": "Pune", "avg_salary": base_salary - 80000, "companies_hiring": random.randint(5, 25)},
        ]
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """API health status"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
