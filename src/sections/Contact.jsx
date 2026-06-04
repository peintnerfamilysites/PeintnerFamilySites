import { Link } from 'react-router-dom';
import { CallButton } from '../components/ui/CallButton';
export function Contact() {
  return (
    <section className="contact shell">
      <div className="contact__card">
        <div>
          <span>Ready to build</span>
          <h2>Let’s build the website or application your business should have had from the start.</h2>
          <p>
            Whether you need a new website, a redesign, a landing page, or a custom React application, Peintner Family Sites can help turn the idea into a polished digital experience.
          </p>
        </div>
        <div className="contact__actions">
          <CallButton />
          <a className="button button--primary" href="mailto:peintnerfamilysites@gmail.com">Email PFS</a>
          <Link className="button button--ghost" to="/">Back home</Link>
        </div>
      </div>
    </section>
  );
}
