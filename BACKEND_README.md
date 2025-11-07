# Portfolio Backend Documentation

This portfolio website now includes a complete backend system with authentication and CRUD operations for managing content.

## Features

- **Authentication**: Secure login system using NextAuth.js
- **Database**: SQLite database managed with Prisma ORM
- **Admin Dashboard**: Full-featured admin interface
- **CRUD Operations**: Complete management for:
  - Articles (Blog posts)
  - Projects (Portfolio items)
  - Career Events (Timeline/roadmap)

## Getting Started

### 1. Database Setup

The database is already initialized with the schema. To seed it with sample data:

```bash
npm run db:seed
```

This creates:
- Admin user (email: `admin@example.com`, password: `admin123`)
- Sample article
- Sample project
- Sample career event

### 2. Environment Variables

The `.env` file contains:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

**Important**: Change `NEXTAUTH_SECRET` in production!

### 3. Access Admin Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

3. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`

## API Endpoints

### Authentication

- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get current session

### Articles

- `GET /api/articles` - Get all articles
  - Query params: `?published=true` (filter published only)
- `POST /api/articles` - Create article (protected)
- `GET /api/articles/[id]` - Get single article
- `PUT /api/articles/[id]` - Update article (protected)
- `DELETE /api/articles/[id]` - Delete article (protected)

### Projects

- `GET /api/projects` - Get all projects
  - Query params: `?published=true` (filter published only)
- `POST /api/projects` - Create project (protected)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (protected)
- `DELETE /api/projects/[id]` - Delete project (protected)

### Career Events

- `GET /api/career` - Get all career events
  - Query params: `?published=true` (filter published only)
- `POST /api/career` - Create career event (protected)
- `GET /api/career/[id]` - Get single career event
- `PUT /api/career/[id]` - Update career event (protected)
- `DELETE /api/career/[id]` - Delete career event (protected)

## Database Schema

### User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Article
```prisma
model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  content     String
  image       String
  category    String
  tags        String   // JSON array
  views       Int      @default(0)
  likes       Int      @default(0)
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Project
```prisma
model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  image       String
  category    String
  tags        String   // JSON array
  demoUrl     String?
  githubUrl   String?
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### CareerEvent
```prisma
model CareerEvent {
  id          String   @id @default(cuid())
  year        String
  title       String
  company     String?
  description String
  type        String   // education, work, achievement, certification
  icon        String?
  published   Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Admin Routes

- `/admin/login` - Login page
- `/admin` - Dashboard (protected)
- `/admin/articles` - Manage articles (to be implemented)
- `/admin/projects` - Manage projects (to be implemented)
- `/admin/career` - Manage career events (to be implemented)

## Security

- All API mutations (POST, PUT, DELETE) require authentication
- Passwords are hashed using bcrypt
- Sessions are managed using JWT tokens
- Protected routes automatically redirect to login if not authenticated

## Development Commands

```bash
# Run development server
npm run dev

# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Seed database
npm run db:seed

# View database in Prisma Studio
npx prisma studio
```

## Next Steps

To complete the admin interface, you'll need to create management pages:

1. `/admin/articles` - List and manage articles
2. `/admin/articles/new` - Create new article
3. `/admin/articles/[id]/edit` - Edit article
4. `/admin/projects` - List and manage projects
5. `/admin/projects/new` - Create new project
6. `/admin/projects/[id]/edit` - Edit project
7. `/admin/career` - List and manage career events
8. `/admin/career/new` - Create new career event
9. `/admin/career/[id]/edit` - Edit career event

These pages should use the API endpoints created above to perform CRUD operations.

## Production Deployment

Before deploying to production:

1. Change `NEXTAUTH_SECRET` to a secure random string
2. Update `NEXTAUTH_URL` to your production URL
3. Consider switching to PostgreSQL for production (update DATABASE_URL)
4. Change the default admin password
5. Add proper error handling and validation
6. Implement rate limiting on API routes
7. Add image upload functionality (currently using URLs)

## Support

For issues or questions about the backend implementation, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
