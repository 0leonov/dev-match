"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { appearanceAnimationVariants } from "../lib/appearance-animation-variants";

const MotionLink = motion(Link);

export function HeroSection() {
  return (
    <motion.section
      className="container max-w-screen-md py-16 text-center md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={appearanceAnimationVariants}
        custom={0}
        className="text-4xl font-extrabold tracking-tight sm:text-7xl"
      >
        Where Tech Professionals <span className="text-primary">Unite</span>
      </motion.h1>

      <motion.p
        variants={appearanceAnimationVariants}
        custom={1}
        className="mt-4 text-lg text-muted-foreground sm:text-xl"
      >
        Are you an IT professional seeking thrilling projects, collaboration
        prospects, or like-minded tech enthusiasts to network with?
      </motion.p>

      <MotionLink
        variants={appearanceAnimationVariants}
        custom={2}
        className={cn(buttonVariants({ size: "lg" }), "mt-8")}
        href="/login"
      >
        Join us
      </MotionLink>
    </motion.section>
  );
}
