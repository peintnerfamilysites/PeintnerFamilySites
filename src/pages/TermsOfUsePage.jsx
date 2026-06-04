import { Link } from 'react-router-dom';
import { pfsPhone } from '../data/contactInfo';

import { Seo } from '../components/seo/Seo';
import { pageSeo } from '../data/seo';
const termsSections = [
  {
    title: '1. Agreement to these Terms',
    body: [
      'These Terms of Use govern your access to and use of the Peintner Family Sites website, project discussions, proposals, estimates, and related website design and development services. By using this website, requesting a quote, approving a project, or purchasing services from Peintner Family Sites, you agree to these Terms.',
      'If a separate written agreement, proposal, invoice, statement of work, or signed contract applies to your project, that written project document controls if it conflicts with these Terms.',
    ],
  },
  {
    title: '2. Who we are',
    body: [
      'Peintner Family Sites is a website design and development studio based in Springfield, Missouri. We help customers plan, design, build, improve, and launch websites and related digital assets.',
      'References to “Peintner Family Sites,” “PFS,” “we,” “us,” and “our” mean Peintner Family Sites. References to “you,” “your,” “customer,” or “client” mean the person or business using the website or purchasing services from us.',
    ],
  },
  {
    title: '3. Services we may provide',
    body: [
      'Depending on the project, Peintner Family Sites may provide website design, frontend development, React development, landing pages, website rebuilds, UI improvements, asset preparation, basic SEO structure, performance improvements, website launch support, content placement, integrations, and other related digital services.',
      'The exact services, deliverables, timeline, revision limits, launch requirements, pricing, payment schedule, included support, ownership terms, and maintenance responsibilities should be confirmed in writing before work begins.',
    ],
  },
  {
    title: '4. Estimates, proposals, payment, and project timing',
    body: [
      'Any estimate or proposal is based on the information available at the time it is provided. A project may require additional time, cost, or scope changes if the customer requests new features, provides incomplete materials, changes direction, delays approvals, or if technical requirements are different than expected.',
      'Unless a written agreement says otherwise, invoices are due according to the payment terms stated on the invoice or proposal. Peintner Family Sites may pause work, withhold delivery, or delay launch if required payments, approvals, logins, content, assets, or project materials are not received.',
    ],
  },
  {
    title: '5. Customer responsibilities',
    body: [
      'You are responsible for providing accurate business information, contact information, service details, images, logos, written content, account access, approvals, and any other materials needed to complete your project.',
      'You are also responsible for reviewing your website before launch, including text, images, links, forms, phone numbers, email addresses, pricing, service claims, policies, legal statements, accessibility needs, and compliance requirements that apply to your business or industry.',
    ],
  },
  {
    title: '6. Content, permissions, and legal rights',
    body: [
      'You represent that you have the right to use any content, images, logos, videos, reviews, testimonials, trademarks, written materials, and other assets you provide to Peintner Family Sites. You agree not to provide materials that infringe another person’s rights, violate law, or contain misleading claims.',
      'Peintner Family Sites may refuse to use materials that appear unlawful, misleading, unsafe, offensive, infringing, or inconsistent with a professional website project.',
    ],
  },
  {
    title: '7. Reviews, revisions, and approvals',
    body: [
      'Project revisions should be requested clearly and within the revision limits or approval process stated in the project agreement. Additional revisions, design changes, rebuilds, new pages, new features, or direction changes may require additional cost and time.',
      'When you approve a design, page, feature, or launch, Peintner Family Sites may rely on that approval. After approval or launch, additional changes may be treated as new work unless a written support or maintenance agreement includes them.',
    ],
  },
  {
    title: '8. No guaranteed business outcome',
    body: [
      'Peintner Family Sites works to create professional, modern, and effective websites, but we do not guarantee any specific business result. We do not guarantee search engine rankings, traffic, leads, sales, revenue, ad performance, platform approval, customer calls, form submissions, or return on investment.',
      'Search engines, advertising platforms, social platforms, customer behavior, competitors, market conditions, hosting providers, and third-party services are outside our control.',
    ],
  },
  {
    title: '9. SEO, performance, and accessibility',
    body: [
      'When included in the project scope, Peintner Family Sites may improve page structure, metadata, headings, speed, responsive layout, and other technical foundations. These improvements can support a stronger website, but they do not guarantee rankings, compliance, traffic, conversions, or accessibility certification.',
      'If your business requires a specific legal, accessibility, privacy, industry, or regulatory standard, you are responsible for telling us before work begins and for obtaining review from the appropriate qualified professional.',
    ],
  },
  {
    title: '10. Third-party platforms and accounts',
    body: [
      'Websites may rely on third-party services such as domain registrars, hosting companies, DNS providers, Google Business Profile, Yelp, analytics tools, email services, form tools, payment processors, map embeds, plugins, packages, libraries, APIs, AI tools, and other vendors.',
      'Peintner Family Sites is not responsible for outages, data loss, account restrictions, provider errors, pricing changes, policy changes, security incidents, service changes, or performance issues caused by third-party platforms. You are responsible for maintaining ownership and access to your own accounts unless a written agreement says otherwise.',
    ],
  },
  {
    title: '11. Hosting, domains, maintenance, and backups',
    body: [
      'Unless a written agreement says otherwise, ongoing hosting, domain renewals, email hosting, backups, monitoring, maintenance, security updates, platform renewals, content edits, dependency updates, and future troubleshooting are not automatically included after a website is launched or delivered.',
      'If Peintner Family Sites assists with hosting or deployment, we may still depend on third-party providers and customer-owned accounts. You should keep your own records of account logins, domain access, hosting access, billing information, and backups.',
    ],
  },
  {
    title: '12. Intellectual property and portfolio use',
    body: [
      'Customer-provided materials remain the responsibility of the customer. Peintner Family Sites may use reusable development patterns, code structures, workflows, tools, design systems, and general know-how across projects.',
      'Ownership of custom deliverables, source files, licenses, graphics, copy, and final website materials should be defined in the project agreement. Unless a customer requests otherwise in writing, Peintner Family Sites may display completed work, screenshots, project descriptions, and customer business names in our portfolio or marketing materials.',
    ],
  },
  {
    title: '13. Acceptable use of this website',
    body: [
      'You agree not to misuse this website, attempt to interfere with its operation, submit malicious code, scrape content in an abusive way, impersonate another person, submit false information, or use this website for unlawful, harmful, or deceptive purposes.',
      'Peintner Family Sites may block, ignore, or report activity that appears abusive, fraudulent, malicious, or unlawful.',
    ],
  },
  {
    title: '14. Disclaimers',
    body: [
      'This website and our services are provided on an “as available” and “as agreed in writing” basis. Peintner Family Sites makes no promise that this website or any delivered website will be uninterrupted, error-free, fully secure, compatible with every device or browser, or free from third-party service issues.',
      'Peintner Family Sites does not provide legal, tax, accounting, insurance, financial, medical, or other licensed professional advice. Any business, content, SEO, or launch guidance is general creative and technical support only.',
    ],
  },
  {
    title: '15. Limitation of liability',
    body: [
      'To the fullest extent allowed by applicable law, Peintner Family Sites will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, lost data, lost opportunities, business interruption, reputational harm, replacement services, or costs related to third-party platforms.',
      'To the fullest extent allowed by applicable law, any total liability connected to a paid project will not exceed the amount you paid Peintner Family Sites for the specific service giving rise to the claim, unless a signed written agreement states otherwise or applicable law does not allow that limitation.',
    ],
  },
  {
    title: '16. Indemnification',
    body: [
      'You agree to hold Peintner Family Sites harmless from claims, losses, damages, liabilities, and expenses that arise from materials you provide, your business claims, your products or services, your misuse of the website, your violation of these Terms, your violation of another party’s rights, or your failure to comply with laws that apply to your business.',
    ],
  },
  {
    title: '17. Governing law and location',
    body: [
      'Peintner Family Sites is based in Springfield, Missouri. These Terms are intended to be governed by the laws of the State of Missouri, without regard to conflict-of-law rules, unless a written agreement says otherwise.',
      'Any project-specific dispute process, venue, mediation, arbitration, or fee provision should be confirmed in the written agreement for that project.',
    ],
  },
  {
    title: '18. Changes to these Terms',
    body: [
      'Peintner Family Sites may update these Terms as our website, services, tools, or business practices change. The latest posted version applies to use of this website after the updated date shown on this page.',
    ],
  },
  {
    title: '19. Contact Peintner Family Sites',
    body: [
      'Questions about these Terms or a project can be sent through the contact page, by email, or by phone. Peintner Family Sites will respond through the contact method that makes the most sense for the request.',
    ],
  },
];

export function TermsOfUsePage() {
  return (
    <>
      <Seo seo={pageSeo.terms} />
      <section className="terms-page shell" aria-labelledby="terms-title">
      <div className="terms-hero">
        <span className="terms-hero__eyebrow">Terms of Use</span>
        <h1 id="terms-title">Terms written from Peintner Family Sites to our customers.</h1>
        <p>
          These Terms explain how customers may use this website and how Peintner Family Sites
          approaches website design, development, project scope, customer responsibilities,
          third-party tools, approvals, and liability. Peintner Family Sites is based in
          Springfield, Missouri.
        </p>
        <div className="terms-hero__meta">
          <span>Last updated: June 3, 2026</span>
          <span>Springfield, Missouri</span>
          <span>Customer-facing website terms</span>
        </div>
      </div>

      <div className="terms-layout">
        <aside className="terms-note">
          <strong>Need help with a project?</strong>
          <p>
            These Terms are here so every customer understands how Peintner Family Sites handles
            project scope, approvals, payments, third-party tools, launch support, and service
            expectations before work begins.
          </p>
          <a className="button button--primary" href={pfsPhone.href}>
            Call {pfsPhone.display}
          </a>
          <Link className="button button--ghost" to="/contact">
            Contact Peintner Family Sites
          </Link>
        </aside>

        <div className="terms-stack">
          {termsSections.map((section) => (
            <article className="terms-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
