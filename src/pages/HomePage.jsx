import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { FeaturedWork } from '../sections/FeaturedWork';
import { Process } from '../sections/Process';
import { TechStack } from '../sections/TechStack';
import { Contact } from '../sections/Contact';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
export function HomePage() {
  return (
    <>
      <Seo seo={pageSeo.home} />
      <Hero />
      <Services compact />
      <FeaturedWork compact />
      <Process compact />
      <TechStack />
      <Contact />
    </>
  );
}
