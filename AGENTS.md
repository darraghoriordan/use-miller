# AGENTS.md - Agentic Coding Guide

This document provides instructions for AI coding agents working in this monorepo.

## Project Overview

This is a pnpm monorepo containing:

- `apps/backend` - NestJS 11 API with TypeORM, PostgreSQL, Auth0, Stripe
- `apps/frontend` - Next.js 14 with React 18, Tailwind CSS 4, React Query
- `apps/backend-e2e` - End-to-end tests for the backend API
- `libs/shared-api-client` - Auto-generated TypeScript API client
- `libs/project-setup` - Project initialization utilities

## Build/Lint/Test Commands

### Root Level (from repository root)

```bash
pnpm run build          # Build all packages (excludes backend-e2e, frontend)
pnpm run test           # Run tests across all packages
pnpm run lint           # Lint all packages
pnpm run mill:dev       # Start local development (docker + backend + frontend)
pnpm run mill:init      # Full project initialization
pnpm run knip           # Check for unused code/dependencies
```

### Backend (`apps/backend`)

```bash
pnpm run build          # Build the backend
pnpm run start          # Start in watch mode (development)
pnpm run start:prod     # Start production build
pnpm run lint           # Lint with auto-fix
pnpm run test           # Run all tests
pnpm run up             # Start Docker services (PostgreSQL, Redis)
pnpm run down           # Stop Docker services
pnpm run db:run         # Run database migrations
pnpm run db:gen         # Generate new migration
```

### Running a Single Test

```bash
# Backend - run test by file path pattern
cd apps/backend && pnpm run test -- --testPathPattern="file-scrambler"

# Backend - run specific test file
cd apps/backend && pnpm run test -- src/course-files/services/file-scrambler.service.test.ts

# Backend E2E - run all e2e tests
cd apps/backend-e2e && pnpm run test:e

# Project setup tests (uses Vitest)
cd libs/project-setup && pnpm run test
```

### Frontend (`apps/frontend`)

```bash
pnpm run build          # Build for production
pnpm run start          # Start development server
pnpm run start:prod     # Start production server
pnpm run lint           # Run Next.js linting
pnpm run prettier       # Format source files
```

## Code Style Guidelines

### Formatting (Prettier)

- **Tab width**: 4 spaces
- **Semicolons**: Always required
- **Quotes**: Double quotes (no single quotes)
- **Tabs**: Use spaces, not tabs

### TypeScript Strictness

All strict checks are enabled:

- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictPropertyInitialization: true`
- `noUnusedLocals: true`
- `noImplicitReturns: true`

### ESM Module System

This project uses ESM (`"type": "module"`). When importing local files, use `.js` extensions:

```typescript
// Correct
import { MyService } from "./my-service.js";

// Incorrect
import { MyService } from "./my-service";
```

### Naming Conventions

#### Files

- **Entities**: `kebab-case.entity.ts` (e.g., `org-github-user.entity.ts`)
- **DTOs**: `kebab-case.dto.ts` or `PascalCase.dto.ts`
- **Services**: `kebab-case.service.ts`
- **Controllers**: `kebab-case.controller.ts`
- **Modules**: `kebab-case.module.ts`
- **Unit tests**: `*.test.ts` (co-located with source)
- **E2E tests**: `*.e2e-spec.ts`
- **React components**: `PascalCase.tsx`
- **React hooks**: `useCamelCase.ts`

#### Code

- **Classes/Types/Interfaces**: `PascalCase`
- **Functions/Methods/Variables**: `camelCase`
- **Constants**: `camelCase` or `UPPER_CASE`
- **Enum members**: `UPPER_CASE`
- **Boolean variables**: Must have prefix `is`, `should`, `has`, `can`, `did`, or `will`
- **Private members**: `camelCase` (no leading underscore)

### Import Organization

Order imports as follows:

1. External/framework imports (NestJS, React, etc.)
2. Third-party library imports
3. Shared library imports (`@darraghor/nest-backend-libs`, `@use-miller/shared-api-client`)
4. Local imports (with `.js` extension for backend)

```typescript
// Example backend import order
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestUser } from "@darraghor/nest-backend-libs";
import { MyEntity } from "../models/my-entity.entity.js";
import { HelperService } from "./helper-service.js";
```

### Error Handling

#### Backend (NestJS)

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

#### Entities (TypeORM)

```typescript
@Entity()
export class MyEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @Column()
    @ApiProperty()
    name!: string;

    @CreateDateColumn()
    @ApiProperty()
    createdAt!: Date;
}
```

#### DTOs (class-validator)

```typescript
export class CreateMyEntityDto {
    @IsString()
    @ApiProperty()
    name!: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional()
    url?: string;
}
```

### Testing Patterns

#### Unit Tests (Jest)

```typescript
describe("MyService", () => {
    const service = new MyService();

    describe("myMethod", () => {
        it("should return expected result", () => {
            expect(service.myMethod("input")).toBe("expected");
        });

        // Use test.each for parameterized tests
        test.each([
            { input: "a", expected: "A" },
            { input: "b", expected: "B" },
        ])("should handle $input", ({ input, expected }) => {
            expect(service.myMethod(input)).toBe(expected);
        });
    });
});
```

### Commit Message Convention

Uses Conventional Commits:

```
feat: add new feature
fix: resolve bug in component
refactor: restructure code
docs: update documentation
test: add unit tests
chore: update dependencies
```

## Technology Stack Reference

- **Runtime**: Node.js 20.12.2+
- **Package Manager**: pnpm 8.15.1+
- **Backend**: NestJS 11, TypeORM 0.3, PostgreSQL
- **Frontend**: Next.js 14, React 18, Tailwind CSS 4
- **Auth**: Auth0
- **Payments**: Stripe
- **State**: React Query (TanStack Query)
- **Observability**: OpenTelemetry
