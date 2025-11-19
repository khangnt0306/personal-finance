import type { Variants, Transition, BezierDefinition } from "framer-motion"

export const motionTokens = {
  durations: {
    fast: 0.15,
    base: 0.3,
    slow: 0.5,
  },
  easings: {
    sail: [0.16, 1, 0.3, 1] as [number, number, number, number],
    entrance: [0.16, 1, 0.3, 1] as BezierDefinition,
    exit: [0.7, 0, 0.84, 0] as BezierDefinition,
  },
}

export const withStagger = (delayChildren = 0.08, staggerChildren = 0.04): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
})

export const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionTokens.durations.base,
      ease: motionTokens.easings.entrance as Transition["ease"],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: {
      duration: motionTokens.durations.fast,
      ease: motionTokens.easings.exit as Transition["ease"],
    },
  },
}

export const elevatedTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.9,
}

export const hoverTransform = {
  whileHover: { y: -2, scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: elevatedTransition,
}

export const drawerTransition: Transition = {
  duration: motionTokens.durations.base,
  ease: motionTokens.easings.sail as Transition["ease"],
}

export const overlayTransition: Transition = {
  duration: motionTokens.durations.fast,
  ease: motionTokens.easings.entrance as Transition["ease"],
}

