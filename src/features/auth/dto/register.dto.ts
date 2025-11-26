export interface RegisterRequest {
  full_name: string
  email: string
  password: string
}

export interface RegisterResponse {
    accessToken: string
    full_name: string
    email: string
    avatar?: string
}

