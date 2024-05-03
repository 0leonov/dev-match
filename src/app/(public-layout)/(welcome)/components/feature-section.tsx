"use client";

import { motion } from "framer-motion";

import { appearanceAnimationVariants, featureSectionCards } from "../lib";

export function FeatureSection() {
  return (
    <section className="container max-w-fit py-8">
      <motion.ul
        className="grid place-items-stretch gap-8 lg:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {featureSectionCards.map(({ title, description }, index) => (
          <motion.li
            key={title}
            variants={appearanceAnimationVariants}
            custom={index + 3}
            className="max-w-md rounded-lg border bg-card p-12 text-center shadow-sm"
          >
            <h2 className="text-4xl tracking-tight text-card-foreground sm:text-5xl">
              {title}
            </h2>

            <p className="mt-8 text-muted-foreground">{description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
