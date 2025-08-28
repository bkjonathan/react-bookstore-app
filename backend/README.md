Bookstore Backend

Overview
A minimal Express + Mongoose backend structured with controller-service-repository-model layers. Includes health check, sample User module, environment configuration, Cloudinary setup stub, and a sample cron job.

Getting Started
1. Copy environment:
   cp .env.example .env
2. Edit .env with your values (MONGODB_URI required).
3. Install dependencies in backend folder:
   npm install
4. Start the dev server with hot reload:
   npm run dev
   - Requires nodemon (already added as devDependency).
5. For production/start without reload:
   npm start

Health Check
- GET /healthz -> basic process health
- GET /api/healthz -> includes MongoDB connection state (dbState: 0..3)

Sample User Endpoints
- POST /api/users { name, email, password } -> register
- GET /api/users?limit=20&page=1 -> list users
- GET /api/users/me?userId=<id> -> get profile by id (demo; no auth middleware)

Validation (Zod)
- Request validation is implemented using zod.
- Middleware: src/middleware/validate.js
- Schemas: src/modules/user/user.validation.js
- Endpoints enforce:
  - POST /api/users body: name (string, required), email (valid email), password (min 6)
  - GET /api/users/me query: userId (24-char hex ObjectId)
  - GET /api/users query: page, limit as positive integers (default page=1, limit=20, max limit=100)

Project Structure
- src/app.js: Express app configuration
- src/server.js: HTTP server + startup
- src/config/*: env, db, cloudinary config
- src/routes/*: API route registration and health route
- src/middleware/error.js: 404 and error handlers (includes Zod validation error formatting)
- src/modules/user/*: model, repository, service, controller, routes, validation
- src/jobs/index.js: example cron job

Notes
- Requires Node.js >= 18.18
- Cloudinary configuration is optional; if creds are present in .env it will configure automatically.
