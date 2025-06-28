# CodeBlitz Backend

A simple Node.js + Express backend for CodeBlitz. Provides REST API endpoints for user authentication, user profile, and contest/practice data proxying (e.g., CLIST API).

## Features
- User registration & login (JWT-based)
- User profile (get, update)
- Proxy for CLIST API (uses .env credentials)
- CORS enabled for frontend

## Setup
1. `npm install`
2. Create a `.env` file with your secrets (see example below)
3. `npm start`

## Example .env
```
PORT=5000
JWT_SECRET=your_jwt_secret
CLIST_API_USERNAME=Parthu
CLIST_API_KEY=0b2000fe1d0c548f5343e6720c8f92a0648f6377
```
