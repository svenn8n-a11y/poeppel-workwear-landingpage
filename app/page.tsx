import { Navigation } from '@/components/layout/Navigation';
import { HeroWorkwear } from '@/components/sections/HeroWorkwear';
import { ProblemStackingCards } from '@/components/sections/ProblemStackingCards';
import { OnboardingDiagonal } from '@/components/sections/OnboardingDiagonal';
import { HorizontalProcess } from '@/components/sections/HorizontalProcess';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import contentData from '@/data/content.json';

export default function Home() {
  return (
    <>
      <Navigation data={contentData.navigation} />
      <main className="overflow-x-hidden">
        <HeroWorkwear data={contentData.hero} elevatorPitch={contentData.elevator_pitch} />
        <ProblemStackingCards data={contentData.problem_stacking} />
        <OnboardingDiagonal data={contentData.onboarding_diagonal} />
        <HorizontalProcess data={contentData.horizontal_process} />
        <Testimonials data={contentData.testimonials} />
        <CTA data={contentData.cta_final} />
      </main>
    </>
  );
}
