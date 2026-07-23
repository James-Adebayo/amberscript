🎙️ AmberScript Clone

A full-stack transcription platform inspired by AmberScript, built with Node.js, Express, MySQL, and JavaScript. The project allows users to upload audio/video files, request AI or human transcription, translate transcripts, and manage payments through a wallet system.

«Status: 🚧 In Development»

---

Features

- User authentication (Sign up & Login)
- Secure password hashing with bcrypt
- JWT authentication
- Upload audio and video files
- AI transcription
- Human transcription requests
- AI translation
- Human translation requests
- Wallet system
- Deposit funds
- Transaction history
- Order management
- User dashboard
- Admin dashboard
- REST API architecture
- MVC-inspired project structure
- MySQL database
- SQL transactions for financial operations

---

Tech Stack

Backend

- Node.js
- PHP
<<<<<<< HEAD
- PYTHON
=======
>>>>>>> 5091dbdb96337ba6fc3a302c950194bc422ad8bf
- Express.js
- MySQL
- JWT
- bcrypt
- dotenv

Frontend

- HTML
- CSS
- JavaScript

---

Project Structure

project/
│
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── config/
├── uploads/
├── php/
├── python/
├── frontend/
├── database/
└── app.js

---

Database

Main tables include:

- users
- wallets
- wallet_transactions
- transcription_orders
- translation_orders
- uploaded_files

Financial operations use database transactions to maintain data consistency during deposits, transfers, and wallet updates.

---

API Features

Authentication

- POST /signup
- POST /signin

Wallet

- Deposit funds
- View wallet balance
- Transaction history

Orders

- Create transcription order
- Create translation order
- View order status
- View completed jobs

---

Security

- Password hashing with bcrypt
- JWT authentication
- Parameterized SQL queries
- Protected routes
- Environment variables
- Database transactions for wallet operations

---

Installation

git clone https://github.com/James-Adebayo/amberscript.git

npm install

cp .env.example .env

npm start

cd python
pip install > requirements.txt
---

Environment Variables

PORT=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

---

Future Improvements

- Paystack integration
- Stripe support
- Email verification
- Password reset
- File storage on cloud (AWS S3 / Cloudinary)
- Admin analytics
- Notifications
- Freelancer portal for human transcription and translation
- Real-time order tracking

---

Learning Goals

This project was built to practice:

- Backend architecture
- Repository pattern
- Authentication
- REST API design
- MySQL relationships
- Database transactions
- File uploads
- Wallet implementation
- Secure coding practices

---

License

This project is open source and available under the MIT License.
