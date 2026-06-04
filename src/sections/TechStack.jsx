import { stackItems } from '../data/siteContent';
import { SectionIntro } from '../components/ui/SectionIntro';

export function TechStack() {
  return (
    <section className="section shell stack-section" aria-labelledby="stack-title">
      <SectionIntro
        eyebrow="Modern development stack"
        title="Modern frontend foundations built for performance, polish, and flexibility."
        text="Peintner Family Sites uses modern tools and clean component systems so websites and applications can stay fast, organized, and easier to improve over time."
      />
      <div className="stack-marquee" id="stack-title">
        {[...stackItems, ...stackItems].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
