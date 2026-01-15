# Project Documentation & Implementation Guide

## 1. Project Plan & Milestones

This project is broken down into 5 phases. Total estimated time: 30-40 hours for MVP.

*   **Phase 1: Foundation (Hours 0-4)**
    *   Initialize Next.js App Router.
    *   Setup PostgreSQL (via Supabase) and Prisma.
    *   Configure NextAuth.js (v5) with Google & Email providers.
*   **Phase 2: Data & Admin (Hours 4-12)**
    *   Define Prisma Schema.
    *   Build Admin Dashboard (protected routes).
    *   Implement Cloudinary Upload Widget (Signed uploads).
    *   Create "Add Profile" and "Edit Profile" forms.
*   **Phase 3: Public UI (Hours 12-24)**
    *   Build Homepage with search/filtering (Server Components).
    *   Build Profile Detail Page (Hero, Info).
    *   Implement Masonry Gallery with Infinite Scroll (Client Component).
    *   Build Lightbox overlay.
*   **Phase 4: Interaction (Hours 24-30)**
    *   Implement Favorites system (API + Optimistic UI).
    *   Add Rate Limiting (Upstash).
    *   Responsive Polish & Animations.
*   **Phase 5: Deployment & Security (Hours 30-35)**
    *   Security headers, CORS config.
    *   Vercel Deployment.
    *   Testing (Jest/Playwright).

## 2. Database Schema (Prisma)

Save this as `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  favorites     Favorite[]
}

model Profile {
  id            String    @id @default(cuid())
  name          String
  handle        String    @unique
  bio           String?   @db.Text
  avatarUrl     String?
  heroUrl       String?
  category      String    @default("General")
  tags          String[]
  isVerified    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  images        Image[]
  favoritedBy   Favorite[]
}

model Image {
  id            String    @id @default(cuid())
  url           String
  thumbnailUrl  String
  publicId      String    // Cloudinary Public ID
  caption       String?
  width         Int
  height        Int
  order         Int       @default(0)
  isLocked      Boolean   @default(false)
  profileId     String
  profile       Profile   @relation(fields: [profileId], references: [id], onDelete: Cascade)
}

model Favorite {
  id        String   @id @default(cuid())
  userId    String
  profileId String
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  profile   Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@unique([userId, profileId])
}
```

## 3. API & Upload Logic (Next.js)

### Signed Cloudinary Upload (Server Action / API)
Create `app/api/upload/sign/route.ts`:

```typescript
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  // 1. Auth Check
  const session = await getServerSession();
  if (!session || session.user.role !== 'ADMIN') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Generate Signature
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder: 'fan-directory',
  }, process.env.CLOUDINARY_API_SECRET!);

  return Response.json({ timestamp, signature });
}
```

## 4. Security & Moderation Checklist

1.  **Authentication:** Use NextAuth.js. Ensure `NEXTAUTH_SECRET` is strong.
2.  **Role-Based Access Control (RBAC):** Middleware in Next.js (`middleware.ts`) to block `/admin` routes for non-admins.
3.  **Image Moderation:**
    *   Enable "Cloudinary Add-on: Google Auto Tagging" or "Aws Rekognition" in Cloudinary dashboard settings.
    *   Set up a webhook in Cloudinary to hit your API when an image is flagged.
    *   If flagged, set `isLocked = true` or `visible = false` in DB automatically.
4.  **Rate Limiting:** Use `@upstash/ratelimit` on the upload and auth API routes to prevent spam.
5.  **Sanitization:** Prisma handles SQL injection. Use `zod` to validate all API inputs (body/query params).
6.  **Legal:**
    *   Add a checkbox "I am 18+" on signup.
    *   Create a simple `/legal/dmca` page with a contact email for takedowns.

## 5. Deployment Instructions (Vercel)

1.  **Push to GitHub/GitLab.**
2.  **Import to Vercel:**
    *   Go to Vercel Dashboard -> Add New -> Project -> Import Repository.
3.  **Environment Variables:** Add the following in Vercel Project Settings:
    *   `DATABASE_URL`: Your Supabase/Postgres connection string.
    *   `NEXTAUTH_URL`: `https://your-project.vercel.app` (or localhost for dev).
    *   `NEXTAUTH_SECRET`: Generate using `openssl rand -base64 32`.
    *   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
    *   `API_KEY`: Google Gemini API Key (if using AI features).
4.  **Build Settings:**
    *   Framework Preset: Next.js
    *   Build Command: `next build`
5.  **Deploy.**

## 6. Next Steps

1.  Create a fresh Next.js app: `npx create-next-app@latest my-app --typescript --tailwind --eslint`.
2.  Copy the `prisma/schema.prisma` and run `npx prisma db push`.
3.  Implement the UI components provided in the React code files (adapt them from `react-router` to Next.js `Link` and `Image` component).
