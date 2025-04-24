# 🧩 Messy-Friendly Daily Planner (Backend)

A supportive, lightweight planner designed for people with ADHD, anxiety, chronic fatigue, and creative messiness. Instead of rigid tasks, it builds your day based on your vibe, energy, and personal goals — because not every day feels the same.

## 🌟 Features

- Set your goals and describe your ideal day
- Daily vibe check → generates custom to-do templates
- Automatically adapts to low-energy or high-motivation days
- Daily reflection with task reminders and carry-overs
- Later Box for uncompleted tasks
- Mood-based analytics (optional for MVP)

## 🧪 Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (optional)
- **Task Scheduler:** node-cron
- **Notifications:** Firebase Cloud Messaging (or OneSignal)
- **Deployment:** Render / Railway / Vercel + MongoDB Atlas

---

## 🔌 API Overview

###User Profile
GET    /api/user/:id        # Get user data  
POST   /api/user/setup      # Save goals and ideal day  
PUT    /api/user/:id        # Update profile  

###Vibe & Templates

POST   /api/vibe-check        # Submit vibe for the day  
GET    /api/template/:vibe    # Get template based on vibe  
POST   /api/template/custom   # Submit custom template

###Tasks

POST   /api/tasks              # Add a new task  
GET    /api/tasks/today        # Get today’s task list  
GET    /api/tasks/later        # Get Later Box tasks  
PUT    /api/tasks/:id          # Update a task  
DELETE /api/tasks/:id          # Delete a task

###Reflection & Reminders

POST /api/reflection         # Daily task review  
POST /api/reminders/setup    # Set up reminder notifications

###Clone this repository

git clone https://github.com/yourusername/messy-planner-backend.git
cd messy-planner-backend

###Install dependencies
npm install

###Create a .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

###Run the server
npm start


