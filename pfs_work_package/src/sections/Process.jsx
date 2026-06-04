import { processSteps } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Reveal } from '../components/ui/Reveal';

export function Process() {
  return (
    <section className="section shell" id="process">
      <SectionIntro
        eyebrow="Senior-dev workflow"
        title="A cleaner process means a better launch."
        text="The site is organized around reusable data, components, sections, and assets so it is easier to maintain as PFS grows."
        align="center"
      />

      <div className="process-track">
        {processSteps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.07}>
            <article className="process-step">
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
