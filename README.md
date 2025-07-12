# Travel Planner Web Application

## Overview
This project is a full-stack travel planning web application designed to help users plan trips, manage preferences, and receive AI-powered recommendations. It features a modern React frontend and a robust Node.js/Express backend with Prisma ORM for database management.

---

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Prisma ORM
- JWT-based authentication
- RESTful API

**Frontend:**
- React.js
- Custom theming (motifs, palette, typography)
- Modular component structure

**Database:**
- Managed via Prisma (compatible with PostgreSQL, MySQL, SQLite, etc.)

---

## Project Structure

```
sem2/
  backend/           # Node.js/Express backend
    src/
      controllers/   # Route controllers (business logic)
      middleware/    # Express middleware (e.g., auth)
      prisma/        # Prisma client setup
      routes/        # API route definitions
      app.js         # Express app setup
      server.js      # Server entry point
    prisma/          # Prisma schema and migrations
  frontend/          # React frontend
    src/
      components/    # Reusable UI components
      pages/         # Main app pages (Home, Login, Planner, etc.)
      theme/         # Theming and styling
      App.js         # Main app component
      index.js       # Entry point
  prisma/            # (Optional) Root-level Prisma config
```

---

## Main Features
- **User Authentication:** Secure signup and login with JWT.
- **Travel Planner:** Multi-step workflow for planning trips (city selection, dates, budget, group size, preferences).
- **AI Recommendations:** (Planned/implemented) AI-powered travel suggestions via backend API.
- **Interactive UI:** Destination cards, interactive map, skeleton loaders, toast notifications.
- **Custom Theming:** Consistent look and feel with custom motifs, palette, and typography.
- **Breadcrumbs Navigation:** Easy navigation and context awareness for users.

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- (Optional) PostgreSQL/MySQL/SQLite for database

### 1. Clone the Repository
```bash
git clone <repo-url>
cd sem2
```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Set Up the Database
- Configure your database connection in `backend/prisma/schema.prisma`.
- Run Prisma migrations:
```bash
cd ../backend
npx prisma migrate dev --name init
```

### 4. Start the Development Servers
#### Backend
```bash
cd backend
npm run dev
```
#### Frontend
```bash
cd ../frontend
npm start
```

### 5. Access the App
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000) (or as configured)

---

## Contribution Guidelines
1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear, concise commit messages.
3. Ensure code follows existing style and conventions.
4. Add comments and documentation as needed.
5. Submit a pull request with a detailed description of your changes.

---

## Contact
For questions or support, please open an issue or contact the project maintainer.

---

## License
This project is licensed under the MIT License. 