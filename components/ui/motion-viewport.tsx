"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionViewportProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
}

export default function MotionViewport({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  className = ""
}: MotionViewportProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // easeOutQuart
      }}
    >
      {children}
    </motion.div>
  );
}
