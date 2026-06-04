import { PageHeader } from '../components/ui/PageHeader';
import { Services } from '../sections/Services';
import { Process } from '../sections/Process';
import { Contact } from '../sections/Contact';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
export function ServicesPage() {
  return (
    <>
      <Seo seo={pageSeo.services} />
      <PageHeader
        eyebrow="Services"
        title="Premium websites, web applications, and launch systems built to outperform templates."
        text="Every service is built around strategy, clean design, responsive performance, and clear actions that help visitors become customers."
      />
      <Services />
      <Process compact />
      <Contact />
    </>
  );
}
