# 🏆 AchieveTrack — Student Achievement Tracker

A full-stack monorepo web application for tracking, verifying, and showcasing student achievements with AI-powered insights, digital badges, and a competitive leaderboard.

> **Live Demo:** Deployed on Vercel as an experimental monorepo service.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Achievement Logging** | Students submit achievements across categories (Academic, Sports, Arts, Leadership, Hackathon) for admin review and approval. |
| 🛡️ **Admin Verification** | Admins review pending achievements, approve or reject with a single click, and points are auto-credited. |
| 🏅 **Digital Badges** | Earn badges like "First Win", "Top Scorer", and "Hackathon Hero" — displayed on profiles and leaderboard. |
| 📊 **Activity Timeline** | Interactive 30-day area chart built with Recharts visualizing points earned over time. |
| 🤖 **AI Mentor (Gemini)** | An embedded chatbot powered by Google Gemini 2.0 Flash that provides personalized advice, goal suggestions, and AI-generated achievement descriptions. |
| 🥇 **Global Leaderboard** | Real-time rankings with department filtering, top-3 highlighting, and badge showcasing. |
| 🔐 **Secure Auth** | JWT-based authentication with bcrypt password hashing. |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS v4**
- **Recharts** — responsive data visualizations
- **Lucide React** — icon system
- **React Router v7** — client-side routing
- **React Hot Toast** — notification system

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** — stateless authentication
- **bcryptjs** — password hashing
- **Axios** — Gemini API integration

### AI
- **Google Gemini 2.0 Flash** — chat, description generation, and goal suggestions

### Deployment
- **Vercel** — monorepo deployment using `experimentalServices`

---

## 📁 Project Structure

```
sohitIDP/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Route handlers (auth, achievements, AI, badges, leaderboard)
│   ├── middleware/      # Auth & error handling middleware
│   ├── models/         # Mongoose schemas (User, Achievement, Badge)
│   ├── routes/         # Express route definitions
│   ├── seed.js         # Database seeder with dummy data
│   └── index.js        # Express server entry point
├── frontend/
│   └── src/
│       ├── components/ # Reusable UI components
│       ├── context/    # React Auth context
│       ├── hooks/      # Custom hooks (useAuth, useFetch)
│       ├── pages/      # Page components (Dashboard, Leaderboard, Admin, etc.)
│       └── utils/      # API client & constants
├── vercel.json         # Vercel monorepo deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/vathsavv56/Sohit-IDP.git
cd Sohit-IDP
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

### 4. Seed the Database (Optional)
```bash
cd backend
node seed.js
```
This generates 6 users, 4 badge types, and randomized achievements for each user.

### 5. Run Locally
Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## 🌐 Deployment

This project is configured as a **Vercel monorepo** using `experimentalServices` in `vercel.json`:

- Frontend is served at `/` (Vite build)
- Backend API is served at `/api` (Node.js serverless)

Make sure to add all environment variables (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`) in your Vercel project settings.

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Marketing page with features, FAQ, and CTA |
| Login | `/login` | Email/password authentication |
| Register | `/register` | New student registration |
| Dashboard | `/dashboard` | Activity chart, stats, AI Mentor chatbot |
| Achievements | `/achievements` | Browse approved achievements |
| Leaderboard | `/leaderboard` | Global rankings with filtering |
| Profile | `/profile` | User profile and badges |
| Admin | `/admin` | Review and approve/reject achievements |

---

## 👤 Author

**Inavolu Vathsav**  
GitHub: [@vathsavv56](https://github.com/vathsavv56)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
