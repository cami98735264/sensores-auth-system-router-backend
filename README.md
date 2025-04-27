# Backend API Documentation

## Project Overview
This is the backend API for a sensor monitoring system. It provides authentication, user management, and sensor data handling capabilities.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Nodemailer

## Detailed Project Structure
```
backend/
├── database/
│   └── coneccion.js              # Database connection configuration using Sequelize
│
├── models/
│   ├── init-models.js            # Model initialization and Sequelize setup
│   └── usuarios.js               # User model definition and schema
│
├── router/
│   ├── authentication/           # Authentication related routes
│   │   ├── generate_code.routes.js    # Code generation for verification
│   │   ├── login.routes.js            # User login functionality
│   │   ├── logout.routes.js           # User logout functionality
│   │   ├── register.routes.js         # User registration
│   │   ├── validate.routes.js         # Email validation
│   │   └── index.js                   # Authentication routes entry point
│   │
│   ├── middlewares/              # Custom middleware functions
│   │   ├── isAuthenticated.js         # JWT authentication verification
│   │   └── checkIfEmailExists.js      # Email existence validation
│   │
│   └── routes/                   # Main application routes
│       ├── check.routes.js            # Health check endpoint
│       └── index.js                   # Main routes entry point
│
├── index.js                      # Main application file and server setup
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Dependency lock file
└── .gitignore                    # Git ignore configuration
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure database:
- Create a MySQL database named 'sensores'
- Update database credentials in `database/coneccion.js` if needed

3. Start the server:
```bash
node index.js
```

The server will run on port 3000.

## API Endpoints

### Authentication Routes
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/logout` - User logout
- `/api/auth/validate` - Email validation
- `/api/auth/generate-code` - Verification code generation

### Main Routes
- `/api/check` - Health check endpoint

## Security
- JWT-based authentication
- CORS enabled for localhost:3001
- Cookie-based session management
- Password hashing using bcrypt

## Dependencies
- express: Web framework
- sequelize: ORM for MySQL
- jsonwebtoken: JWT handling
- bcrypt: Password hashing
- nodemailer: Email functionality
- cors: Cross-origin resource sharing
- cookie-parser: Cookie handling
- dotenv: Environment variable management

## Database
- MySQL database named 'sensores'
- Sequelize ORM for database operations
- Models defined in the models directory

## Middleware
- Authentication middleware for protected routes
- CORS configuration
- JSON body parsing
- Cookie parsing
