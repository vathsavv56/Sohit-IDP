import express from 'express';
import { getBadges, createBadge, awardBadge } from '../controllers/badgeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBadges)
  .post(protect, admin, createBadge);

router.post('/award', protect, admin, awardBadge);

export default router;
