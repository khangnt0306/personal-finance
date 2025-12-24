export interface BaseResponse<T> {
  data?: T
  status: number
}

export interface ErrorResponse {
  status: number
  message?: string[]
}

export interface BaseResponseWithMessage {
  data?: ErrorResponse
  status: number
}