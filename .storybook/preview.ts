import "../src/index.css"

const preview = {
  parameters: {
    layout: "fullscreen",
    docs: {
      autodocs: "tag",
      defaultName: "DocTab",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#0f172a" },
        { name: "plain", value: "#f5f5f4" },
      ],
    },
    options: {
      storySort: {
        order: ["Foundation", "Atoms", "Molecules", "Organisms", "Pages"],
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview