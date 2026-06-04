import { Link } from 'react-router-dom';
import { CallButton } from '../components/ui/CallButton';
export function Contact() {
  return (
    <section className="contact shell">
      <div className="contact__card">
        <div>
          <span>Ready to build</span>
          <h2>Let’s make PFS look like the studio people wish they hired first.</h2>
          <p>
            This is ready for your real contact form, scheduler, Google Business link, portfolio screenshots, and client proof once you want to connect them.
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
