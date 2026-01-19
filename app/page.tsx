import { Navigation } from '@/components/layout/Navigation';
import { HeroWorkwear } from '@/components/sections/HeroWorkwear';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { ProblemStackingCards } from '@/components/sections/ProblemStackingCards';
import { Potentials } from '@/components/sections/Potentials';
import { TestimonialsBanner } from '@/components/sections/TestimonialsBanner';
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
        {contentData.video_showcase && (
          <VideoShowcase data={contentData.video_showcase} />
        )}
        <ProblemStackingCards data={contentData.problem_stacking} />
        <Potentials data={contentData.potentials} />
        <TestimonialsBanner data={contentData.testimonials_banner} />
        <OnboardingDiagonal data={contentData.onboarding_diagonal} />
        <HorizontalProcess data={contentData.horizontal_process} />
        <Testimonials data={contentData.testimonials} />
        <CTA data={contentData.cta_final} />
      </main>
    </>
  );
}
