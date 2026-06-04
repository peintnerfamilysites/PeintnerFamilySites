import { PageHeader } from '../components/ui/PageHeader';
import { Contact } from '../sections/Contact';
import { ContactForm } from '../components/ui/ContactForm';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
export function ContactPage() {
  return (
    <>
      <Seo seo={pageSeo.contact} />
      <PageHeader
        eyebrow="Contact"
        title="Ready to build a website or app that makes your business stand out?"
        text="Tell Peintner Family Sites what you want to build, improve, or launch, and we will help map out the cleanest path forward."
      />
      <Contact standalone />
      <ContactForm />
    </>
  );
}
