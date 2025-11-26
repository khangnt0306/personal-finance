import { baseApi } from "@store/api/base.api"
import type { LoginRequest, LoginResponse } from "../dto/login.dto"
import type { RegisterRequest, RegisterResponse } from "../dto/register.dto"


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation } = authApi

