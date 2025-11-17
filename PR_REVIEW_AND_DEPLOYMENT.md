# PR Review & Deployment Workflow

**Date**: 2025-11-17  
**Branch**: `feat/core-action-loop`  
**Status**: Ready for GitHub remote setup, PR creation, and CI/CD

---

## Phase 1: GitHub Remote Setup & PR Creation

### Prerequisites
- GitHub account with repository created
- Git configured locally
- Feature branch `feat/core-action-loop` with 3 commits

### Step 1: Configure Git Remote

```powershell
cd "c:\Users\sagar\OneDrive\Documents\apps and websites\hamro-saath,-safa-nepal-v3"

# Add GitHub remote (use your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/hamro-saath-safa-nepal-v3.git

# Verify remote added
git remote -v
# Output should show:
# origin  https://github.com/YOUR_USERNAME/hamro-saath-safa-nepal-v3.git (fetch)
# origin  https://github.com/YOUR_USERNAME/hamro-saath-safa-nepal-v3.git (push)
```

### Step 2: Push Master Branch

```powershell
# Push master (create remote master)
git push -u origin master

# Verify
git branch -a
# Should show: remotes/origin/master
```

### Step 3: Push Feature Branch

```powershell
# Push feature branch
git push -u origin feat/core-action-loop

# Verify
git branch -a
# Should show: remotes/origin/feat/core-action-loop and remotes/origin/master

# Show what will be in PR
git log master..feat/core-action-loop --oneline
```

### Step 4: Create Pull Request on GitHub

Option A: **Web UI**
1. Go to https://github.com/YOUR_USERNAME/hamro-saath-safa-nepal-v3
2. Click "Compare & pull request" banner
3. Verify base=master, compare=feat/core-action-loop
4. Copy content from `PR_SUMMARY.md` into description
5. Add reviewers and milestone if applicable
6. Click "Create pull request"

Option B: **GitHub CLI**
```powershell
# Create PR via CLI
gh pr create --base master --head feat/core-action-loop --title "feat: Implement Core Action Loop (E1-S1 through E1-S5)" --body-file PR_SUMMARY.md
```

---

## Phase 2: CI/CD Pipeline Execution

### What Happens Automatically

When PR is created, GitHub Actions will:

1. **Build & Test Backend** (`.github/workflows/ci.yml`)
   ```
   ✓ Install dependencies
   ✓ TypeScript compilation
   ✓ Run Mocha tests (contract + unit)
   ✓ Generate coverage report
   ```

2. **Build Frontend** (`.github/workflows/ci.yml`)
   ```
   ✓ Install dependencies
   ✓ Vite build
   ✓ TypeScript type check
   ✓ Bundle analysis
   ```

3. **Coverage Report** (`.github/workflows/coverage.yml`)
   ```
   ✓ Calculate test coverage %
   ✓ Upload to Codecov/Codacy
   ✓ Comment on PR with stats
   ```

4. **Status Checks**
   ```
   ✓ All checks must pass: Green ✓
   ✗ Any failure: Red ✗ (blocks merge)
   ```

### Monitoring CI/CD

**In GitHub UI:**
1. Go to PR page
2. Scroll to "Checks" section
3. Click on individual checks to see logs
4. Wait for all checks to turn green

**In Terminal:**
```powershell
# Watch workflow status
gh run list --repo YOUR_USERNAME/hamro-saath-safa-nepal-v3

# Get specific workflow run details
gh run view RUN_ID --repo YOUR_USERNAME/hamro-saath-safa-nepal-v3 --log
```

### Handling CI Failures

If any check fails:

1. **Read Error Message** - Click the failing check for details
2. **Fix Locally** - Make corrections in your code
3. **Commit & Push**
   ```powershell
   git add .
   git commit -m "fix: address CI feedback"
   git push origin feat/core-action-loop
   ```
4. **CI Reruns** - GitHub automatically reruns checks on push

---

## Phase 3: Code Review

### Review Checklist

Reviewers should verify:

**Functionality** ✅
- [ ] All 5 user stories implemented and working
- [ ] API endpoints respond with correct data
- [ ] Error handling works (404, 400, validation)
- [ ] Idempotency prevents duplicate operations
- [ ] Points ledger balances correctly

**Code Quality** ✅
- [ ] TypeScript types are comprehensive (no `any`)
- [ ] Error messages are descriptive
- [ ] Consistent code style across files
- [ ] No console.log or debug statements
- [ ] Comments explain complex logic

**Testing** ✅
- [ ] Happy path tests pass
- [ ] Error cases are covered
- [ ] Idempotency is verified via tests
- [ ] Coverage metrics acceptable (>70%)
- [ ] All 15+ contract tests pass

**Documentation** ✅
- [ ] CORE_ACTION_LOOP.md is complete and clear
- [ ] API endpoints documented with examples
- [ ] React components have JSDoc comments
- [ ] Database support explained
- [ ] Deployment instructions provided

**Database & Infrastructure** ✅
- [ ] In-memory store works for dev
- [ ] SQLite path configured correctly
- [ ] PostgreSQL support ready (migrations prepared)
- [ ] No hardcoded credentials
- [ ] Environment variables documented

### Common Review Questions

**Q: Why idempotency key instead of database unique constraints?**  
A: Prevents accidental duplicate awards when events complete multiple times. Works with any storage backend (in-memory, SQLite, PostgreSQL).

**Q: How are user profiles created?**  
A: Auto-created on first API call with default values. Can be updated via PUT /api/users/:userId endpoint.

**Q: What about authorization? Can any user complete any event?**  
A: Dev version uses userId header. Production will use JWT tokens. Event organizer checked in code, can be extended for role-based access.

**Q: How do we handle concurrent event completions?**  
A: Idempotency key ensures single reward distribution. First request wins, replays return same result.

---

## Phase 4: Address Feedback & Update PR

### Making Changes

1. **Make code changes** locally
2. **Commit with clear message**
   ```powershell
   git add .
   git commit -m "refactor: improve error messages for clarity"
   ```
3. **Push to same branch**
   ```powershell
   git push origin feat/core-action-loop
   ```
4. **PR updates automatically** - no need to create new PR

### Update Conversation

- Reply to review comments on GitHub
- Use "Resolve conversation" when fixes are applied
- Request re-review when ready

---

## Phase 5: Merge to Master

### Prerequisites
- [ ] All CI checks passing (green ✓)
- [ ] At least 1 approval from reviewer
- [ ] No merge conflicts
- [ ] All conversations resolved

### Merge Process

Option A: **Web UI**
1. Scroll to merge section on PR
2. Click "Squash and merge" (recommended for clean history)
3. Review commit message
4. Click "Confirm squash and merge"

Option B: **CLI**
```powershell
# Merge PR via CLI (auto-squashes by default)
gh pr merge PULL_REQUEST_NUMBER --squash

# Or merge locally
git checkout master
git pull origin master
git merge feat/core-action-loop --squash
git commit -m "feat: Implement Core Action Loop (E1-S1 through E1-S5)"
git push origin master
```

### Post-Merge Cleanup

```powershell
# Delete local feature branch
git branch -d feat/core-action-loop

# Delete remote feature branch
git push origin --delete feat/core-action-loop

# Verify branches
git branch -a
# Should only show: master and remotes/origin/master
```

---

## Phase 6: Staging Deployment

### Step 1: Deploy Code to Staging

```powershell
# On staging server:
git clone https://github.com/YOUR_USERNAME/hamro-saath-safa-nepal-v3.git
cd hamro-saath-safa-nepal-v3
git checkout master

# Install and build
npm install
npm run build

cd backend
npm install
npm run build
```

### Step 2: Database Setup for Staging

```powershell
# Set environment variables
$env:USE_PG = 'true'
$env:DATABASE_URL = 'postgres://user:pass@localhost:5432/hamro_saath_stage'
$env:NODE_ENV = 'staging'

# Run migrations
npm run migrate:pg

# Verify database
psql -U user -d hamro_saath_stage -c "SELECT * FROM ledger LIMIT 1;"
```

### Step 3: Start Services

```powershell
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd backend
npm run dev

# Verify URLs:
# Frontend: http://localhost:5173
# Backend API: http://localhost:4000
```

### Step 4: Staging Smoke Tests

```powershell
# Test Core Action Loop workflow:

# 1. Report Issue
curl -X POST http://localhost:4000/api/issues \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user123" \
  -d '{
    "title": "Pothole on Main Street",
    "description": "Large pothole near crosswalk",
    "category": "infrastructure",
    "location": {"lat": 27.7172, "lng": 85.3240},
    "ward": "Ward 1"
  }'

# 2. List Issues
curl http://localhost:4000/api/issues \
  -H "X-User-Id: user123"

# 3. Create Event
curl -X POST http://localhost:4000/api/issues/{issueId}/events \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user123" \
  -d '{
    "startAt": "2025-11-20T10:00:00Z",
    "volunteerGoal": 5,
    "notes": "Let'\''s fix this pothole together!"
  }'

# 4. RSVP to Event
curl -X POST http://localhost:4000/api/events/{eventId}/rsvp \
  -H "X-User-Id: user456"

# 5. Complete Event
curl -X POST http://localhost:4000/api/events/{eventId}/complete \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: event-complete-123" \
  -H "X-User-Id: user123" \
  -d '{"afterPhoto": "https://example.com/photo.jpg"}'

# 6. Check Points
curl http://localhost:4000/api/users/user456/points \
  -H "X-User-Id: user456"

# Expected: User456 should have 50 SP from event completion
```

### Step 5: Frontend Verification

1. Open http://localhost:5173 in browser
2. Test each user story:
   - [ ] Report Issue form works
   - [ ] Issue list displays and filters
   - [ ] Event creation form works
   - [ ] Points display shows balance
   - [ ] No TypeScript errors in console

---

## Phase 7: Production Deployment

### Prerequisites
- [ ] Staging tests all passing
- [ ] No critical issues found
- [ ] Performance metrics acceptable
- [ ] Backup strategy in place
- [ ] Rollback plan documented

### Step 1: Production Database

```powershell
# Create production database
psql -U postgres -c "CREATE DATABASE hamro_saath_production;"

# Configure connection
$env:DATABASE_URL = 'postgres://prod_user:prod_pass@prod-db.example.com:5432/hamro_saath_production'
$env:USE_PG = 'true'

# Run migrations
npm run migrate:pg

# Verify
psql -U prod_user -d hamro_saath_production -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"
```

### Step 2: S3/CDN Setup

```powershell
# Configure AWS credentials
$env:AWS_ACCESS_KEY_ID = 'your_access_key'
$env:AWS_SECRET_ACCESS_KEY = 'your_secret_key'
$env:AWS_BUCKET = 'hamro-saath-prod-images'
$env:CDN_URL = 'https://cdn.example.com/images'

# Create S3 bucket (via AWS CLI)
aws s3 mb s3://hamro-saath-prod-images
aws s3 ls
```

### Step 3: Authentication Setup

```powershell
# Generate JWT secrets
$secret = [Convert]::ToBase64String(([byte[]](1..32)))

# Configure environment
$env:JWT_SECRET = $secret
$env:JWT_EXPIRY = '7d'
$env:NODE_ENV = 'production'
```

### Step 4: Build & Deploy

```powershell
# Build frontend
npm run build

# Build backend
cd backend
npm run build

# Deploy to production server (e.g., via Docker, systemd, etc.)
# Example: Docker
docker build -t hamro-saath-backend .
docker push your-registry/hamro-saath-backend
docker run -e NODE_ENV=production -e DATABASE_URL=... hamro-saath-backend
```

### Step 5: Production Verification

```powershell
# Test all endpoints on production
curl https://api.hamro-saath.com/api/issues \
  -H "Authorization: Bearer $token" \
  -H "X-User-Id: user123"

# Monitor logs
docker logs -f hamro-saath-backend

# Check health
curl https://api.hamro-saath.com/health
```

### Step 6: Monitoring & Alerts

Set up monitoring for:
- [ ] API response times (<200ms)
- [ ] Error rates (<1%)
- [ ] Database connection pool
- [ ] Disk space usage
- [ ] Memory usage
- [ ] CPU usage

---

## Rollback Plan

If production issues arise:

```powershell
# Option 1: Revert to previous commit
git revert HEAD
git push origin master

# Option 2: Checkout previous release
git checkout v1.0.0
git push origin master --force

# Option 3: Database rollback
# Backup current database
pg_dump hamro_saath_production > backup-2025-11-17.sql

# Restore previous backup
psql hamro_saath_production < backup-2025-11-16.sql
```

---

## Success Criteria

✅ **PR Review Complete**
- All reviewers approved
- All feedback addressed
- All checks passing

✅ **Staging Deployment**
- All endpoints responding
- Core Action Loop workflow complete
- No critical errors in logs

✅ **Production Ready**
- Database configured and migrated
- Images stored in S3/CDN
- Authentication system working
- Monitoring and alerts in place
- Rollback plan ready

✅ **Launch**
- Code deployed to production
- Users can access at hamro-saath.com
- Support team briefed and ready
- Post-launch monitoring active

---

## Troubleshooting

### CI Checks Failing

**TypeScript Errors:**
```powershell
npm run typecheck
# Fix errors locally, then push
```

**Test Failures:**
```powershell
cd backend
npm test
# Review test logs, fix code, push
```

### Deployment Issues

**Connection Refused:**
- Verify backend is running on correct port
- Check firewall rules
- Verify environment variables set

**Database Errors:**
- Verify DATABASE_URL is correct
- Check database exists and migrations ran
- Review PostgreSQL logs

**Image Upload Issues:**
- Verify S3 credentials configured
- Check bucket permissions
- Review CloudFront/CDN settings

---

## Next Steps After Deployment

1. **Monitor**: Watch logs for 24 hours post-deploy
2. **Gather Feedback**: Get user feedback on Core Action Loop
3. **Sprint Planning**: Plan E2 (Community Features) implementation
4. **Documentation**: Update user guides and API docs
5. **Optimization**: Profile performance, identify bottlenecks

---

**Ready to proceed with PR and deployment? Confirm and we'll execute this plan step by step.**
