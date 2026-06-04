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
        title="A professional build process that turns ideas into polished, launch-ready digital products."
        text="From planning to launch, every step is focused on clarity, performance, maintainability, and a final product that feels custom from the first click."
      />
      <Process />
      <TechStack />
      <Contact />
    </>
  );
}
