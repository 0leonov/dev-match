"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { DevMatch } from "@/components/icons/devmatch";

const MotionLink = motion(Link);

export function HomeLink({ href }: { href: string }) {
  return (
    <MotionLink href={href} whileTap={{ scale: 0.85 }}>
      <DevMatch className="h-11" />
    </MotionLink>
  );
}
