import { Hero } from '@/components/sections/Hero';
import { ProblemLayer } from '@/components/sections/ProblemLayer';
import { HorizontalProcess } from '@/components/sections/HorizontalProcess';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import contentData from '@/data/content.json';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero data={contentData.hero} elevatorPitch={contentData.elevator_pitch} />
      <ProblemLayer data={contentData.problem_section} />
      <HorizontalProcess data={contentData.horizontal_process} />
      <Testimonials data={contentData.testimonials} />
      <CTA data={contentData.cta_final} />
    </main>
  );
}
