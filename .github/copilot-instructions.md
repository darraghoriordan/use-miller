# AGENTS.md - Agentic Coding Guide

Instructions for AI coding agents working in this pnpm monorepo.

## Project Structure

- `apps/backend` - NestJS 11 API (TypeORM, PostgreSQL, Auth0, Stripe)
- `apps/frontend` - Next.js 14 (React 19, Tailwind CSS 4, React Query)
- `apps/backend-e2e` - E2E tests for backend API
- `libs/project-setup` - Project initialization utilities

## Build/Lint/Test Commands

### Root Level

```bash
pnpm run build          # Build all packages (excludes backend-e2e, frontend)
pnpm run test           # Run tests across all packages
pnpm run lint           # Lint all packages
pnpm run mill:dev       # Start local dev (docker + backend + frontend)
pnpm run knip           # Check for unused code/dependencies
```

### Backend (`apps/backend`)

```bash
pnpm run build          # Build the backend
pnpm run start          # Start in watch mode (development)
pnpm run lint           # Lint with auto-fix
pnpm run test           # Run all tests (Vitest)
pnpm run up             # Start Docker services (PostgreSQL, Redis)
pnpm run down           # Stop Docker services
pnpm run db:run         # Run database migrations
pnpm run db:gen         # Generate new migration
```

### Running a Single Test

```bash
# Backend - run specific test file (Vitest)
cd apps/backend && pnpm run test src/course-files/services/file-scrambler.service.test.ts

# Backend - run tests matching pattern
cd apps/backend && pnpm run test --testNamePattern="partition"

# Backend E2E tests
cd apps/backend-e2e && pnpm run test:e

# Project setup tests (Vitest)
cd libs/project-setup && pnpm run test
```

### Frontend (`apps/frontend`)

```bash
pnpm run build          # Build for production
pnpm run start          # Start development server
pnpm run lint           # Run Next.js linting
```

## Code Style Guidelines

### Formatting (Prettier)

- **Tab width**: 4 spaces (no tabs), **Semicolons**: Always, **Quotes**: Double quotes only

### TypeScript Strictness

All strict checks enabled: `strict`, `noImplicitAny`, `strictNullChecks`, `strictPropertyInitialization`, `noUnusedLocals`, `noImplicitReturns`

### ESM Module System

This project uses ESM (`"type": "module"`). Use `.js` extensions for local imports:

```typescript
import { MyService } from "./my-service.js"; // Correct
import { MyService } from "./my-service"; // Incorrect
```

### File Naming Conventions

| Type             | Pattern                    | Example                          |
| ---------------- | -------------------------- | -------------------------------- |
| Entities         | `kebab-case.entity.ts`     | `org-github-user.entity.ts`      |
| DTOs             | `kebab-case.dto.ts`        | `create-user.dto.ts`             |
| Services         | `kebab-case.service.ts`    | `user-onboarding.service.ts`     |
| Controllers      | `kebab-case.controller.ts` | `payments.controller.ts`         |
| Modules          | `kebab-case.module.ts`     | `payments.module.ts`             |
| Unit tests       | `*.test.ts`                | `file-scrambler.service.test.ts` |
| E2E tests        | `*.e2e-spec.ts`            | `basic-security.e2e-spec.ts`     |
| React components | `PascalCase.tsx`           | `UserProfile.tsx`                |
| React hooks      | `useCamelCase.ts`          | `useAuth.ts`                     |

### Code Naming Conventions

- **Classes/Types/Interfaces**: `PascalCase`
- **Functions/Methods/Variables**: `camelCase`
- **Constants**: `camelCase` or `UPPER_CASE`
- **Enum members**: `UPPER_CASE`
- **Boolean variables**: Must have prefix `is`, `should`, `has`, `can`, `did`, or `will`
- **Private members**: `camelCase` (no leading underscore)

### Import Order

1. Framework imports (NestJS, React)
2. Third-party libraries
3. Shared libraries (`@darraghor/nest-backend-libs`)
4. Local imports (with `.js` extension for backend)

```typescript
// Example backend import order
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestUser } from "@darraghor/nest-backend-libs";
import { MyEntity } from "../models/my-entity.entity.js";
import { HelperService } from "./helper-service.js";
```

### Error Handling

Use NestJS built-in exceptions:

```typescript
import { ForbiddenException, NotFoundException } from "@nestjs/common";

if (!hasPermission) {
    throw new ForbiddenException(
        "You do not have permission to perform this action",
    );
}

if (!entity) {
    throw new NotFoundException("Resource not found");
}
```

Use a Logger instance per service:

```typescript
private readonly logger = new Logger(MyService.name);
```

### Entity & DTO Patterns

```typescript
@Entity()
export class MyEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @Column()
    @ApiProperty()
    name!: string;
}

export class CreateMyDto {
    @IsString()
    @ApiProperty()
    name!: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional()
    url?: string;
}
```

### Testing Patterns (Vitest)

```typescript
describe("MyService", () => {
    const service = new MyService();

    describe("myMethod", () => {
        it("should return expected result", () => {
            expect(service.myMethod("input")).toBe("expected");
        });

        test.each([
            { input: "a", expected: "A" },
            { input: "b", expected: "B" },
        ])("should handle $input", ({ input, expected }) => {
            expect(service.myMethod(input)).toBe(expected);
        });
    });
});
```

### Commit Messages

Uses Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

## Technology Stack

- **Runtime**: Node.js 24.12.0+
- **Package Manager**: pnpm 10.27.0+
- **Backend**: NestJS 11, TypeORM 0.3, PostgreSQL
- **Frontend**: Next.js 14, React 19, Tailwind CSS 4
- **Testing**: Vitest
- **Auth**: Auth0
- **Payments**: Stripe
- **State**: React Query (TanStack Query)
