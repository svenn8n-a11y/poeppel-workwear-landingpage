// Content types based on content.json structure

export interface NavigationData {
  brand: string;
  links: Array<{
    label: string;
    anchor: string;
  }>;
}

export interface HeroData {
  headline: string;
  subline: string;
  cta_primary: string;
  video_trigger: string;
  background_image: string;
}

export interface ElevatorPitchData {
  section_id: string;
  headline: string;
  video_url: string;
  poster_image: string;
  description: string;
}

export interface ProblemSectionData {
  title: string;
  description: string;
  pain_points: Array<{
    title: string;
    text: string;
  }>;
  whitepaper_download: {
    headline: string;
    text: string;
    button_label: string;
    file_url: string;
  };
}

export interface ProcessStep {
  id: string;
  label: string;
  headline: string;
  description: string;
  video_loop: string;
}

export interface HorizontalProcessData {
  title: string;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface TestimonialsData {
  section_id: string;
  headline: string;
  items: TestimonialItem[];
}

export interface CtaFinalData {
  headline: string;
  text: string;
  button_primary: string;
  button_secondary: string;
}

export interface ProblemSegment {
  title: string;
  description: string;
  icon: string;
}

export interface ProblemCard {
  id: number;
  title: string;
  sticky_top: string;
  z_index: number;
  bg_color: 'white' | 'dark';
  segments: ProblemSegment[];
}

export interface ProblemStackingData {
  section_id: string;
  headline: string;
  subheadline: string;
  cards: ProblemCard[];
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  image_placeholder: string;
}

export interface OnboardingDiagonalData {
  section_id: string;
  headline: string;
  steps: OnboardingStep[];
}

export interface VideoShowcaseData {
  section_id: string;
  headline: string;
  subheadline: string;
  video_url: string;
  poster_image: string;
  cta_text: string;
}

export interface PotentialCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface PotentialsData {
  section_id: string;
  headline: string;
  subheadline: string;
  cards: PotentialCard[];
}

export interface TestimonialsBannerItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface TestimonialsBannerData {
  section_id: string;
  headline: string;
  items: TestimonialsBannerItem[];
}

export interface UspTile {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface UspsData {
  section_id: string;
  headline: string;
  subheadline: string;
  tiles: UspTile[];
}

export interface BenefitItem {
  id: number;
  metric: string;
  title: string;
  description: string;
  icon: string;
}

export interface BenefitsData {
  section_id: string;
  headline: string;
  subheadline: string;
  items: BenefitItem[];
}

export interface ContentData {
  metadata: {
    project: string;
    version: string;
    theme: string;
  };
  navigation: NavigationData;
  hero: HeroData;
  elevator_pitch: ElevatorPitchData;
  video_showcase?: VideoShowcaseData;
  problem_stacking: ProblemStackingData;
  potentials: PotentialsData;
  testimonials_banner: TestimonialsBannerData;
  onboarding_diagonal: OnboardingDiagonalData;
  problem_section: ProblemSectionData;
  horizontal_process: HorizontalProcessData;
  usps: UspsData;
  benefits: BenefitsData;
  testimonials: TestimonialsData;
  cta_final: CtaFinalData;
}
