"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-[80vh] py-32 px-4 md:px-20 lg:px-40 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl relative">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                rotateX: 90, 
                scale: 0.8,
                transition: { duration: 0.8 } 
              }}
              viewport={{ once: true }}
              className="bg-[#f9f7f1] p-12 md:p-20 shadow-xl rounded-sm relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.05) 32px)',
                backgroundPosition: '0 1.5rem',
                transformOrigin: "bottom center"
              }}
            >
              <h2 className="text-4xl font-serif text-[var(--foreground)] mb-8">Let's write something together.</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col space-y-8 font-sans">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-[var(--foreground)]/60 mb-2">Dear,</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name" 
                    className="w-full bg-transparent border-b border-[var(--foreground)]/20 pb-2 focus:outline-none focus:border-[var(--color-rose)] transition-colors text-xl font-serif italic"
                    style={{ lineHeight: "32px" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm uppercase tracking-widest text-[var(--foreground)]/60 mb-2">My email is</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@domain.com" 
                    className="w-full bg-transparent border-b border-[var(--foreground)]/20 pb-2 focus:outline-none focus:border-[var(--color-rose)] transition-colors text-xl font-serif italic"
                    style={{ lineHeight: "32px" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm uppercase tracking-widest text-[var(--foreground)]/60 mb-2">And I want to say</label>
                  <textarea 
                    required
                    placeholder="Write your message here..." 
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--foreground)]/20 pb-2 focus:outline-none focus:border-[var(--color-rose)] transition-colors text-xl font-serif italic resize-none"
                    style={{ lineHeight: "32px" }}
                  />
                </div>
                
                <div className="flex justify-between items-center pt-8">
                  <div className="flex gap-6 text-[var(--foreground)]/60">
                    <a href="#" className="hover:text-[var(--color-rose)] transition-colors font-sans uppercase tracking-widest text-sm" data-clickable="true">LinkedIn</a>
                    <a href="#" className="hover:text-[var(--color-rose)] transition-colors font-sans uppercase tracking-widest text-sm" data-clickable="true">Twitter</a>
                  </div>
                  <button 
                    type="submit"
                    data-clickable="true"
                    className="px-8 py-3 bg-[var(--color-rose)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-sage)] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-[#f9f7f1] p-20 shadow-xl rounded-sm flex flex-col items-center justify-center text-center border-t-8 border-[var(--color-rose)]"
            >
              <h2 className="text-4xl font-serif text-[var(--foreground)] mb-4">Message Sent</h2>
              <p className="font-sans text-[var(--foreground)]/80 text-lg">
                I'll read it soon and write back.
              </p>
              
              {/* Confetti simulation using framer motion */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, y: 0, 
                    opacity: 1, 
                    scale: Math.random() * 0.5 + 0.5,
                    rotate: 0
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 400, 
                    y: (Math.random() - 0.5) * 400 + 100,
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute w-3 h-3 rounded-sm pointer-events-none"
                  style={{ backgroundColor: ['#DEADA9', '#BB737E', '#A16879', '#C5BA9A'][Math.floor(Math.random() * 4)] }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
