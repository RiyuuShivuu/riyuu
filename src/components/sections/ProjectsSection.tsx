"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { id: 1, title: "The Artisan Bakery", category: "Brand Voice", color: "#DEADA9" },
  { id: 2, title: "Lumina Skincare", category: "Web Copy", color: "#BB737E" },
  { id: 3, title: "Echo Tech", category: "Case Study", color: "#A16879" },
];

export default function ProjectsSection() {
  const [openBook, setOpenBook] = useState<number | null>(null);

  const activeProject = projects.find(p => p.id === openBook);

  return (
    <section className="relative w-full min-h-screen py-32 px-4 md:px-20 lg:px-40 flex flex-col justify-center">
      <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-20 text-center">Selected Chapters</h2>
      
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative w-64 h-80 md:w-72 md:h-96 cursor-none perspective-[1000px]"
            data-cursor="open"
            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", delay: index * 0.2 }}
            onDoubleClick={() => setOpenBook(project.id)}
            whileHover={{ 
              y: -20, 
              scale: 1.05, 
              rotate: 0,
              boxShadow: "20px 30px 40px rgba(0,0,0,0.15)"
            }}
            style={{
              backgroundColor: project.color,
              boxShadow: "10px 15px 20px rgba(0,0,0,0.1)",
              borderRadius: "4px 12px 12px 4px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Book Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 rounded-l-sm" />
            
            {/* Bookmark Ribbon */}
            <motion.div 
              className="absolute top-0 right-12 w-6 h-20 bg-[var(--color-primary)] shadow-md"
              style={{ borderRadius: "0 0 4px 4px" }}
            />

            {/* Cover Content */}
            <div className="p-8 h-full flex flex-col justify-between items-center text-center text-white mix-blend-overlay">
              <div className="w-full h-full border border-white/30 rounded-sm p-4 flex flex-col items-center justify-center">
                <span className="text-sm font-sans tracking-widest uppercase mb-4 opacity-80">{project.category}</span>
                <h3 className="text-2xl font-serif leading-tight">{project.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Book Open State (Simplified MVP overlay) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-[var(--color-primary)]/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpenBook(null);
            }}
            style={{ transformOrigin: "left center" }}
          >
            <div 
              className="w-full max-w-5xl h-[80vh] bg-[#f8f5eb] shadow-2xl flex rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Page */}
              <div className="w-1/2 p-12 flex flex-col justify-center border-r border-black/5 bg-gradient-to-r from-black/[0.02] to-transparent">
                <span className="text-sm uppercase tracking-widest text-[var(--color-sage)] mb-4">{activeProject.category}</span>
                <h2 className="text-4xl font-serif mb-6 text-[var(--foreground)]">{activeProject.title}</h2>
                <p className="font-sans text-[var(--foreground)]/70 leading-relaxed">
                  A detailed exploration of the brand voice and copy structure crafted to elevate this client's presence.
                  The approach was organic, rooted in the core philosophy of their founders.
                </p>
              </div>
              {/* Right Page */}
              <div className="w-1/2 p-12 flex flex-col justify-center items-center bg-gradient-to-l from-black/[0.02] to-transparent relative">
                <div className="w-full h-64 bg-black/5 rounded-md mb-8 flex items-center justify-center">
                  <span className="text-black/30 font-serif italic">Editorial Image</span>
                </div>
                <button 
                  onClick={() => setOpenBook(null)}
                  className="absolute top-8 right-8 text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
