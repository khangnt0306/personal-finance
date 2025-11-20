import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Card, CardContent } from "@components/ui/card"

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar component with glass morphism effect and smooth animations. Features backdrop blur, gradient overlays on hover, and fade-in transitions for images.",
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid-url.png" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const UserList: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Shadcn</p>
            <p className="text-xs text-muted-foreground">@shadcn</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Alice Brown</p>
            <p className="text-xs text-muted-foreground">alice@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

export const WithHover: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover to see glass effect</p>
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}

