import { PageHeader } from '../components/ui/PageHeader';
import { Process } from '../sections/Process';
import { TechStack } from '../sections/TechStack';
import { Contact } from '../sections/Contact';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
export function ProcessPage() {
  return (
    <>
      <Seo seo={pageSeo.process} />
      <PageHeader
        eyebrow="Process"
        title="A senior-dev workflow that keeps the site clean, scalable, and launch-ready."
        text="The goal is not just a good-looking homepage. The goal is a real product structure you can keep improving without rebuilding from scratch."
      />
      <Process />
      <TechStack />
      <Contact />
    </>
  );
}
