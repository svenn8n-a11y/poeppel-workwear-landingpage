import { Navigation } from '@/components/layout/Navigation';
import { HeroWorkwear } from '@/components/sections/HeroWorkwear';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { ProblemStackingCards } from '@/components/sections/ProblemStackingCards';
import { Potentials } from '@/components/sections/Potentials';
import { Testimonials } from '@/components/sections/Testimonials';
import { OnboardingDiagonal } from '@/components/sections/OnboardingDiagonal';
import { USPs } from '@/components/sections/USPs';
import { Benefits } from '@/components/sections/Benefits';
import { CTA } from '@/components/sections/CTA';
import contentDataRaw from '@/data/content.json';
import type { ContentData } from '@/lib/types';

const contentData = contentDataRaw as ContentData;

export default function Home() {
  return (
    <>
      <Navigation data={contentData.navigation} />
      <main className="overflow-x-hidden">
        {/* 1. Hero */}
        <HeroWorkwear data={contentData.hero} elevatorPitch={contentData.elevator_pitch} />

        {/* 2. Video Player */}
        {contentData.video_showcase && (
          <VideoShowcase data={contentData.video_showcase} />
        )}

        {/* 3. Problem Cards - Die Kaskade der Ineffizienz */}
        <ProblemStackingCards data={contentData.problem_stacking} />

        {/* 4. Potentials - Horizontal Scroll */}
        <Potentials data={contentData.potentials} />

        {/* 5. Testimonials - Scrolling Banner */}
        <Testimonials data={contentData.testimonials} />

        {/* 6. Onboarding Process */}
        <OnboardingDiagonal data={contentData.onboarding_diagonal} />

        {/* 7. USPs - 8 tiles */}
        <USPs data={contentData.usps} />

        {/* 8. CTA - Termin vereinbaren */}
        {contentData.cta && <CTA data={contentData.cta} />}

        {/* 9. Benefits - Ihr Gewinn */}
        <Benefits data={contentData.benefits} />

        {/* TODO: 10. Downloads - Whitepaper */}
        {/* TODO: 11. CTA - Termin buchen */}
        {/* TODO: 12. FAQ */}
        {/* TODO: 13. Team */}

        {/* 14. Final CTA */}
        <CTA data={contentData.cta_final} />
      </main>
    </>
  );
}
