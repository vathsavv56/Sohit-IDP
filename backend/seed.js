import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Achievement from './models/Achievement.js';
import Badge from './models/Badge.js';
import connectDB from './config/db.js';

dotenv.config();

const usersData = [
  { name: 'inavolu vathsav', email: 'vathsav@example.com', password: 'password123', department: 'Computer Science' },
  { name: 'Alice Smith', email: 'alice@example.com', password: 'password123', department: 'Artificial Intelligence' },
  { name: 'Bob Johnson', email: 'bob@example.com', password: 'password123', department: 'Data Science' },
  { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password123', department: 'Cyber Security' },
  { name: 'Diana Prince', email: 'diana@example.com', password: 'password123', department: 'Information Technology' },
  { name: 'Evan Davis', email: 'evan@example.com', password: 'password123', department: 'Computer Science' },
];

const badgesData = [
  { name: 'First Win', description: 'Got your first achievement approved!', icon: 'Trophy', color: 'text-amber-500', criteria: '1 achievement' },
  { name: 'Top Scorer', description: 'Reached 100 total points', icon: 'Star', color: 'text-purple-500', criteria: '100 points' },
  { name: 'Early Adopter', description: 'Joined the platform early', icon: 'Zap', color: 'text-indigo-500', criteria: 'Registered early' },
  { name: 'Hackathon Hero', description: 'Won a hackathon', icon: 'Target', color: 'text-emerald-500', criteria: 'Hackathon category achievement' },
];

const achievementTitles = [
  { title: 'Completed React Course', category: 'Academic', points: 15 },
  { title: 'Won Inter-college Basketball Match', category: 'Sports', points: 20 },
  { title: 'Published a Blog Post on AI', category: 'Arts', points: 10 },
  { title: 'Organized Tech Fest', category: 'Leadership', points: 30 },
  { title: 'First Place at Global Hackathon', category: 'Hackathon', points: 50 },
  { title: 'Volunteered at Local Shelter', category: 'Other', points: 10 },
];

const generateRandomDates = (numDates) => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < numDates; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(now.getDate() - randomDaysAgo);
    dates.push(date);
  }
  return dates.sort((a, b) => a - b); // Chronological Order
};

const runSeeder = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Starting seed process...');

    // 1. Setup Badges
    await Badge.deleteMany();
    const createdBadges = await Badge.insertMany(badgesData);
    console.log('Badges created.');

    // 2. Process Users and Achievements
    for (let u of usersData) {
      // Create or locate user
      let user = await User.findOne({ email: u.email });
      
      if (!user && u.name === 'inavolu vathsav') {
         // Maybe registered with different email, search by name
         user = await User.findOne({ name: 'inavolu vathsav' });
      }

      if (!user) {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(u.password, salt);
         user = await User.create({
            name: u.name,
            email: u.email,
            password: hashedPassword, // explicitly hash it so it matches if we want to log in
            department: u.department,
            role: 'student',
         });
         console.log(`Created user: ${user.name}`);
      } else {
         console.log(`Found user: ${user.name}`);
      }

      // Clear existing records for fake regeneration
      await Achievement.deleteMany({ student: user._id });
      user.totalPoints = 0;
      user.badges = [];
      
      // Randomly assign 2 badges
      const shuffledBadges = createdBadges.sort(() => 0.5 - Math.random());
      user.badges.push(shuffledBadges[0]._id, shuffledBadges[1]._id);

      // Generate 5-10 achievements
      const numAchievements = Math.floor(Math.random() * 6) + 5; 
      const dates = generateRandomDates(numAchievements);

      for (let i = 0; i < numAchievements; i++) {
        const achTemplate = achievementTitles[Math.floor(Math.random() * achievementTitles.length)];
        const newAchievement = new Achievement({
           student: user._id,
           title: achTemplate.title,
           description: 'Automatically generated description for seed data.',
           category: achTemplate.category,
           date: dates[i],
           points: achTemplate.points,
           status: 'approved',
           approvedBy: user._id, // Self-approved for dummy data
        });
        await newAchievement.save();
        user.totalPoints += achTemplate.points;
      }

      await user.save();
      console.log(`Updated user ${user.name}. Assigned ${numAchievements} achievements. Total Points: ${user.totalPoints}`);
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error in seed script:', error);
    process.exit(1);
  }
};

runSeeder();
