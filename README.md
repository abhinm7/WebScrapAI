# WebScrapAI 

A full-stack application where users submit a website URL and a question. The system scrapes the website in a background job, sends the content to an AI model, and returns an answer asynchronously.

## Architecture

* **Frontend:** Next.js + TanStack Query (polling)
* **Backend API:** Express.js
* **Background Worker:** BullMQ + Puppeteer
* **Queue:** Redis
* **Database:** PostgreSQL (Drizzle ORM)

**Flow:**
`Frontend` → `API` → `Redis Queue` → `Worker` → `DB` → `API` → `Frontend`

---
## 🚀 Local Setup (Recommended)

### Prerequisites
* Node.js 18+
* Redis (local or cloud)
* PostgreSQL
* Google Chrome (for Puppeteer)

### Clone Repository
```bash
git clone https://github.com/abhinm7/WebScrapAI.git
cd webscrapai
```

### [Backend Setup](./BACKEND.md)
> *Go here to set up the API, Database, Redis, and Background Worker.*

### [Frontend Setup](./FRONTEND.md)
> *Go here to set up the Next.js client and environment.*