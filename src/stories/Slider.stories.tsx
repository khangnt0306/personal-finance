import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "@components/ui/slider"
import { useState } from "react"

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slider component with glass morphism effect and smooth animations. Features backdrop blur, gradient track, and interactive thumb with hover/scale effects.",
      },
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const DefaultSlider = () => {
  const [value, setValue] = useState([50])
  return (
    <div className="w-64 space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}

const RangeSlider = () => {
  const [value, setValue] = useState([20, 80])
  return (
    <div className="w-64 space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p className="text-sm text-muted-foreground">
        Range: {value[0]} - {value[1]}
      </p>
    </div>
  )
}

const StepsSlider = () => {
  const [value, setValue] = useState([25])
  return (
    <div className="w-64 space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={25} />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <DefaultSlider />,
}

export const Range: Story = {
  render: () => <RangeSlider />,
}

export const WithSteps: Story = {
  render: () => <StepsSlider />,
}

const VolumeSlider = () => {
  const [value, setValue] = useState([75])
  return (
    <div className="w-80 space-y-3 p-6 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Volume</span>
        <span className="text-sm text-muted-foreground">{value[0]}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  )
}

const BudgetSlider = () => {
  const [value, setValue] = useState([5000])
  return (
    <div className="w-80 space-y-3 p-6 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Monthly Budget</span>
        <span className="text-sm font-semibold">${value[0].toLocaleString()}</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={10000} step={100} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$10,000</span>
      </div>
    </div>
  )
}

export const VolumeControl: Story = {
  render: () => <VolumeSlider />,
}

export const BudgetControl: Story = {
  render: () => <BudgetSlider />,
}

