import { services } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Reveal } from '../components/ui/Reveal';

export function Services() {
  return (
    <section className="section shell" id="services">
      <SectionIntro
        eyebrow="What we build"
        title="Premium digital builds with strategy behind every screen."
        text="A great website should look impressive, explain the offer clearly, load smoothly, and guide visitors toward the next step without confusion."
      />

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.08}>
            <article className="service-card surface-card">
              <div className="service-card__topline">
                <span>{service.number}</span>
                <i />
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
