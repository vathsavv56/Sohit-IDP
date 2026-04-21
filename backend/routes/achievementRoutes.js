import express from 'express';
import {
  getAchievements,
  addAchievement,
  getPendingAchievements,
  reviewAchievement,
} from '../controllers/achievementController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAchievements)
  .post(protect, addAchievement);

router.get('/pending', protect, admin, getPendingAchievements);

router.put('/:id/approve', protect, admin, reviewAchievement);

export default router;
