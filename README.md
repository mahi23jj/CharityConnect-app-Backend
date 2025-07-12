# 🌐 Charity Connect (Backend - Node.js)

This is the **backend** of the Charity Connect mobile app, built with **Node.js and Express.js**. It powers the charity organization platform by providing secure, scalable APIs for user profiles, project submissions, filtering, and campaign progress.

> 🔗 Frontend: [Charity Connect Flutter App](https://github.com/mahi23jj/CharityConnect-app-Frontend)

---

## ✨ Features

- 📤 Project submissions with file uploads (multipart/form-data)
- 🔍 Filtering projects by tech stack, department, academic year
- 👤 User and organization profile APIs
- 🧾 Campaigns and donation tracking (planned)
- 🔐 Authentication and authorization (coming soon)
- 🌍 CORS configured for Flutter integration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Multer** for file uploads
- **MongoDB / Mongoose** *(or PostgreSQL/Sequelize if applicable)*
- **dotenv** for environment configuration
- **CORS** for cross-origin setup
- **Auth:** JWT (optional)
- **Notifications:** Firebase Cloud Messaging (or OneSignal)
- **Deployment:** Render / Railway / Vercel + MongoDB Atlas

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js v16+
- MongoDB (or PostgreSQL) running locally or remotely
- Postman or Flutter frontend for testing

---

### 🧪 Clone & Install

```bash
git clone https://github.com/yourusername/charity-backend.git
cd charity-backend
npm install
