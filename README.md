# BizKeeper

**Digital purchase records for business owners.**

BizKeeper replaces the physical ledger book. Record bulk purchases, track spending by category and supplier, monitor price changes over time, and export your records as PDF or CSV — all in one secure, private web app.

🌐 **Live:** [bizkeeper.pxxl.click](https://bizkeeper.pxxl.click/)  
⚙️ **API:** [bizkeeper-backend.onrender.com](https://bizkeeper-backend.onrender.com)

---

## Features

- **Purchase Sessions** — Record everything bought in one session. Add multiple products at once with supplier, date, and payment method.
- **Spending Summary** — Dashboard with total spend, session count, spending by category, by supplier, and by month with charts.
- **Price History** — Automatically tracks price changes per product across sessions. See if rice or oil went up since your last purchase.
- **Reorder Reminders** — Any product not restocked in 14+ days triggers an alert. Never run out of stock without knowing.
- **Export Reports** — Download records as PDF or CSV filtered by date range (7 days, 1 month, 3 months, 6 months, 1 year).
- **100% Private** — Your data belongs to you only. Enforced at the database query level.
- **Admin Dashboard** — Platform-wide stats for admins: total users, sessions, products, and active users (7d/30d).
- **PWA** — Installable on mobile and desktop. Works like a native app.

---

## Tech Stack

### Backend
| | |
|---|---|
| Language | Go 1.26 |
| Framework | Gin |
| ORM | GORM |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (golang-jwt) |
| Password | bcrypt |
| Rate Limiting | golang.org/x/time/rate |
| Deploy | Render |

### Frontend
| | |
|---|---|
| Framework | Nuxt 4 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Pinia |
| Charts | Chart.js |
| Icons | Lucide Vue Next |
| HTTP | $fetch (Nuxt built-in) |
| Deploy | Pxxl |

---

## API Endpoints

### Auth
```
POST   /api/auth/register       — Create account
POST   /api/auth/login          — Login, returns JWT
```

### Settings (Protected)
```
GET    /api/settings/profile    — Get current user profile
PUT    /api/settings/update     — Update name / email
PUT    /api/settings/password   — Change password
DELETE /api/settings/delete     — Delete account
```

### Purchases (Protected)
```
POST   /api/purchases           — Create purchase session
GET    /api/purchases           — List all sessions (paginated)
GET    /api/purchases/:id       — Get single session
PUT    /api/purchases/:id       — Update session
DELETE /api/purchases/:id       — Delete session
```

### Dashboard (Protected)
```
GET    /api/dashboard/summary          — Overview stats, charts data
GET    /api/dashboard/price-history    — Price changes per product
GET    /api/dashboard/reorder-reminders — Products not restocked in 14d+
GET    /api/dashboard/admin            — Admin-only platform stats
```

### Export (Protected)
```
GET    /api/export?format=csv|pdf&range=7days|1month|3months|6months|1year
```

### Health
```
GET    /api/health              — Server health check
GET    /api/                    — API status
```

---

## Project Structure

### Backend
```
BizKeeper-Backend/
├── cmd/
│   └── server/
│       └── main.go
├── config/
│   └── config.go
├── internal/
│   ├── db/
│   │   └── db.go
│   ├── handler/
│   │   ├── auth_handler.go
│   │   ├── purchase_handler.go
│   │   ├── dashboard_handler.go
│   │   └── export_handler.go
│   ├── middleware/
│   │   ├── auth.go
│   │   └── rate_limiter.go
│   ├── model/
│   ├── repository/
│   ├── routes/
│   │   ├── routes.go
│   │   └── auth_routes.go
│   └── services/
└── .env
```

### Frontend
```
BizKeeper-Frontend/
├── app/
│   ├── assets/css/main.css
│   ├── components/
│   │   ├── charts/
│   │   ├── dashboard/
│   │   ├── page/
│   │   ├── purchases/
│   │   ├── shared/
│   │   ├── sidebar/
│   │   ├── theme/
│   │   ├── toast/
│   │   └── topbar/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   │   ├── index.vue
│   │   ├── auth/
│   │   └── dashboard/
│   ├── plugins/
│   ├── stores/
│   ├── types/
│   └── utils/api.ts
├── config/
│   └── seo.config.ts
├── public/
│   ├── favicon.svg
│   └── icons/
└── nuxt.config.ts
```

---

## Getting Started

### Backend

```bash
# Clone the repo
git clone https://github.com/Britinogn/BizKeeper-Backend
cd BizKeeper-Backend

# Install dependencies
go mod tidy

# Set up environment variables
cp .env.example .env
# Fill in your values

# Run
go run ./cmd/server
```

**`.env` variables:**
```env
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_SSLMODE=require
SERVER_PORT=8080
JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://...  # used in production
```

### Frontend

```bash
# Clone the repo
git clone https://github.com/Britinogn/BizKeeper-Frontend
cd BizKeeper-Frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run dev server
npm run dev
```

**`.env` variables:**
```env
NUXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Deployment

### Backend — Render
- Build command: `go build -tags netgo -ldflags '-s -w' -o app ./cmd/server`
- Start command: `./app`
- Set `SUPABASE_URL` (not `DATABASE_URL` — Render injects its own)

### Frontend — Pxxl
- Framework: Nuxt
- Environment variable: `NUXT_PUBLIC_API_URL=https://bizkeeper-backend.onrender.com`

---

## Security

- JWT authentication on all protected routes
- bcrypt password hashing
- Rate limiting: 5 requests/min on auth routes, 30 req/sec on API routes
- CORS restricted to known frontend origins
- Data isolation enforced at DB query level — users can never access each other's data
- Security headers via `vercel.json`

---

## User Roles

| Role | Access |
|---|---|
| `owner` | Full CRUD on their own data only |
| `admin` | Platform-wide aggregate stats, no individual user data |

---

## Roadmap

- [ ] `PUT /api/settings/password` — Change password endpoint
- [ ] Email notifications via ZeptoMail
- [ ] Password reset flow
- [ ] Mobile app (React Native)

---

## Author

Built by [@britinogn](https://github.com/britinogn)  
Twitter: [@britinogn](https://twitter.com/britinogn)  
LinkedIn: [britinogn](https://linkedin.com/in/britinogn)

---

## License

MIT