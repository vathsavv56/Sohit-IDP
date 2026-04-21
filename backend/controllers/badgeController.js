import Badge from '../models/Badge.js';
import User from '../models/User.js';

// @desc    Get all badges
// @route   GET /api/badges
// @access  Public
export const getBadges = async (req, res) => {
  try {
    const badges = await Badge.find({});
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new badge
// @route   POST /api/badges
// @access  Private/Admin
export const createBadge = async (req, res) => {
  try {
    const { name, description, icon, color, criteria } = req.body;

    const badgeExists = await Badge.findOne({ name });
    if (badgeExists) {
      return res.status(400).json({ message: 'Badge already exists' });
    }

    const badge = await Badge.create({
      name,
      description,
      icon,
      color,
      criteria,
    });

    res.status(201).json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Award badge to user
// @route   POST /api/badges/award
// @access  Private/Admin
export const awardBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    const user = await User.findById(userId);
    const badge = await Badge.findById(badgeId);

    if (!user || !badge) {
      return res.status(404).json({ message: 'User or Badge not found' });
    }

    if (user.badges.includes(badgeId)) {
      return res.status(400).json({ message: 'User already has this badge' });
    }

    user.badges.push(badgeId);
    badge.awardedTo.push(userId);

    await user.save();
    await badge.save();

    res.json({ message: 'Badge awarded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
