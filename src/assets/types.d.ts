/**
 * Type declarations for assets module
 */

declare module '@assets' {
  export * from './index'
}

declare module '@assets/icons' {
  export * from './icons'
}

declare module '@assets/Icon' {
  export * from './Icon'
}

// SVG imports (for direct imports if needed)
declare module '*.svg' {
  const content: string
  export default content
}

// Image imports
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

