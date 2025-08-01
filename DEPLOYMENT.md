# Deployment Instructions

## Vercel Serverless Function Setup

This project uses a Vercel serverless function to proxy requests to your Flask backend, solving the Mixed Content error.

### Files Created:

- `api/predict.js` - Serverless function that proxies requests to Flask backend
- `vercel.json` - Vercel configuration for routing
- Updated `src/App.js` - Now uses `/api/predict` instead of direct Flask endpoint

### How it works:

1. React app makes requests to `/api/predict` (HTTPS)
2. Vercel serverless function receives the request
3. Function forwards request to your Flask backend (`http://143.244.161.196:3001/predict`)
4. Function returns the response back to React app

### Deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy - Vercel will automatically detect the API routes

### Benefits:

- ✅ Solves Mixed Content error (HTTPS → HTTP)
- ✅ No CORS issues
- ✅ Secure proxy between frontend and backend
- ✅ Automatic scaling with Vercel

### Testing:

After deployment, your React app will make requests to:
`https://your-vercel-app.vercel.app/api/predict`

Instead of the direct Flask endpoint.
