import { PageHeader } from '../components/ui/PageHeader';
import { Contact } from '../sections/Contact';
import { ContactForm } from '../components/ui/ContactForm';

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Ready to turn PFS into the site people remember?"
        text="Use this page for your email, booking link, intake form, business profiles, and a stronger project-starting experience."
      />
      <Contact standalone />
      <ContactForm />
    </>
  );
}
