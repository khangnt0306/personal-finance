export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  sort?: string | string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // extra params, nested, array
}

export function buildQueryParams(params?: QueryParams): string {
  if (!params) return ""

  const esc = encodeURIComponent

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const build = (obj: Record<string, any>, prefix = ""): string[] => {
    return Object.keys(obj)
      .filter((k) => obj[k] !== undefined && obj[k] !== null)
      .flatMap((k) => {
        const key = prefix ? `${prefix}[${k}]` : k
        const value = obj[k]

        if (Array.isArray(value)) {
          return value.map((v) => `${esc(key)}=${esc(v)}`)
        } else if (typeof value === "object") {
          return build(value, key)
        } else {
          return `${esc(key)}=${esc(value)}`
        }
      })
  }

  return build(params).join("&") ? `?${build(params).join("&")}` : ""
}

