import { Variants } from "framer-motion";

export const appearanceAnimationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    opacity: 100,
    transition: { delay: custom * 0.1, duration: 1 },
  }),
} satisfies Variants;
