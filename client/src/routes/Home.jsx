import { HeroRunway } from '../components/HeroRunway/HeroRunway';
import { About } from '../components/About/About';
import { Skills } from '../components/Skills/Skills';

export default function Home() {
  return (
    <>
      {/* 170svh Hero Runway with 100svh sticky stage and fall-through aperture */}
      <HeroRunway />

      {/* About Section: data-tone="deep", seamless fall-through landing */}
      <About />

      {/* Skills Section: data-tone="mid", 3D layer stack & technology groups */}
      <Skills />
    </>
  );
}
