"use client";

import { AnimatePresence, Variants, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "@/shared/assets/logo.svg";
import { buttonVariants } from "@/shared/components/ui/button";
import { pagePaths } from "@/utils/page-paths";

const variants: Variants = {
  hidden: { y: -100 },
  visible: { y: 0 },
};

export function FixedHeader() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed z-10 top-8 left-4 right-4"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="mx-auto p-2 flex items-center justify-between bg-background/80 backdrop-blur border rounded-xl lg:max-w-lg">
            <Logo className="h-10 px-4 py-2 fill-foreground" />

            <Link
              href={pagePaths.login}
              className={buttonVariants({ variant: "ghost" })}
            >
              <span>Login</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
