import { PageHeader } from '../components/ui/PageHeader';
import { FeaturedWork } from '../sections/FeaturedWork';
import { TechStack } from '../sections/TechStack';
import { Contact } from '../sections/Contact';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
export function WorkPage() {
  return (
    <>
      <Seo seo={pageSeo.work} />
      <PageHeader
        eyebrow="Work"
        title="Web design and application work built for real businesses, real users, and real growth."
        text="Project cards will be updated with live screenshots, case studies, and client results as new work is completed and published."
      />
      <FeaturedWork />
      <TechStack />
      <Contact />
    </>
  );
}
