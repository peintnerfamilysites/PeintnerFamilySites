import { stackItems } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';

export function TechStack() {
  return (
    <section className="section shell stack-section" aria-labelledby="stack-title">
      <SectionIntro
        eyebrow="Built like a real product"
        title="Modern frontend foundations with room to scale."
        text="The project is split into focused folders so new pages, services, projects, and assets can be added without turning App.jsx into a mess."
      />
      <div className="stack-marquee" id="stack-title">
        {[...stackItems, ...stackItems].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
