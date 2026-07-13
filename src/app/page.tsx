import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogsSection from "@/components/sections/BlogsSection";
import ContactSection from "@/components/sections/ContactSection";
import NotebookBackground from "@/components/NotebookBackground";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background layer */}
      <NotebookBackground />

      {/* Content layer */}
      <div className="relative z-10 w-full">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogsSection />
        <ContactSection />
      </div>
    </main>
  );
}
