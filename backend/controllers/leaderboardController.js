import User from '../models/User.js';

// @desc    Get leaderboard rankings
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    const { department, limit } = req.query;
    
    let query = {};
    if (department) {
      query.department = department;
    }

    // Only get students, not admins
    query.role = 'student';

    let userQuery = User.find(query)
      .select('name avatar department totalPoints badges')
      .populate('badges', 'name icon color')
      .sort({ totalPoints: -1 });

    if (limit) {
      userQuery = userQuery.limit(Number(limit));
    }

    const leaderboard = await userQuery;

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
