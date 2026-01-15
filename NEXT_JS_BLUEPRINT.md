# Next.js Production Blueprint

This guide allows you to migrate from the React prototype to a fully functional, production-ready Next.js application hosted on Vercel.

## 1. Project Setup

### Commands
```bash
npx create-next-app@latest fan-directory --typescript --tailwind --eslint
cd fan-directory
pnpm install @prisma/client next-auth @auth/prisma-adapter lucide-react cloudinary clsx tailwind-merge
pnpm install -D prisma
npx prisma init
```

### File Structure
```
/fan-directory
├── prisma/
│   └── schema.prisma       # Database Schema
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # NextAuth endpoints
│   │   │   ├── upload/     # Image upload endpoints
│   │   │   └── profiles/   # CRUD API
│   │   ├── (admin)/        # Admin routes (protected)
│   │   │   ├── admin/      # Admin Dashboard
│   │   │   └── layout.tsx  # Admin Layout
│   │   ├── (public)/       # Visitor routes
│   │   │   ├── profile/    # Profile Detail
│   │   │   └── page.tsx    # Homepage
│   │   └── layout.tsx      # Root Layout
│   ├── components/         # React Components
│   │   ├── admin/          # Admin specific components
│   │   ├── ui/             # Generic UI (Button, Input)
│   │   └── gallery/        # Gallery & Lightbox
│   ├── lib/
│   │   ├── prisma.ts       # DB Client
│   │   └── utils.ts        # Helper functions
│   └── types/              # TS Interfaces
├── .env                    # Environment variables
└── next.config.js          # Next.js config
```

## 2. Database Schema (Prisma)

Replace `prisma/schema.prisma` with:

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
  password      String?   // Hashed, null if OAuth
  name          String?
  image         String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
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
  isVisible     Boolean   @default(true)
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
  isLocked      Boolean   @default(false) // Members only
  isVisible     Boolean   @default(true)  // Soft delete
  createdAt     DateTime  @default(now())
  
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

## 3. Authentication (NextAuth v5)

Create `src/auth.ts`:
```typescript
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Implement password verification (bcrypt) here
        // This is a stub for the blueprint
        const user = await prisma.user.findUnique({
           where: { email: credentials.email as string } 
        });
        if (!user) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    }
  }
})
```

Create `src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

## 4. API Routes

### Image Upload (Signed URL)
`src/app/api/upload/sign/route.ts`
```typescript
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const session = await auth();
  
  // Role-based Access Control (RBAC)
  if (!session || session.user.role !== 'ADMIN') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp,
    folder: 'fan-directory',
  }, process.env.CLOUDINARY_API_SECRET!);

  return Response.json({ timestamp, signature, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
}
```

### Profile Management (Admin)
`src/app/api/admin/profiles/route.ts`
```typescript
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const profile = await prisma.profile.create({
    data: {
      name: body.name,
      handle: body.handle,
      bio: body.bio,
      category: body.category,
      tags: body.tags,
      isVisible: body.isVisible,
      // Create images in transaction
      images: {
        create: body.images.map((img: any) => ({
           url: img.url,
           thumbnailUrl: img.thumbnailUrl,
           publicId: img.publicId,
           width: img.width,
           height: img.height,
           isLocked: img.isLocked
        }))
      }
    }
  });
  return Response.json(profile);
}
```

## 5. Deployment Instructions (Vercel)

1. **Environment Variables**:
   Set these in your Vercel Project Settings:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/db"
   NEXTAUTH_SECRET="your-generated-secret"
   NEXTAUTH_URL="https://your-app.vercel.app"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   API_KEY="google-gemini-key-for-bio-gen"
   ```

2. **Build Settings**:
   - Build Command: `prisma generate && next build`
   - Install Command: `pnpm install`
   
3. **Database Migration**:
   For production database updates (Supabase/Neon/Vercel Postgres):
   ```bash
   npx prisma migrate deploy
   ```

## 6. Security Checklist

- [ ] **Role Checks**: Ensure every API route under `/api/admin/*` checks `session.user.role === 'ADMIN'`.
- [ ] **Middleware**: Use `middleware.ts` to redirect unauthenticated users away from `/admin/*`.
- [ ] **Image Optimization**: Use `next/image` with configured `remotePatterns` in `next.config.js` to prevent abuse of external image loading.
- [ ] **Content Moderation**: Use Cloudinary's "Rekognition AI" add-on to auto-flag adult content on upload and set `isVisible = false` until reviewed.
