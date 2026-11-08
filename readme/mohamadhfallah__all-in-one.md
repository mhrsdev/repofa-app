# All In One Turborepo Starter 🚀

A modern full-stack monorepo starter built with Turborepo, featuring a type-safe architecture with shared packages between vite(frontend) and backend.

## ✨ Highlights

- 🔒 **Type-safe full stack** with TypeScript
- 📦 **Shared types** between frontend and backend
- 🏗️ **NestJS** with **Prisma ORM** for robust backend
- 📚 **Swagger** auto-generated API documentation
- 🔄 **Auto-generated API clients** for React from backend
- 🎨 **Tailwind CSS** + **shadcn/ui** for beautiful UI components
- ⚡ **TanStack Query** for powerful data fetching

## 🛠️ Tech Stack

### Backend
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Swagger](https://swagger.io/)** - API documentation
- **Database** PostgreSQL

### vite
- **[React](https://reactjs.org/)** with TypeScript
- **[Tailwind CSS](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Vite](https://vitejs.dev/)** - Build tool





## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or later)
- **pnpm** (v9 or later)

### Installation

```bash
# Clone the repository
git clone git@github.com:MohamadHFallah/all-in-one.git
cd all-in-one

# Install dependencies
pnpm install

# Build all packages and apps
pnpm build


pnpm dev

# Or run specific apps
cd apps/vite/
pnpm dev    # Start only vite (http://localhost:5174)

cd apps/backend/
pnpm dev     # Start only backend (http://localhost:3000)

```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:pass@localhost:5432/dbName?schema=public"
CORS_ORIGIN=
```
### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/
```

### API Flow
Backend defines API with NestJS decorators

Swagger generates OpenAPI specification

API Client package auto-generates type-safe hooks

vite (Frontend) imports and uses generated API client


```typescript
// Backend controller (NestJS)
@Controller('users')
 @ApiOperation({
    operationId: 'createUser',
    summary: 'Create a new user',
    description: 'Creates a new user account with the provided information'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: CreateUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

// vite(Frontend) usage

function UsersPage() {
   const { mutate } = useMutation({
        ...createUserMutation()
    })
  
  return (
    <>
         <button onClick={() =>  mutate({ body: { firstName: "Emad", "lastName": "bar" } })}
         >
                {"Create user"}
            </button>
    </>
  )
}
```


### API Documentation

When the backend is running, access Swagger documentation:

```bash
http://localhost:3000/docs
```