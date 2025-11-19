# API Documentation

This document describes the API utilities and patterns used in the Personal Finance application.

## Table of Contents

- [Query Builder](#query-builder)
- [Base API](#base-api)
- [CRUD Injection](#crud-injection)
- [Custom API Endpoints](#custom-api-endpoints)
- [Transaction API Example](#transaction-api-example)
- [Usage Examples](#usage-examples)

## Query Builder

The `buildQueryParams` utility helps construct URL query strings from JavaScript objects, supporting nested objects, arrays, and proper URL encoding.

### Location

`src/utils/queryBuilder.ts`

### Interface

```typescript
export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  sort?: string | string[]
  [key: string]: any // extra params, nested, array
}
```

### Function

```typescript
export function buildQueryParams(params?: QueryParams): string
```

### Examples

```typescript
import { buildQueryParams } from "@utils/queryBuilder"

// Simple query
buildQueryParams({ page: 1, limit: 20 })
// Returns: "?page=1&limit=20"

// With search and sort
buildQueryParams({ page: 1, limit: 20, search: "food", sort: "date" })
// Returns: "?page=1&limit=20&search=food&sort=date"

// With array
buildQueryParams({ categories: ["food", "transport"] })
// Returns: "?categories=food&categories=transport"

// With nested object
buildQueryParams({ filter: { type: "expense", minAmount: 100 } })
// Returns: "?filter[type]=expense&filter[minAmount]=100"

// Empty or undefined returns empty string
buildQueryParams()
// Returns: ""
```

## Base API

The Base API is built on Redux Toolkit Query and provides a foundation for all API interactions.

### Location

`src/store/api/base.api.ts`

### Configuration

- **Base URL**: Configured via `VITE_API_BASE` environment variable (defaults to `/api`)
- **Authentication**: Automatically adds `Authorization: Bearer <token>` header if token exists in Redux state
- **Tag Types**: Supports caching and invalidation with tag types

### Key Features

- Automatic authentication header injection
- Query parameter building
- Path parameter replacement
- Tag-based cache invalidation

## CRUD Injection

The `injectCRUD` function automatically generates standard CRUD endpoints for any entity.

### Function Signature

```typescript
export function injectCRUD<Entity extends { id: string | number }>({
  entityName: string
  tagType?: string
  extraEndpoints?: (build: any) => Record<string, any>
})
```

### Generated Endpoints

1. **getAll** - GET `/{entityName}?page=1&limit=20`
   - Returns: `{ data: Entity[], total: number, page: number, limit: number }`
   - Accepts: `QueryParams | undefined`

2. **getById** - GET `/{entityName}/{id}`
   - Returns: `Entity`
   - Accepts: `string | number`

3. **create** - POST `/{entityName}`
   - Returns: `Entity`
   - Accepts: `Partial<Entity>`

4. **update** - PUT `/{entityName}/{id}`
   - Returns: `Entity`
   - Accepts: `{ id: string | number, data: Partial<Entity> }`

5. **remove** - DELETE `/{entityName}/{id}`
   - Returns: `{ success: boolean, id: string | number }`
   - Accepts: `string | number`

### Example

```typescript
import { injectCRUD } from "@store/api/base.api"
import type { Transaction } from "@core/types"

export const transactionApi = injectCRUD<Transaction>({
  entityName: "transactions",
  tagType: "Transactions",
})
```

## Custom API Endpoints

The `createCustomApi` function allows you to create custom endpoints beyond standard CRUD operations.

### Function Signature

```typescript
export function createCustomApi<Response, Body = unknown, Params = unknown>(
  {
    name: string
    url: string
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    tags?: string[]
    headers?: Record<string, string>
  },
  build: any
)
```

### Features

- **Path Parameters**: Use `:paramName` in URL (e.g., `/transactions/:id/approve`)
- **Query Parameters**: Automatically handled for GET requests
- **Request Body**: Automatically handled for POST/PUT/PATCH requests
- **Cache Tags**: Automatic tag management for cache invalidation

### Example

```typescript
import { createCustomApi } from "@store/api/base.api"

// In extraEndpoints callback
extraEndpoints: (build) => ({
  ...createCustomApi<Transaction, { reason?: string }, { id: string }>(
    {
      name: "approveTransaction",
      url: "/transactions/:id/approve",
      method: "POST",
      tags: ["Transactions"],
    },
    build
  ),
})
```

## Transaction API Example

A complete example combining CRUD and custom endpoints:

```typescript
import { injectCRUD, createCustomApi } from "@store/api/base.api"
import type { Transaction } from "@core/types"

export const transactionApi = injectCRUD<Transaction>({
  entityName: "transactions",
  tagType: "Transactions",
  extraEndpoints: (build) => ({
    ...createCustomApi<Transaction, { reason?: string }, { id: string }>(
      {
        name: "approveTransaction",
        url: "/transactions/:id/approve",
        method: "POST",
        tags: ["Transactions"],
      },
      build
    ),
    ...createCustomApi<Transaction, { reason?: string }, { id: string }>(
      {
        name: "rejectTransaction",
        url: "/transactions/:id/reject",
        method: "POST",
        tags: ["Transactions"],
      },
      build
    ),
  }),
})
```

## Usage Examples

### Using Generated Hooks

After creating an API with `injectCRUD`, you can use the generated hooks:

```typescript
import { transactionApi } from "@features/transactions/api/transaction.api"

// In a component
function TransactionsList() {
  // Get all transactions with pagination
  const { data, isLoading } = transactionApi.useGetAllQuery({
    page: 1,
    limit: 20,
    search: "food",
  })

  // Get single transaction
  const { data: transaction } = transactionApi.useGetByIdQuery("123")

  // Create mutation
  const [createTransaction] = transactionApi.useCreateMutation()

  // Update mutation
  const [updateTransaction] = transactionApi.useUpdateMutation()

  // Delete mutation
  const [deleteTransaction] = transactionApi.useRemoveMutation()

  // Custom endpoint
  const [approveTransaction] = transactionApi.useApproveTransactionMutation()

  // Usage
  const handleApprove = async () => {
    try {
      await approveTransaction({ id: "123", reason: "Verified" }).unwrap()
    } catch (error) {
      console.error("Failed to approve:", error)
    }
  }

  return (
    // Your component JSX
  )
}
```

### Query Parameters

```typescript
// Pagination
transactionApi.useGetAllQuery({ page: 1, limit: 20 })

// Search
transactionApi.useGetAllQuery({ search: "food" })

// Sorting
transactionApi.useGetAllQuery({ sort: "date" })
transactionApi.useGetAllQuery({ sort: ["date", "amount"] })

// Combined
transactionApi.useGetAllQuery({
  page: 1,
  limit: 20,
  search: "food",
  sort: "date",
  filter: { type: "expense", minAmount: 100 },
})
```

### Mutations

```typescript
// Create
const [create] = transactionApi.useCreateMutation()
await create({
  type: "expense",
  amount: 100,
  categoryId: "cat1",
  description: "Lunch",
  date: "2024-01-15",
}).unwrap()

// Update
const [update] = transactionApi.useUpdateMutation()
await update({
  id: "123",
  data: { amount: 150 },
}).unwrap()

// Delete
const [remove] = transactionApi.useRemoveMutation()
await remove("123").unwrap()

// Custom mutation with path params
const [approve] = transactionApi.useApproveTransactionMutation()
await approve({ id: "123", reason: "Verified" }).unwrap()
```

### Error Handling

```typescript
const [create] = transactionApi.useCreateMutation()

const handleCreate = async () => {
  try {
    const result = await create(data).unwrap()
    // Success
  } catch (error) {
    // Handle error
    if ('status' in error) {
      // RTK Query error
      console.error('Error:', error.data)
    }
  }
}
```

## Environment Variables

Set the API base URL in your `.env` file:

```env
VITE_API_BASE=https://api.example.com
```

If not set, defaults to `/api`.

## Authentication

The Base API automatically includes authentication headers if a token exists in the Redux state at `state.auth.token`. Ensure your Redux store includes an auth slice with a token property.

