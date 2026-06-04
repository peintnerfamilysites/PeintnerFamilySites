import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { FeaturedWork } from '../sections/FeaturedWork';
import { Process } from '../sections/Process';
import { TechStack } from '../sections/TechStack';
import { Contact } from '../sections/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <Services compact />
      <FeaturedWork compact />
      <Process compact />
      <TechStack />
      <Contact />
    </>
  );
}
