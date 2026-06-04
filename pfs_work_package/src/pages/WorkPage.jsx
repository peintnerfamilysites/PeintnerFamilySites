import { PageHeader } from '../components/ui/PageHeader';
import { FeaturedWork } from '../sections/FeaturedWork';
import { TechStack } from '../sections/TechStack';
import { Contact } from '../sections/Contact';

export function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Portfolio direction for sites that look custom, memorable, and business-ready."
        text="This page is ready for real case studies, screenshots, before-and-after rebuilds, metrics, and client stories as PFS grows."
      />
      <FeaturedWork />
      <TechStack />
      <Contact />
    </>
  );
}
