"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  { id: 1, title: "Brand Voice Guidelines", desc: "Finding the exact words that sound like you.", color: "#E2DAAC", rotation: -3 },
  { id: 2, title: "Website Copywriting", desc: "Digital spaces that convert visitors into believers.", color: "#DEADA9", rotation: 4 },
  { id: 3, title: "Email Sequences", desc: "Conversations delivered straight to their inbox.", color: "#C5BA9A", rotation: -2 },
  { id: 4, title: "Creative Direction", desc: "Guiding the visual and verbal narrative.", color: "#BB737E", rotation: 5 },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen py-32 px-4 md:px-20 lg:px-40 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-20 text-center">How I Can Help</h2>
      
      <div className="flex flex-wrap justify-center gap-12 md:gap-16 max-w-5xl">
        {services.map((service) => (
          <motion.div
            key={service.id}
            data-clickable="true"
            initial={{ opacity: 0, scale: 0.8, rotate: service.rotation }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              boxShadow: "5px 15px 25px rgba(0,0,0,0.15)",
              y: -5
            }}
            onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            className="relative w-64 p-6 shadow-sm cursor-none"
            style={{
              backgroundColor: service.color,
              boxShadow: "2px 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            {/* Pin */}
            <motion.div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-md"
              whileHover={{ rotate: [0, -10, 10, -10, 0], y: -2 }}
              transition={{ duration: 0.5 }}
            />
            
            <h3 className="font-serif text-xl mb-4 text-[#4a4a4a] leading-tight">{service.title}</h3>
            
            <motion.div
              animate={{ height: activeService === service.id ? "auto" : 0, opacity: activeService === service.id ? 1 : 0 }}
              className="overflow-hidden font-sans text-sm text-[#4a4a4a]/80"
            >
              <p className="pt-2 border-t border-[#4a4a4a]/10">{service.desc}</p>
            </motion.div>

            {/* Folded corner effect */}
            <div className="absolute bottom-0 right-0 border-[12px] border-transparent" 
                 style={{ borderBottomColor: "rgba(0,0,0,0.1)", borderRightColor: "rgba(0,0,0,0.1)" }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
