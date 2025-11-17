# Deployment Guide

## Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub account
3. Grant Railway access to your GitHub repos

### Step 2: Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `ranasagar/hamro-saath-safa-nepal-v3`
4. Railway will auto-detect the configuration

### Step 3: Configure Environment Variables
Add these in Railway dashboard → Variables:
```
NODE_ENV=production
PORT=4000
USE_DB=false
```

### Step 4: Add PostgreSQL Database (Optional)
1. In Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will auto-create and connect DATABASE_URL
3. Update environment: `USE_DB=postgres`
4. Backend will auto-run migrations on startup

### Step 5: Get Backend URL
- Railway will provide a URL like: `https://your-app.railway.app`
- Test: `https://your-app.railway.app/api/rewards`

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import `ranasagar/hamro-saath-safa-nepal-v3`
3. Vercel auto-detects Vite

### Step 3: Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variable
```
VITE_API_URL=https://your-backend.railway.app
```
(Replace with your Railway backend URL)

### Step 5: Deploy
- Click "Deploy"
- Vercel will build and deploy
- Get URL: `https://hamro-saath-safa-nepal-v3.vercel.app`

---

## Quick Deploy Commands

### Railway CLI (Alternative)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Vercel CLI (Alternative)
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Environment Variables Summary

### Backend (Railway)
- `NODE_ENV=production`
- `PORT=4000` (Railway auto-sets this)
- `USE_DB=false` (or `postgres` with database)
- `DATABASE_URL` (auto-set by Railway if using PostgreSQL)

### Frontend (Vercel)
- `VITE_API_URL=https://your-backend.railway.app`

---

## Post-Deployment Testing

Test the full Core Action Loop:
1. Open frontend: `https://hamro-saath-safa-nepal-v3.vercel.app`
2. Report an issue
3. Create an event for that issue
4. RSVP to the event
5. Complete the event with after-photo
6. Check your points balance

All API calls should work end-to-end!
