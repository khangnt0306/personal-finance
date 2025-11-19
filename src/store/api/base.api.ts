import type { EndpointBuilder, EndpointDefinitions } from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { buildQueryParams } from "@utils/queryBuilder"
import type { QueryParams } from "@utils/queryBuilder"

const apiTags = ["Transaction", "Category", "Budget", "Transactions", "Plan"] as const

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE || "/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth?: { token?: string } }
    const token = state.auth?.token
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

export function injectCRUD<Entity extends { id: string | number }>({
  entityName,
  tagType,
  extraEndpoints,
}: BaseCRUDProps) {
  return baseApi.injectEndpoints({
    endpoints: (build) => {
      const endpoints = {
        getAll: build.query<
          { data: Entity[]; total: number; page: number; limit: number },
          QueryParams | undefined
        >({
          query: (params: QueryParams | undefined) =>
            `/${entityName}${buildQueryParams(params || { page: 1, limit: 20 })}`,
          providesTags: tagType ? [{ type: tagType, id: "LIST" }] : undefined,
        }),

        getById: build.query<Entity, string | number>({
          query: (id: string | number) => `/${entityName}/${id}`,
          providesTags: tagType
            ? (result: Entity | undefined) =>
                result ? [{ type: tagType, id: result.id }] : [{ type: tagType, id: "LIST" }]
            : undefined,
        }),

        create: build.mutation<Entity, Partial<Entity>>({
          query: (body: Partial<Entity>) => ({ url: `/${entityName}`, method: "POST", body }),
          invalidatesTags: tagType
            ? [{ type: tagType, id: "LIST" }]
            : undefined,
        }),

        update: build.mutation<
          Entity,
          { id: string | number; data: Partial<Entity> }
        >({
          query: ({ id, data }: { id: string | number; data: Partial<Entity> }) => ({
            url: `/${entityName}/${id}`,
            method: "PUT",
            body: data,
          }),
          invalidatesTags: tagType
            ? (result: Entity | undefined) =>
                result ? [{ type: tagType, id: result.id }] : [{ type: tagType, id: "LIST" }]
            : undefined,
        }),

        remove: build.mutation<
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
