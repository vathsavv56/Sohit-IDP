import express from 'express';
import { generateDescription, suggestGoals, chatWithAI } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate-description', protect, generateDescription);
router.post('/suggest-goals', protect, suggestGoals);
router.post('/chat', protect, chatWithAI);

export default router;
