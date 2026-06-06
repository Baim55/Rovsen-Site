import HeroSection from "../components/HeroSection";
import AgeGroupsSection from "../components/AgeGroupsSection";
import AtlasSection from "../components/AtlasSection";
import TrainingsSection from "../components/TrainingsSection";
import ArticlesSection from "../components/ArticlesSection";
import ResourcesSection from "../components/ResourcesSection";
// import TestimonialsSection from "../components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AgeGroupsSection />
      <AtlasSection />
      <TrainingsSection />
      <ArticlesSection />
      <ResourcesSection />
      {/* <TestimonialsSection /> */}
    </>
  );
}
