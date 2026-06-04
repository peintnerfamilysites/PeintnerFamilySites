import { processSteps } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Reveal } from '../components/ui/Reveal';

export function Process() {
  return (
    <section className="section shell" id="process">
      <SectionIntro
        eyebrow="Build process"
        title="A clear process creates a stronger final product."
        text="Every project starts with the business goal, then moves through design, development, testing, and launch with a clean structure that can keep growing."
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
