import { featuredProjects } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Reveal } from '../components/ui/Reveal';

export function FeaturedWork() {
  return (
    <section className="section shell work-section" id="work">
      <div className="work-section__intro">
        <SectionIntro
          eyebrow="Portfolio direction"
          title="A site that feels like a premium developer studio, not a template."
          text="This section is built to become real case studies as projects are finished. Each card already has space for screenshots, outcomes, and project details."
        />
      </div>

      <div className="work-stack">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <article className="work-card surface-card">
              <div className="work-card__visual">
                <div className="browser-dots"><span /><span /><span /></div>
                <div className="visual-lines"><span /><span /><span /></div>
              </div>
              <div className="work-card__content">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="metric-row">
                  {project.metrics.map((metric) => (
                    <small key={metric}>{metric}</small>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
