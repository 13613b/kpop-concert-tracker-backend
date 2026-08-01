# 🎀 K-Pop Concert Tracker – Backend

This repository contains the Node.js backend of the K-Pop Concert Tracker. It provides a REST API and stores concert entries permanently in MongoDB Atlas.

## ⭐️ Features

- 🗒️ Create and store concert entries
- ✔️ Return all concerts or one concert by ID
- ✍️ Update existing concert entries
- 🗑️ Delete concert entries
- 🛡️ Validate MongoDB IDs and database input
- 🌱 Automatically add two example concerts when the database is empty
- 📊 Store concert data permanently in MongoDB Atlas

## 🧰 Technologies

### ⚙️ Backend

- Node.js
- Express
- Mongoose
- dotenv
- CORS

### 🗄️ Database

- MongoDB Atlas

## ✅ Prerequisites

- Git
- Node.js and npm
- A MongoDB Atlas account
- A MongoDB Atlas cluster and database user

## ⚙️ Installation

```bash
git clone https://github.com/13613b/kpop-concert-tracker-backend.git
cd kpop-concert-tracker-backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
MONGODB_URI=PASTE_YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE
PORT=3000
```

The `.env` file contains private credentials and must never be committed to Git. Make sure that the current IP address is included in the MongoDB Atlas IP access list.

## 🚀 Start the backend

```bash
npm start
```

A successful connection displays:

```text
Connected to MongoDB
Server running on port 3000
```

## 🔌 REST API

The backend runs on `http://localhost:3000`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/concerts` | Return all concerts |
| GET | `/api/concerts/:id` | Return one concert |
| POST | `/api/concerts` | Create a concert |
| PUT | `/api/concerts/:id` | Update a concert |
| DELETE | `/api/concerts/:id` | Delete a concert |

## 🔗 Related repository

[Frontend repository](https://github.com/13613b/kpop-concert-tracker-frontend)

## 🤖 Use of AI tools

- **ChatGPT / Codex:** Used for explanations, debugging support, MongoDB integration, API error handling and documentation.

All suggested code was reviewed and tested as part of the project.

## 👤 Author

Ela-Nur Kuyubasioglu, 2026
