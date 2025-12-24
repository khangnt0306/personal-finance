import type { EndpointBuilder, EndpointDefinitions } from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { buildQueryParams } from "@utils/queryBuilder"
import type { QueryParams } from "@utils/queryBuilder"
import { authService } from "@features/auth/services/auth.service"
import { MethodName } from "./base.enum"

const apiTags = ["Transaction", "Category", "Budget", "Transactions", "SavingsGoal", "Plan", "MoneySource"] as const

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE || "/api",
  prepareHeaders: (headers) => {
    const token = authService.getToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
    return headers
  },
})

type BaseQueryFn = typeof baseQuery

type ApiTag = (typeof apiTags)[number]
type Builder = EndpointBuilder<BaseQueryFn, ApiTag, "baseApi">

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: apiTags,
  endpoints: () => ({}),
})

const replacePathParams = (url: string, params?: Record<string, string | number>) => {
  if (!params) return url
  let replaced = url
  Object.keys(params).forEach((key) => {
    replaced = replaced.replace(`:${key}`, encodeURIComponent(String(params[key])))
  })
  return replaced
}

interface BaseCRUDProps {
  entityName: string
  tagType?: ApiTag
  extraEndpoints?: (build: Builder) => EndpointDefinitions
}

interface CustomApiConfig {
  name: string
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  tags?: ApiTag[]
  headers?: Record<string, string>
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const normalizeIdentifier = (tagType?: string, entityName?: string) => {
  const fallback = entityName || "Entity"
  const source = tagType || fallback
  const cleaned = source.replace(/[^a-zA-Z0-9]/g, "")
  return capitalize(cleaned || fallback)
}

const genarateName = (method: MethodName, tagType?: string, entityName?: string) => {
  const suffix = normalizeIdentifier(tagType, entityName)

  switch (method) {
    case MethodName.getAll:
      return `getAll${suffix}`
    case MethodName.getById:
      return `get${suffix}ById`
    case MethodName.create:
      return `create${suffix}`
    case MethodName.update:
      return `update${suffix}`
    case MethodName.remove:
      return `remove${suffix}`
    default:
      return method
  }
}

export function injectCRUD<Entity extends { id: string | number }>({
  entityName,
  tagType,
  extraEndpoints,
}: BaseCRUDProps) {
  return baseApi.injectEndpoints({
    endpoints: (build) => {
      const endpoints = {
        [genarateName(MethodName.getAll, tagType, entityName)]: build.query<
          { data: Entity[]; total: number; page: number; limit: number },
          QueryParams | undefined
        >({
          query: (params: QueryParams | undefined) =>
            `/${entityName}${buildQueryParams(params || { page: 1, limit: 20 })}`,
          providesTags: tagType ? [{ type: tagType, id: "LIST" }] : undefined,
        }),

        [genarateName(MethodName.getById, tagType, entityName)]: build.query<Entity, string | number>({
          query: (id: string | number) => `/${entityName}/${id}`,
          providesTags: tagType
            ? (result: Entity | undefined) =>
                result ? [{ type: tagType, id: result.id }] : [{ type: tagType, id: "LIST" }]
            : undefined,
        }),

        [genarateName(MethodName.create, tagType, entityName)]: build.mutation<Entity, Partial<Entity>>({
          query: (body: Partial<Entity>) => ({ url: `/${entityName}`, method: "POST", body }),
          invalidatesTags: tagType
            ? [{ type: tagType, id: "LIST" }]
            : undefined,
        }),

        [genarateName(MethodName.update, tagType, entityName)]: build.mutation<
          Entity,
          { id: string | number; data: Partial<Entity> }
        >({
          query: ({ id, data }: { id: string | number; data: Partial<Entity> }) => ({
            url: `/${entityName}/${id}`,
            method: "PUT",
            body: data,
          }),
          invalidatesTags: tagType
            ? (_result, _error, { id }) => [
                { type: tagType, id },
                { type: tagType, id: "LIST" },
              ]
            : undefined,
        }),

        [genarateName(MethodName.remove, tagType, entityName)]: build.mutation<
          { success: boolean; id: string | number },
          string | number
        >({
          query: (id: string | number) => ({ url: `/${entityName}/${id}`, method: "DELETE" }),
          invalidatesTags: tagType
            ? [{ type: tagType, id: "LIST" }]
            : undefined,
        }),
      } satisfies EndpointDefinitions

      if (extraEndpoints) {
        const extra = extraEndpoints(build)
        return { ...endpoints, ...extra }
      }
      return endpoints
    },
    overrideExisting: false,
  })
}

export function createCustomApi<Response, Body = unknown, Params = unknown>(
  { name, url, method = "GET", tags, headers }: CustomApiConfig,
  build: Builder
): EndpointDefinitions {
  const endpoint =
    method === "GET"
      ? build.query<Response, Params & QueryParams>({
          query: (params: Params & QueryParams) => ({
            url:
              replacePathParams(url, params as Record<string, string | number>) +
              buildQueryParams(params),
            method,
            headers,
          }),
          providesTags: tags?.map((t) => ({ type: t as ApiTag, id: "LIST" })),
        })
      : build.mutation<Response, Body & Params>({
          query: (data: Body & Params) => ({
            url: replacePathParams(url, data as Record<string, string | number>),
            method,
            body: data,
            headers,
          }),
          invalidatesTags: tags?.map((t) => ({ type: t as ApiTag, id: "LIST" })),
        })

  return { [name]: endpoint }
}

