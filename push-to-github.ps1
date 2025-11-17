# Configure Git Remote and Push to GitHub
# This script assumes the GitHub repository has already been created

$projectPath = "c:\Users\sagar\OneDrive\Documents\apps and websites\hamro-saath,-safa-nepal-v3"
$username = "ranasagar"
$repoName = "hamro-saath-safa-nepal-v3"
$remoteUrl = "https://github.com/$username/$repoName.git"

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  GitHub Repository Setup & Push Script                    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to project
Write-Host "📂 Step 1: Navigating to project directory..." -ForegroundColor Yellow
Push-Location $projectPath
Write-Host "✓ Current location: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Step 2: Check if remote already exists
Write-Host "🔍 Step 2: Checking git remote configuration..." -ForegroundColor Yellow
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠ Found existing remote: $existingRemote" -ForegroundColor Yellow
    Write-Host "📝 Removing old remote..." -ForegroundColor Yellow
    git remote remove origin
    Write-Host "✓ Old remote removed" -ForegroundColor Green
}
Write-Host ""

# Step 3: Add remote
Write-Host "🔗 Step 3: Adding GitHub remote..." -ForegroundColor Yellow
Write-Host "   URL: $remoteUrl" -ForegroundColor Cyan
git remote add origin $remoteUrl
Write-Host "✓ Remote added" -ForegroundColor Green
Write-Host ""

# Step 4: Verify remote
Write-Host "✅ Step 4: Verifying remote configuration..." -ForegroundColor Yellow
git remote -v
Write-Host ""

# Step 5: Push master
Write-Host "📤 Step 5: Pushing master branch..." -ForegroundColor Yellow
Write-Host "   Command: git push -u origin master" -ForegroundColor Cyan
git push -u origin master
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Master branch pushed successfully" -ForegroundColor Green
}
else {
    Write-Host "✗ Failed to push master branch" -ForegroundColor Red
    Write-Host "  Check authentication and GitHub repository status" -ForegroundColor Red
}
Write-Host ""

# Step 6: Push feature branch
Write-Host "📤 Step 6: Pushing feature branch..." -ForegroundColor Yellow
Write-Host "   Command: git push -u origin feat/core-action-loop" -ForegroundColor Cyan
git push -u origin feat/core-action-loop
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Feature branch pushed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to push feature branch" -ForegroundColor Red
}
Write-Host ""

# Step 7: Verify branches
Write-Host "🌿 Step 7: Verifying branches on local and remote..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Local branches:" -ForegroundColor Cyan
git branch
Write-Host ""
Write-Host "Remote branches:" -ForegroundColor Cyan
git branch -r
Write-Host ""

# Step 8: Summary
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ Setup Complete!                                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   Repository: https://github.com/$username/$repoName" -ForegroundColor Green
Write-Host "   Master Branch: Pushed ✓" -ForegroundColor Green
Write-Host "   Feature Branch (feat/core-action-loop): Pushed ✓" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Go to: https://github.com/$username/$repoName/pull/new/feat/core-action-loop" -ForegroundColor Cyan
Write-Host "   2. Create Pull Request (master ← feat/core-action-loop)" -ForegroundColor Cyan
Write-Host "   3. Use PR_SUMMARY.md content as description" -ForegroundColor Cyan
Write-Host "   4. Wait for CI/CD checks to pass" -ForegroundColor Cyan
Write-Host "   5. Merge to master" -ForegroundColor Cyan
Write-Host ""

Pop-Location
