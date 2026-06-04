# 🛒 Kirana Store

A web-based Kirana Store Management System built using Node.js, Express.js, EJS, and MongoDB. The application provides a simple interface for managing store operations with user authentication and secure session handling.

## 🚀 Features

* User Authentication
* Secure Password Hashing using Bcrypt
* Session-Based Login System
* MongoDB Database Integration
* Server-Side Rendering with EJS
* Environment Variable Configuration
* Organized MVC Architecture

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* EJS
* HTML
* CSS
* JavaScript

### Database

* MongoDB
* Mongoose

### Authentication

* Bcrypt
* Express Session

## 📂 Project Structure

```text
kirana-store/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── views/
│
├── .env.example
├── .gitignore
├── app.js
├── db.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/atharvapatill/kirana-Store.git
cd kirana-Store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URL=your_mongodb_connection_string
GOOGLE_APP_PASSWORD=your_google_app_password
USER_MAIL=your_email@gmail.com
```

### 4. Start the Application

```bash
node app.js
```

## 📦 Dependencies

* Express
* EJS
* Mongoose
* Bcrypt
* Express Session
* Dotenv

## 🏗️ Architecture

The project follows a structured architecture:

* **controllers/** – Handles business logic.
* **middlewares/** – Custom middleware functions.
* **models/** – MongoDB schemas and models.
* **routes/** – Application routes.
* **views/** – EJS templates.
* **db.js** – MongoDB connection setup.
* **app.js** – Main application entry point.

## 🔐 Security

* Passwords are hashed using Bcrypt.
* User sessions are managed using Express Session.
* Environment variables are stored separately using Dotenv.
