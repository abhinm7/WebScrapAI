## Backend Setup
### Navigate to the backend directory and install dependencies:

Bash

```cd backend
npm install
```
Create a .env file in the backend folder:

Code snippet:
```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/webscrapai
REDIS_URL=redis://localhost:6379
```
Run database migrations:

Bash
```
npx drizzle-kit migrate
```
## Start Backend Services:
### You need to run the API server and the Worker in two separate terminals.

Terminal 1 – API Server:

Bash
```
npm run start:server
```
Terminal 2 – Worker:

Bash
```
npm run start:worker
```