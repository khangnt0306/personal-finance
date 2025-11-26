import { baseApi } from "@store/api/base.api"
import type { Category } from "@core/types"
import type { CategoryFormData } from "@core/validation/schemas"

interface BaseResponse<T> {
  data: T
  message?: string
  success: boolean
}

interface CategoriesResponse {
  categories: Category[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSelfCategories: build.query<CategoriesResponse, void>({
      query: () => `/categories/self`,
      providesTags: (result) =>
        result
          ? [
              ...result.categories.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    createCategory: build.mutation<BaseResponse<Category>, CategoryFormData>({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: build.mutation<
      BaseResponse<Category>,
      { id: string; data: CategoryFormData }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    deleteCategory: build.mutation<BaseResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetSelfCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi

