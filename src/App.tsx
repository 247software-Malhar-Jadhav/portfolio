import { ThemeProvider } from "@/hooks/use-theme";
import { AiTwinProvider, AiTwinFab } from "@/components/ai-twin";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function App() {
  return (
    <ThemeProvider>
      <AiTwinProvider>
        <div className="grain relative min-h-screen">
          <Nav />
          <main>
            <Hero />
            <About />
            <Skills />
            <Work />
            <Writing />
            <Contact />
          </main>
          <AiTwinFab />
        </div>
      </AiTwinProvider>
    </ThemeProvider>
  );
}
