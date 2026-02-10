# Todoist – Focus Board 🧠

A server-rendered Todo application built with Node.js, Express, MongoDB, and EJS.  
Designed to help users plan tasks, prioritize work, and stay consistent.

---

## Features

- User authentication (Sign up / Sign in)
- Server-side rendered pages using EJS
- Create, edit, complete, and delete todos
- Todos are **user-specific** (each user sees only their own tasks)
- Priority levels (High, Medium, Low)
- Optional due dates
- Clean, dark-themed UI
- Secure authentication using **HTTP-only cookies**

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Server-Side Rendering), Vanilla JavaScript
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT + HTTP-only cookies
- **Styling:** Custom CSS (Dark Theme)

---

## Project Structure

```

├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
│   ├── partials/
│   ├── home.ejs
│   ├── todos.ejs
│   ├── todo-form.ejs
│   ├── signIn.ejs
│   └── signUp.ejs
│   ├── cookies.ejs
│   └── privacy.ejs
│   └── terms.ejs
├── public/
│   ├── css/
│   └── js/
│   └── home.png
├── config/
├── app.js
└── package.json

````

---

## Authentication Overview

- Users authenticate via email and password
- A JWT is generated on login
- The token is stored in an **HTTP-only cookie**
- Cookies are automatically sent on each request
- Middleware attaches the user for server-side page rendering
- Protected routes require authentication

This approach is optimized for **server-rendered websites**, not just APIs.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todoist.git
cd todoist
````

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expiry
```

### 4. Run the application

```bash
npm start
```

Visit the app at:

```
http://localhost:3000
```

---

## Live Demo
https://todoist.mohammadaquib.com/
