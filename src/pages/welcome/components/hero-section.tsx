"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { appearanceAnimationVariants } from "../lib/utils";

import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { pagePaths } from "@/utils/page-paths";

const MotionLink = motion(Link);

export function HeroSection({ className }: { className?: string }) {
  return (
    <motion.section
      className={cn("container py-8", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-lg mx-auto">
        <motion.h2
          variants={appearanceAnimationVariants}
          custom={1}
          className="font-semibold tracking-tight text-2xl sm:text-3xl"
        >
          Welcome to <span className="text-primary">Dev Match</span>!
        </motion.h2>

        <motion.h1
          variants={appearanceAnimationVariants}
          custom={2}
          className="font-extrabold tracking-tight text-5xl"
        >
          «Where Tech Professionals <span className="text-primary">Unite</span>»
        </motion.h1>

        <motion.p
          variants={appearanceAnimationVariants}
          custom={3}
          className="mt-6"
        >
          Are you an IT professional seeking thrilling projects, collaboration
          prospects, or like-minded tech enthusiasts to network with?
        </motion.p>

        <MotionLink
          variants={appearanceAnimationVariants}
          custom={4}
          href={pagePaths.register}
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Join us
        </MotionLink>
      </div>
    </motion.section>
  );
}
