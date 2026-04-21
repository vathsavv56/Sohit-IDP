// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables (local .env)
dotenv.config();

const app = express();

// ------------------------------------------------------------------
// Middleware
// ------------------------------------------------------------------
app.use(cors());          // You can tighten this later for production
app.use(express.json());

// ------------------------------------------------------------------
// Database
// ------------------------------------------------------------------
connectDB();

// ------------------------------------------------------------------
// Route imports
// ------------------------------------------------------------------
import authRoutes from './routes/authRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// ------------------------------------------------------------------
// Dual‑prefix routing
// Vercel strips the `/api` prefix before invoking this serverless
// function, so we expose the same routes under both `/api` and `/`.
// This works for local development (`/api/...`) and Vercel (`/...`).
// ------------------------------------------------------------------
const prefixes = ['/api', '']; // '' is the stripped‑prefix case

prefixes.forEach(prefix => {
  // Health‑check endpoint
  app.get(`${prefix}/health`, (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
  });

  // API routes
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/achievements`, achievementRoutes);
  app.use(`${prefix}/badges`, badgeRoutes);
  app.use(`${prefix}/leaderboard`, leaderboardRoutes);
  app.use(`${prefix}/ai`, aiRoutes);
});

// ------------------------------------------------------------------
// Error handling (must be after all routes)
// ------------------------------------------------------------------
import { notFound, errorHandler } from './middleware/errorHandler.js';
app.use(notFound);
app.use(errorHandler);

// ------------------------------------------------------------------
// Start the server only in a non‑production environment.
// Vercel’s serverless wrapper will import the app directly.
// ------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export the Express app for Vercel
export default app;
