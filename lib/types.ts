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

export interface ContentData {
  metadata: {
    project: string;
    version: string;
    theme: string;
  };
  navigation: NavigationData;
  hero: HeroData;
  elevator_pitch: ElevatorPitchData;
  problem_section: ProblemSectionData;
  horizontal_process: HorizontalProcessData;
  testimonials: TestimonialsData;
  cta_final: CtaFinalData;
}
