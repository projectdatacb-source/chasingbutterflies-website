import { Suspense } from "react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { TeamSection } from "@/components/team-section";
import { WorkSection } from "@/components/work-section";
import { site } from "@/content/site";
import { getPublishedProjects } from "@/lib/projects/queries";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<WorkFallback />}>
        <WorkCatalogue />
      </Suspense>
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}

async function WorkCatalogue() {
  const { projects } = await getPublishedProjects();
  return <WorkSection projects={projects} />;
}

function WorkFallback() {
  return (
    <section id="work" className="work-surface scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 text-center md:py-32">
        <h2 className="font-display text-4xl text-accent sm:text-5xl md:text-6xl">Our Work</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white sm:text-lg sm:leading-8">{site.workIntro}</p>
      </div>
    </section>
  );
}
