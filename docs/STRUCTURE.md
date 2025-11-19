# Project Structure

This document describes the file structure, organization patterns, and conventions used in the Personal Finance application.

## Table of Contents

- [Root Directory](#root-directory)
- [Source Directory Structure](#source-directory-structure)
- [Path Aliases](#path-aliases)
- [Feature-Based Architecture](#feature-based-architecture)
- [Naming Conventions](#naming-conventions)
- [File Organization](#file-organization)

## Root Directory

```
personal-finance/
├── docs/                    # Project documentation
│   ├── API.md              # API utilities documentation
│   └── STRUCTURE.md        # This file
├── public/                 # Static assets
├── src/                    # Source code
├── dist/                   # Build output
├── node_modules/           # Dependencies
├── .env                    # Environment variables
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project readme
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app configuration
├── tsconfig.node.json      # TypeScript node configuration
└── vite.config.ts          # Vite configuration
```

## Source Directory Structure

```
src/
├── app/                    # Application setup and configuration
│   ├── App.tsx            # Main app component
│   ├── providers/         # Context providers
│   │   └── ReduxProvider.tsx
│   └── router/            # Routing configuration
│       └── index.tsx
├── assets/                 # Static assets (images, icons)
├── components/             # Shared UI components
│   ├── molecules/         # Molecule components
│   ├── organisms/         # Organism components
│   └── ui/                # Base UI components (shadcn/ui)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── tabs.tsx
├── core/                   # Core business logic and utilities
│   ├── adapters/          # Data adapters (storage, API)
│   │   ├── mock-data.ts
│   │   └── storage.adapter.ts
│   ├── config/            # Configuration files
│   │   └── app.config.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── format.ts
│   └── validation/        # Validation schemas (Zod)
│       └── schemas.ts
├── features/               # Feature modules (feature-based architecture)
│   ├── budgets/
│   │   ├── api/           # API definitions (RTK Query)
│   │   ├── components/    # Feature-specific components
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── ui/
│   │   ├── hooks/         # Feature-specific hooks
│   │   ├── pages/         # Feature pages
│   │   ├── services/      # Business logic services
│   │   └── index.ts       # Feature exports
│   ├── categories/
│   │   └── [same structure]
│   └── transactions/
│       ├── api/
│       │   └── transaction.api.ts
│       └── [same structure]
├── hooks/                  # Shared custom hooks
├── layouts/                # Layout components
│   └── DashboardLayout.tsx
├── lib/                    # Third-party library configurations
│   └── utils.ts           # Utility functions (e.g., cn for className)
├── pages/                  # Top-level pages
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── store/                  # Redux store configuration
│   ├── api/               # RTK Query API definitions
│   │   └── base.api.ts
│   ├── hooks.ts           # Typed Redux hooks
│   ├── index.ts           # Store configuration
│   ├── selectors/         # Redux selectors
│   └── slices/            # Redux slices
├── styles/                 # Global styles
├── utils/                  # Shared utility functions
│   └── queryBuilder.ts   # Query parameter builder
├── App.css                # App styles
├── App.tsx                # Legacy app component (if exists)
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports. Configured in `tsconfig.app.json` and `vite.config.ts`:

| Alias | Path | Usage |
|-------|------|-------|
| `@app/*` | `src/app/*` | App configuration and setup |
| `@core/*` | `src/core/*` | Core business logic, types, utilities |
| `@store/*` | `src/store/*` | Redux store and API |
| `@features/*` | `src/features/*` | Feature modules |
| `@components/*` | `src/components/*` | Shared UI components |
| `@hooks/*` | `src/hooks/*` | Shared custom hooks |
| `@layouts/*` | `src/layouts/*` | Layout components |
| `@pages/*` | `src/pages/*` | Top-level pages |
| `@assets/*` | `src/assets/*` | Static assets |
| `@lib/*` | `src/lib/*` | Library utilities |
| `@utils/*` | `src/utils/*` | Shared utility functions |

### Import Examples

```typescript
// Using path aliases
import { Transaction } from "@core/types"
import { baseApi } from "@store/api/base.api"
import { TransactionList } from "@features/transactions/components/organisms/transaction-list"
import { Button } from "@components/ui/button"
import { buildQueryParams } from "@utils/queryBuilder"
```

## Feature-Based Architecture

The project follows a **feature-based architecture** where each feature is self-contained with its own:

- **API definitions** (`api/`) - RTK Query endpoints
- **Components** (`components/`) - Feature-specific UI components
- **Hooks** (`hooks/`) - Feature-specific React hooks
- **Pages** (`pages/`) - Feature pages/routes
- **Services** (`services/`) - Business logic (optional, for local storage)
- **Index** (`index.ts`) - Public API exports

### Feature Structure Example

```
features/transactions/
├── api/
│   └── transaction.api.ts      # RTK Query API
├── components/
│   ├── molecules/              # Small, reusable components
│   │   └── transaction-item.tsx
│   ├── organisms/             # Complex, composed components
│   │   ├── transaction-form-modal.tsx
│   │   └── transaction-list.tsx
│   └── ui/                    # Feature-specific UI components
├── hooks/
│   └── useTransactions.ts     # Feature-specific hooks
├── pages/
│   └── TransactionsPage.tsx   # Feature page
├── services/
│   └── transaction.service.ts # Business logic (local storage)
└── index.ts                   # Public exports
```

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (e.g., `TransactionList.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTransactions.ts`)
- **Utilities**: camelCase (e.g., `queryBuilder.ts`, `format.ts`)
- **Types**: PascalCase (e.g., `Transaction`, `QueryParams`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Directories**: kebab-case (e.g., `transaction-list/`)

### Code

- **Variables/Functions**: camelCase
- **Components**: PascalCase
- **Types/Interfaces**: PascalCase
- **Enums**: PascalCase with PascalCase values
- **Constants**: UPPER_SNAKE_CASE

### Examples

```typescript
// Component
export const TransactionList = () => { ... }

// Hook
export const useTransactions = () => { ... }

// Utility function
export const buildQueryParams = (params) => { ... }

// Type
export interface Transaction { ... }

// Constant
export const API_BASE_URL = "https://api.example.com"
```

## File Organization

### Component Organization (Atomic Design)

- **UI Components** (`components/ui/`): Base, reusable components (buttons, inputs, etc.)
- **Molecules** (`components/molecules/`): Small, composed components
- **Organisms** (`components/organisms/`): Complex, feature-specific components

### API Organization

- **Base API** (`store/api/base.api.ts`): Core RTK Query setup and utilities
- **Feature APIs** (`features/{feature}/api/`): Feature-specific API endpoints

### Type Organization

- **Core Types** (`core/types/index.ts`): Shared type definitions
- **Feature Types**: Can be defined in feature directories or imported from core

### Utility Organization

- **Core Utils** (`core/utils/`): Business logic utilities (formatting, calculations)
- **Shared Utils** (`utils/`): General-purpose utilities (query builder, helpers)
- **Lib Utils** (`lib/utils.ts`): Third-party library utilities (e.g., `cn` for className)

## Best Practices

### 1. Feature Isolation

- Each feature should be self-contained
- Minimize cross-feature dependencies
- Use shared components and utilities from `@components` and `@core`

### 2. Import Organization

```typescript
// 1. External dependencies
import React from "react"
import { useQuery } from "@reduxjs/toolkit/query/react"

// 2. Internal path aliases (alphabetical)
import { Transaction } from "@core/types"
import { Button } from "@components/ui/button"
import { transactionApi } from "@features/transactions/api/transaction.api"

// 3. Relative imports
import { TransactionList } from "./components/organisms/transaction-list"
```

### 3. File Exports

- Use `index.ts` files for clean public APIs
- Export only what's needed by other features
- Keep internal implementation details private

### 4. Type Safety

- Define types in `core/types` for shared entities
- Use TypeScript strictly (no `any` unless necessary)
- Leverage type inference where possible

### 5. Component Structure

```typescript
// 1. Imports
import ...

// 2. Types/Interfaces
interface ComponentProps { ... }

// 3. Component
export const Component = ({ prop }: ComponentProps) => {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Handlers
  const handleClick = () => { ... }
  
  // 6. Effects
  useEffect(() => { ... }, [])
  
  // 7. Render
  return <div>...</div>
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE=https://api.example.com
```

Access in code:

```typescript
const apiBase = import.meta.env.VITE_API_BASE || "/api"
```

## Build and Development

- **Development**: `npm run dev` or `yarn dev`
- **Build**: `npm run build` or `yarn build`
- **Lint**: `npm run lint` or `yarn lint`
- **Preview**: `npm run preview` or `yarn preview`

## Additional Resources

- [API Documentation](./API.md) - Detailed API usage guide
- [README.md](../README.md) - Project overview and setup

