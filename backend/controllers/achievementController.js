import Achievement from '../models/Achievement.js';
import User from '../models/User.js';

// @desc    Get all achievements (with filters)
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const { category, department, limit, studentId } = req.query;
    
    let query = { status: 'approved' };
    
    if (category) query.category = category;
    if (studentId) query.student = studentId;

    let achievementsQuery = Achievement.find(query)
      .populate('student', 'name avatar department')
      .sort({ date: -1 });

    if (limit) {
      achievementsQuery = achievementsQuery.limit(Number(limit));
    }

    let achievements = await achievementsQuery;

    // Filter by department if provided (since department is on the populated user)
    if (department && !studentId) {
      achievements = achievements.filter(
        (ach) => ach.student && ach.student.department === department
      );
    }

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending achievements for admin approval
// @route   GET /api/achievements/pending
// @access  Private/Admin
export const getPendingAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ status: 'pending' })
      .populate('student', 'name avatar department email')
      .sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit new achievement
// @route   POST /api/achievements
// @access  Private
export const addAchievement = async (req, res) => {
  try {
    const { title, description, category, date, points, proofUrl } = req.body;

    const achievement = new Achievement({
      student: req.user._id,
      title,
      description,
      category,
      date: date || Date.now(),
      points: points || 10,
      proofUrl,
      status: 'pending', // Admins need to approve
    });

    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Approve or reject achievement
// @route   PUT /api/achievements/:id/approve
// @access  Private/Admin
export const reviewAchievement = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    if (achievement.status === 'approved') {
      return res.status(400).json({ message: 'Already approved' });
    }

    achievement.status = status;
    achievement.approvedBy = req.user._id;

    const updatedAchievement = await achievement.save();

    // If approved, update user's total points
    if (status === 'approved') {
      const user = await User.findById(achievement.student);
      if (user) {
        user.totalPoints += achievement.points;
        await user.save();
      }
    }

    res.json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
