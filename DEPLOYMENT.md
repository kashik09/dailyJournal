# Deployment Guide - Vercel

This guide explains how to deploy your Daily Journal app to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Git installed on your machine

## Method 1: Deploy via Vercel Dashboard (Recommended for First Deployment)

### Step 1: Prepare Your Repository

1. Ensure all changes are committed:
   ```bash
   git status
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

2. Push to your remote repository:
   ```bash
   git push origin gh-pages
   ```

### Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure your project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

### Step 3: Configure Environment Variables (Optional)

Since we're using localStorage and not Supabase, no environment variables are required. However, if you plan to use Supabase in the future:

1. Go to Project Settings → Environment Variables
2. Add the following (if using Supabase):
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

Navigate to your project directory and run:

```bash
# For production deployment
vercel --prod

# For preview deployment
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (for first deployment)
- What's your project's name? **daily-journal** (or your preferred name)
- In which directory is your code located? **./**
- Want to override settings? **N**

## Updating Your Deployment

### Auto-Deploy (Recommended)

Once connected to Vercel, every push to your main branch (`gh-pages`) will automatically trigger a new deployment.

```bash
git add .
git commit -m "Update feature"
git push origin gh-pages
```

### Manual Deploy via CLI

```bash
vercel --prod
```

## Post-Deployment

### Access Your App

After deployment, Vercel will provide you with URLs:
- Production: `https://your-project-name.vercel.app`
- Preview: Unique URL for each deployment

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Project Structure

```
dailyJournal/
├── dist/                 # Build output (auto-generated, not committed)
├── node_modules/        # Dependencies (not committed)
├── src/                 # Source code
├── public/              # Static assets
├── index.html          # Entry HTML
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
└── tsconfig.json       # TypeScript config
```

## Build Verification

Before deploying, always verify your build works locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Then visit http://localhost:4173 to test the production build.

## Troubleshooting

### Build Fails on Vercel

1. Check build logs in Vercel dashboard
2. Ensure `package.json` has correct build script
3. Verify all dependencies are in `package.json` (not just `devDependencies`)

### App Shows Blank Page

1. Check browser console for errors
2. Verify all routes use hash or browser router correctly
3. Check that build output is in `dist` folder

### localStorage Not Working

1. Ensure you're accessing the app via HTTPS (Vercel provides this by default)
2. Check browser privacy settings
3. Verify console for localStorage errors

## Important Notes

- **Data Storage**: This app uses localStorage, which is browser-specific. Data won't sync across devices.
- **Data Persistence**: localStorage data persists until the user clears browser data.
- **Production Build**: Always test the production build locally before deploying.
- **Free Tier**: Vercel free tier is generous and should be sufficient for personal projects.

## Monitoring

- **Analytics**: Enable Vercel Analytics in Project Settings
- **Logs**: View function logs in Vercel Dashboard → Deployments → Logs
- **Performance**: Use Vercel Speed Insights for performance metrics

## Next Steps

After deployment:
1. Test all features on the live site
2. Share the URL with users
3. Monitor the deployment for any issues
4. Set up custom domain (optional)
5. Enable analytics (optional)
