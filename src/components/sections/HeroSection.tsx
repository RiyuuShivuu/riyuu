"use client";

import { motion } from "framer-motion";

const titleText = "Creative Copywriter".split("");

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 px-4 md:px-20 lg:px-40" data-clickable="true">
      <div className="max-w-4xl w-full">
        {/* Animated Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--foreground)] mb-8 flex flex-wrap">
          {titleText.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                type: "spring",
                bounce: 0.4
              }}
              className={char === " " ? "w-4 md:w-8" : "inline-block"}
              whileHover={{ 
                y: -10, 
                rotate: 5, 
                color: "var(--color-rose)",
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-xl md:text-2xl text-[var(--foreground)]/80 max-w-2xl leading-relaxed mb-12 font-sans"
        >
          Crafting words that feel like turning the pages of a beloved journal. 
          Deliberate, organic, and entirely unforgettable.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5, type: "spring" }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "var(--color-rose)",
            color: "var(--color-primary)",
            boxShadow: "4px 8px 15px rgba(161, 104, 121, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full border-2 border-[var(--color-rose)] text-[var(--color-rose)] font-semibold tracking-wide transition-colors duration-300"
        >
          Read the Story
        </motion.button>
      </div>
    </section>
  );
}
