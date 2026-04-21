export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const CATEGORIES = [
  'Academic',
  'Sports',
  'Arts',
  'Leadership',
  'Hackathon',
  'Other',
];

export const DEPARTMENTS = [
  'General',
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
];
