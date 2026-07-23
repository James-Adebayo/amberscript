# 🎙️ AmberScript

A full-stack secure transcription, translation, and investment platform inspired by AmberScript, built with **Node.js, Express, Python (FastAPI + Gemini AI), PHP, MySQL, and JavaScript**. 

The platform enables users to request AI-powered instant text translations, automated speech-to-text transcriptions, manage tasks, and perform secure wallet transactions.

![AmberScript Platform](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

- **Instant AI Text Translation**: Multi-language text translation powered by Google Gemini AI and FastAPI backend.
- **Audio & Video Transcription**: Automated AI and human-verified speech-to-text conversion.
- **User Authentication**: Secure signup, login, JWT token authentication, and email confirmation workflows.
- **Wallet & Micro-Transactions**: Integrated wallet system with real-time balance queries and SQL transactional safety.
- **Task Marketplace**: Earning portal for transcriptionists and translators.
- **Modern Responsive UI**: Clean glassmorphism design system built with vanilla HTML5, CSS3, and JavaScript.

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: Core REST API and web routing service.
- **Python & FastAPI**: AI translation engine utilizing Google GenAI (`gemini-2.5-flash`).
- **PHP**: Additional server-side microservices.
- **MySQL**: Relational database storage with transaction management.
- **Authentication**: JSON Web Tokens (JWT) & `bcrypt` password hashing.

### Frontend
- **HTML5 & CSS3**: Custom design system using CSS variables, flexbox, and CSS grid.
- **JavaScript (ES6+)**: Dynamic DOM rendering, asynchronous fetch API, and interactive toolkits.

---

## 📁 Project Structure

```text
AmberScript/
├── api/                    # Server entry point
├── config/                 # Database configuration
├── controllers/            # Controller layer (auth, page, translate, user, wallet)
├── frontend/               # Static assets & page templates
│   ├── assets/             # Shared CSS, JavaScript, and images
│   ├── auth/               # Login & authentication pages
│   ├── confirm-email/      # Email verification page
│   ├── tasks/              # Task marketplace page
│   ├── translation/        # Instant AI translation page
│   └── wallet/             # User wallet dashboard
├── middleware/             # Auth check & request middleware
├── php/                    # PHP backend services
├── python/                 # Python FastAPI AI service
│   ├── controller/         # FastAPI translation controller
│   ├── models/             # Gemini AI model wrapper
│   ├── services/           # Translation service
│   └── app.py              # FastAPI server
├── repository/             # Database access repositories
├── routes/                 # Express web & API routing
├── services/               # Node.js business logic & HTTP clients
├── app.js                  # Main Express app setup
├── database.sql            # Database schema definition
└── package.json            # Node.js dependencies
```

---

## 🔗 Key API Routes

### 🌐 Web Pages
- `GET /` — Homepage & Platform Overview
- `GET /translation` — Instant AI Translation Page
- `GET /tasks` — Available Contributor Tasks
- `GET /wallet` — User Wallet Dashboard *(Protected)*
- `GET /auth` — Authentication Page (Sign In / Sign Up)

### ⚙️ Services & API Endpoints
- `POST /translate` — Send text & language payload for Gemini translation
- `POST /signin` — User authentication login
- `POST /signup` — User registration
- `GET /get-balance` — Fetch wallet balance *(Protected)*
- `GET /user` — Retrieve authenticated user profile *(Protected)*

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **MySQL Database**

### 1. Clone Repository
```bash
git clone https://github.com/James-Adebayo/amberscript.git
cd amberscript
```

### 2. Node.js Backend Setup
```bash
# Install dependencies
npm install

# Configure Environment Variables
cp .env.example .env

# Run development server
npm run dev
```

### 3. Python FastAPI Setup
```bash
cd python

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install python dependencies
pip install -r requirements.txt

# Run FastAPI server with Uvicorn
uvicorn app:app --reload --port 8000
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DATABASE_NAME=amberscript

JWT_SECRET=your_jwt_secret_key
```

And in `python/.env`:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
