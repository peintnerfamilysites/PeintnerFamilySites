import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="error-page shell" aria-labelledby="not-found-title">
      <div className="error-page__orb" aria-hidden="true" />
      <div className="error-page__card">
        <span className="error-page__eyebrow">404 / Lost signal</span>
        <h1 id="not-found-title">This page drifted out of orbit.</h1>
        <p>
          The route you opened does not exist or may have moved. Head back to the homepage and keep
          exploring the Peintner Family Sites experience.
        </p>
        <div className="error-page__scanner" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="error-page__actions">
          <Link className="button button--primary" to="/">
            Return home
          </Link>
          <Link className="button button--ghost" to="/contact">
            Contact PFS
          </Link>
        </div>
      </div>
    </section>
  );
}
