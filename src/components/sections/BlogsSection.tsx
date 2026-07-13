"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const posts = [
  { id: 1, title: "Why I stopped using adjectives.", date: "Oct 12, 2023", stamp: "bg-rose-400" },
  { id: 2, title: "The psychology of a perfect CTA.", date: "Nov 05, 2023", stamp: "bg-sage-400" },
  { id: 3, title: "Finding voice in a sea of AI.", date: "Jan 22, 2024", stamp: "bg-blue-400" },
];

export default function BlogsSection() {
  const [activePost, setActivePost] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen py-32 px-4 md:px-20 lg:px-40 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-20 text-center">Field Notes</h2>

      <div className="flex flex-wrap justify-center gap-12 max-w-6xl">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            data-clickable="true"
            className="relative w-80 h-56 bg-[#f9f7f1] rounded-sm p-6 shadow-[2px_4px_10px_rgba(0,0,0,0.05)] border border-black/5 cursor-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: "spring" }}
            whileHover={{ 
              scale: 1.02, 
              rotateX: 10, 
              rotateY: -5,
              boxShadow: "10px 20px 30px rgba(0,0,0,0.1)",
              y: -10
            }}
            onClick={() => setActivePost(post.id)}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            {/* Stamp */}
            <div className={`absolute top-4 right-4 w-12 h-16 ${post.stamp} p-1 opacity-80 border-2 border-white rotate-6`} style={{ borderStyle: "dashed" }} />
            
            {/* Wavy cancellation mark */}
            <div className="absolute top-8 right-16 w-20 h-4 border-t-2 border-b-2 border-black/20 rounded-[50%]" />

            <div className="h-full flex flex-col justify-end border-l-2 border-red-200/50 pl-4">
              <span className="font-serif italic text-sm text-[var(--foreground)]/60 mb-2">{post.date}</span>
              <h3 className="font-serif text-2xl text-[var(--foreground)] leading-tight">{post.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-primary)]/90 backdrop-blur-sm"
            onClick={() => setActivePost(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-[#f9f7f1] p-12 md:p-20 shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-4xl font-serif mb-8">Article Title {activePost}</h2>
              <div className="font-sans text-[var(--foreground)]/80 leading-loose space-y-6">
                <p>
                  This is a placeholder for the full article content. When reading this, it should feel like reading 
                  a well-formatted journal entry. Typography is generous, line height is comfortable, and the 
                  experience is completely distraction-free.
                </p>
                <p>
                  As we continue to develop the site, this section will pull real MDX or CMS content, complete with 
                  blockquotes, inline images, and beautiful typographic details.
                </p>
              </div>
              <button 
                onClick={() => setActivePost(null)}
                className="mt-12 text-[var(--color-rose)] uppercase tracking-widest text-sm font-bold border-b border-[var(--color-rose)] pb-1"
                data-clickable="true"
              >
                Close Article
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
