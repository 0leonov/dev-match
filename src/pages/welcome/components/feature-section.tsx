"use client";

import { motion } from "framer-motion";

import { appearanceAnimationVariants } from "../lib/utils";

import { FeatureSectionCard } from "./feature-section-card";

import { cn } from "@/shared/lib/utils";

export const cards = [
  {
    title: "Project Matchmaking",
    description:
      "Participate in projects that match your skills and passions, where your skills flourish and your contribution is maximised.",
  },
  {
    title: "Professional Networking",
    description:
      "Forge valuable ties within the tech community. Expand networks, share experiences, and grow together.",
  },
  {
    title: "Relationship Building",
    description:
      "Discover a space where friendships and even romantic relationships can develop based on shared interests and aspirations.",
  },
  {
    title: "Expertise Collaboration",
    description:
      "Connect with individuals who can help bring your ideas to fruition, collaborating and leveraging collective expertise.",
  },
];

export function FeatureSection({ className }: { className?: string }) {
  return (
    <section className={cn("container py-8", className)}>
      <motion.ul
        className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cards.map(({ title, description }, index) => (
          <motion.li
            key={title}
            variants={appearanceAnimationVariants}
            custom={index}
          >
            <FeatureSectionCard
              title={title}
              description={description}
              className="max-w-lg h-full mx-auto"
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
