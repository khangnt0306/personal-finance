import { motion } from "framer-motion"
import { MotionButton } from "@components/ui/motion-button"
import type { AnimatedHeroProps } from "./animated-hero.props"

export const AnimatedHero = ({ title, subtitle, ctaLabel, onCtaClick, prefix }: AnimatedHeroProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-background to-primary/10 p-8 md:p-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">{prefix}</p>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
        <MotionButton
          className="mt-6"
          size="lg"
          onClick={onCtaClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {ctaLabel}
        </MotionButton>
      </motion.div>
    </div>
  )
}


