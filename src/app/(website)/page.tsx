import type { ComponentProps } from "react";
import styles from "../page.module.css";
import { HeroSection } from "@/components/sections/hero";
import { WinnersSection } from "@/components/sections/winners";
import { AwardNightSection } from "@/components/sections/award-night";
import { AboutSection } from "@/components/sections/about";
import { CountdownSection } from "@/components/sections/countdown";
import { CategoriesSection } from "@/components/sections/categories";
import { JurySection } from "@/components/sections/jury";
import { DirectorSection } from "@/components/sections/director";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { MediaSection } from "@/components/sections/media";
import { HonourGuestsSection } from "@/components/sections/honour-guests";
import { CtaSection } from "@/components/sections/cta";
import { client } from "@/sanity/lib/client";

// Define GROQ queries
const winnersQuery = `*[_type == "winner"] | order(_createdAt asc) {
  "id": _id,
  name,
  role,
  company,
  "image": image.asset->url
}`;

const aboutImageQuery = `*[_type == "aboutImage"][0] {
  "image": image.asset->url
}`;

const nightOfGlitzQuery = `*[_type == "nightOfGlitz"][0] {
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  "thumbnailUrl": thumbnail.asset->url
}`;

const glimpsesQuery = `*[_type == "glimpses"] | order(_createdAt asc) {
  "id": _id,
  title,
  tag,
  mediaType,
  "imageUrl": image.asset->url,
  videoUrl,
  "videoFileUrl": videoFile.asset->url
}`;

const juryQuery = `*[_type == "juryMember"] | order(_createdAt asc) {
  "id": _id,
  name,
  role,
  bio,
  "image": image.asset->url
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt asc) {
  "id": _id,
  name,
  role,
  quote,
  "image": image.asset->url
}`;

const awardNightGalleryQuery = `*[_type == "awardNightGallery"] | order(_createdAt asc) {
  "id": _id,
  title,
  "imageUrl": image.asset->url
}`;

const guestOfHonourQuery = `*[_type == "guestOfHonour"] | order(_createdAt asc) {
  "id": _id,
  title,
  "bgImageUrl": bgImage.asset->url,
  videoUrl,
  "videoFileUrl": videoFile.asset->url
}`;

type Winners = NonNullable<ComponentProps<typeof WinnersSection>["initialWinners"]>;
type NightOfGlitz = NonNullable<ComponentProps<typeof AwardNightSection>["initialData"]>;
type Glimpses = NonNullable<ComponentProps<typeof CategoriesSection>["initialGlimpses"]>;
type Jury = NonNullable<ComponentProps<typeof JurySection>["initialJury"]>;
type Testimonials = NonNullable<ComponentProps<typeof TestimonialsSection>["initialTestimonials"]>;
type Gallery = NonNullable<ComponentProps<typeof MediaSection>["initialGallery"]>;
type HonourGuests = NonNullable<ComponentProps<typeof HonourGuestsSection>["initialGuests"]>;

export default async function Home() {
  // Fetch data in parallel with fallback to empty array or null if Sanity fetches fail or return empty
  let winners: Winners = [];
  let aboutImageContent: { image?: string } | null = null;
  let nightOfGlitzContent: NightOfGlitz | null = null;
  let glimpsesContent: Glimpses = [];
  let juryMembers: Jury = [];
  let testimonials: Testimonials = [];
  let awardNightGalleryContent: Gallery = [];
  let guestOfHonourContent: HonourGuests = [];

  try {
    const [
      fetchedWinners,
      fetchedAboutImage,
      fetchedNightOfGlitz,
      fetchedGlimpses,
      fetchedJury,
      fetchedTestimonials,
      fetchedGallery,
      fetchedGuests
    ] = await Promise.all([
      client.fetch(winnersQuery),
      client.fetch(aboutImageQuery),
      client.fetch(nightOfGlitzQuery),
      client.fetch(glimpsesQuery),
      client.fetch(juryQuery),
      client.fetch(testimonialsQuery),
      client.fetch(awardNightGalleryQuery),
      client.fetch(guestOfHonourQuery)
    ]);

    winners = fetchedWinners || [];
    aboutImageContent = fetchedAboutImage || null;
    nightOfGlitzContent = fetchedNightOfGlitz || null;
    glimpsesContent = fetchedGlimpses || [];
    juryMembers = fetchedJury || [];
    testimonials = fetchedTestimonials || [];
    awardNightGalleryContent = fetchedGallery || [];
    guestOfHonourContent = fetchedGuests || [];
  } catch (error) {
    console.error("Sanity data fetch failed. Falling back to local mock data.", error);
  }

  return (
    <main className={styles.main}>
      <HeroSection />
      <CountdownSection />
      <WinnersSection initialWinners={winners.length > 0 ? winners : undefined} />
      <AboutSection initialAboutImage={aboutImageContent?.image || undefined} />
      <AwardNightSection initialData={nightOfGlitzContent || undefined} />
      <CategoriesSection initialGlimpses={glimpsesContent.length > 0 ? glimpsesContent : undefined} />
      <JurySection initialJury={juryMembers.length > 0 ? juryMembers : undefined} />
      <DirectorSection />
      <TestimonialsSection initialTestimonials={testimonials.length > 0 ? testimonials : undefined} />
      <MediaSection initialGallery={awardNightGalleryContent.length > 0 ? awardNightGalleryContent : undefined} />
      <HonourGuestsSection initialGuests={guestOfHonourContent.length > 0 ? guestOfHonourContent : undefined} />
      <CtaSection />
    </main>
  );
}
