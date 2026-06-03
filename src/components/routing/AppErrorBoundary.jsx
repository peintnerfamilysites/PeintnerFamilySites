import { Component } from 'react';
import { Link } from 'react-router-dom';

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Something unexpected happened.',
    };
  }

  componentDidCatch(error, info) {
    console.error('PFS route error:', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="error-page shell" aria-labelledby="error-title">
        <div className="error-page__orb" aria-hidden="true" />
        <div className="error-page__card">
          <span className="error-page__eyebrow">System recovery</span>
          <h1 id="error-title">The interface hit a glitch.</h1>
          <p>
            The page did not load correctly, but the site is still online. Use the controls below to
            recover cleanly or return to the homepage.
          </p>
          <div className="error-page__code" role="status">
            <strong>Error detail</strong>
            <span>{this.state.message}</span>
          </div>
          <div className="error-page__actions">
            <button className="button button--primary" type="button" onClick={this.reset}>
              Try again
            </button>
            <Link className="button button--ghost" to="/" onClick={this.reset}>
              Return home
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
