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
        title="Premium websites, React builds, and launch systems built to feel expensive."
        text="Every service is structured around trust, speed, mobile polish, and clear visitor actions — not just pretty screens."
      />
      <Services />
      <Process compact />
      <Contact />
    </>
  );
}
