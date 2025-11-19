import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-docs", "@storybook/addon-onboarding", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (baseConfig) => {
    baseConfig.resolve ??= { alias: {} }
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      "@app": path.resolve(__dirname, "../src/app"),
      "@core": path.resolve(__dirname, "../src/core"),
      "@store": path.resolve(__dirname, "../src/store"),
      "@features": path.resolve(__dirname, "../src/features"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@layouts": path.resolve(__dirname, "../src/layouts"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@lib": path.resolve(__dirname, "../src/lib"),
      "@utils": path.resolve(__dirname, "../src/utils"),
    }

    return baseConfig
  },
}

export default config