# Members Only

A role-based message board where post authorship and timestamps are hidden from non-members. Users can sign up, unlock membership or admin privileges via secret codes, and interact with a shared global chat feed.

![screenshot](screenshots/1.png)
![screenshot](screenshots/2.png)

---

## Features

- User registration and login with session persistence
- Three access tiers: Guest, Member, and Admin
- Guests can read posts but see masked usernames and dates
- Members see full post details including author and timestamp
- Admins can delete any post
- Membership and admin access are unlocked via secret codes
- Server-side form validation with inline error messages
- PostgreSQL-backed sessions that survive server restarts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Templating | EJS |
| Authentication | Passport.js (Local Strategy) |
| Session Store | connect-pg-simple + PostgreSQL |
| Database | PostgreSQL (via `pg` pool) |
| Password Hashing | bcryptjs |
| Validation | express-validator |
| Environment | dotenv |

---

## Project Structure

```
.
├── app.js                  # App entry point, middleware and route setup
├── routers/
│   ├── indexRouter.js      # Home, /member, /admin routes
│   ├── signupRouter.js
│   ├── loginRouter.js
│   └── postRouter.js
├── controllers/
│   ├── indexController.js  # Membership and admin code validation
│   ├── signupController.js
│   ├── loginController.js
│   └── postController.js   # Fetch, create, and delete posts
├── middlewares/
│   ├── passport.js         # Passport local strategy configuration
│   └── isAuth.js
├── db/
│   ├── pool.js             # PostgreSQL connection pool
│   ├── queries.js          # All database query functions
│   ├── populate.js         # Script to create tables and seed data
│   └── delete.js
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   └── navbar.ejs
│   ├── index.ejs
│   ├── posts.ejs
│   ├── sign-up.ejs
│   ├── log-in.ejs
│   ├── member.ejs
│   ├── admin.ejs
│   ├── 404.ejs
│   └── error.ejs
└── public/
    ├── stylesheets/
    └── script.js
```

---

## Database Schema

### `members`
| Column | Type | Notes |
|---|---|---|
| mid | INT | Primary key, auto-generated |
| firstname | TEXT | Required |
| lastname | TEXT | Defaults to empty string |
| username | TEXT | Unique, required |
| password | TEXT | Bcrypt hashed |
| is_member | BOOLEAN | Default false |
| is_admin | BOOLEAN | Default false |

### `global_chat`
| Column | Type | Notes |
|---|---|---|
| tid | INT | Primary key, auto-generated |
| message_text | TEXT | Required |
| created_at | TIMESTAMP | Defaults to current time |
| mid | INT | Foreign key referencing members |

### `sessions`
Managed automatically by `connect-pg-simple`.

---

## Getting Started

### Prerequisites

- Node.js
- A PostgreSQL database (local or hosted, e.g. Neon)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/members-only.git
   cd members-only
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   DATABASE_STRING_DEV=postgres://user:password@localhost:5432/your_db
   DATABASE_STRING_PROD=your_production_connection_string
   SESSION_STORE=your_session_secret
   SECRET_CODE_MEMBERSHIP=your_membership_code
   SECRET_CODE_ADMIN=your_admin_code
   ```

4. Set up the database tables and seed data:

   ```bash
   # For development database
   node db/populate.js dev

   # For production database
   node db/populate.js prod
   ```

5. Start the server:

   ```bash
   node app.js
   ```

   The app runs on `http://localhost:3000`.

---

## Usage

**Registering:** Go to `/sign-up` and fill in your name, username, and password.

![screenshot](screenshots/2.png)

**As a Guest:** You can browse posts but usernames and timestamps are hidden.

**Becoming a Member:** Navigate to `/member` and enter the membership code. Once unlocked, all post details become visible.

![screenshot](screenshots/3.png)

**Becoming an Admin:** Navigate to `/admin` and enter the admin code. Admins gain the ability to delete any post and are automatically granted membership as well.

![screenshot](screenshots/4.png)

---

## Access Tiers Summary

| Capability | Guest | Member | Admin |
|---|:---:|:---:|:---:|
| View posts | Yes | Yes | Yes |
| See author / date | No | Yes | Yes |
| Create posts | No | Yes | Yes |
| Delete posts | No | No | Yes |

---

## Notes

- Sessions are stored in PostgreSQL and persist for 30 days
- Sessions are pruned every 23 hours to remove expired entries
- Making a user an admin automatically grants them membership as well
- Posts have a 280 character limit
