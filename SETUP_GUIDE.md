# Food Ordering System - Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

## Google OAuth Setup

To enable Google login, follow these steps:

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable the Google+ API

### 2. Create OAuth 2.0 Credentials
- Go to "Credentials" in the left sidebar
- Click "Create Credentials" → "OAuth 2.0 Client ID"
- Choose "Web application"
- Add authorized redirect URIs:
  - `http://localhost:3000` (for development)
  - `http://localhost:3000/login` (for development)
  - Your production domain (when deployed)
- Copy the Client ID

### 3. Configure Environment Variables
- Open `.env.local` in the project root
- Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
```

## Running the Application

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Features

### Authentication
- **Email/Password Login**: Traditional login with email and password
- **Email/Password Signup**: Create new account with name, email, phone, and password
- **Google OAuth Login**: One-click login with Google account
- **Persistent Storage**: User data stored in `data/users.json`

### Login Page
- Toggle between login and signup modes
- Form validation
- Error and success messages
- Responsive design (mobile and desktop)
- Dark mode support

## API Endpoints

### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST `/api/auth/signup`
Create a new account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 000-0000",
  "password": "password123"
}
```

### POST `/api/auth/google`
Login with Google OAuth token
```json
{
  "credential": "google_jwt_token"
}
```

## Testing

### Test Credentials (after signup)
- Email: test@example.com
- Password: test123

### Test Google Login
- Use any Google account to test the Google login button

## Notes

- User data is stored in `data/users.json` (for development only)
- In production, use a proper database like MongoDB, PostgreSQL, etc.
- Passwords are stored in plain text (for development only)
- In production, use bcrypt or similar for password hashing
- Use secure, httpOnly cookies for authentication tokens
