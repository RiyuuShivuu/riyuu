"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "open">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering over clickable elements
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-clickable='true']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Special cursor for "books"
      if (target.closest("[data-cursor='open']")) {
        setCursorType("open");
        setIsHovering(false); // Override regular hover
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        // Offset to align the tip of the paper plane with the actual mouse coordinate
        translateX: "-2px",
        translateY: "-2px",
      }}
    >
      {cursorType === "open" ? (
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          className="flex items-center justify-center rounded-full bg-[var(--color-accent)] w-16 h-16 shadow-lg -translate-x-1/2 -translate-y-1/2"
        >
          <span className="text-white text-[10px] tracking-widest font-bold font-sans">OPEN</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Right wing fill */}
            <path d="M2 2 L16 16 L28 12 Z" fill="#DEADA9" />
            {/* Plane outline */}
            <path d="M2 2 L12 28 L16 16 L28 12 Z" stroke="#BB737E" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Center fold */}
            <path d="M2 2 L16 16" stroke="#BB737E" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Dashed trail */}
            <path d="M18 18 L26 26" stroke="#BB737E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 6" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
