# CodeTown Website Deployment Script to Vercel (https://codetown.enigmadev.tech)
Write-Host "=== Deploying CodeTown Landing Page to codetown.enigmadev.tech ===" -ForegroundColor Cyan

# 1. Verify build
Write-Host "`n1. Running production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check errors." -ForegroundColor Red
    exit 1
}

# 2. Check Vercel Authentication
Write-Host "`n2. Checking Vercel login..." -ForegroundColor Yellow
$whoami = npx vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Vercel session expired or not logged in. Initiating login..." -ForegroundColor Yellow
    npx vercel login
}

# 3. Deploy to production
Write-Host "`n3. Deploying to production on Vercel..." -ForegroundColor Yellow
npx vercel --prod --yes

# 4. Alias domain if needed
Write-Host "`n4. Ensuring domain alias for codetown.enigmadev.tech..." -ForegroundColor Yellow
npx vercel alias set codetown.enigmadev.tech

Write-Host "`n=== Deployment Complete! ===" -ForegroundColor Green
Write-Host "Visit: https://codetown.enigmadev.tech/" -ForegroundColor Cyan
