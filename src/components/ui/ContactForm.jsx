import { useState } from 'react';
import emailjs from '@emailjs/browser';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'New website build',
  budget: '',
  timeline: '',
  message: '',
  website: '',
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function buildMailto(form) {
  const subject = encodeURIComponent(`New project request from ${form.name || 'PFS website visitor'}`);
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nProject details:\n${form.message}`,
  );

  return `mailto:peintnerfamilysites@gmail.com?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.website) {
      setStatus('success');
      setNotice('Thanks — your request has been received.');
      setForm(initialForm);
      return;
    }

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      window.location.href = buildMailto(form);
      setStatus('setup');
      setNotice('EmailJS environment keys are not connected yet, so this opened your email app with the project details filled in.');
      return;
    }

    setStatus('sending');
    setNotice('Sending your project request...');

    try {
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, form, {
        publicKey: emailJsConfig.publicKey,
      });

      setStatus('success');
      setNotice('Thanks — your request was sent to Peintner Family Sites. I will follow up as soon as possible.');
      setForm(initialForm);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus('error');
      setNotice('Something went wrong while sending. Please call or email Peintner Family Sites directly.');
    }
  };

  return (
    <section className="contact-form-section shell" aria-labelledby="project-form-title">
      <div className="contact-form-card">
        <div className="contact-form-card__intro">
          <span>Project intake</span>
          <h2 id="project-form-title">Tell Peintner Family Sites what you need built.</h2>
          <p>
            Share the basics below and the request can be routed through EmailJS when your service, template,
            and public key are added to the environment file.
          </p>
          <div className="contact-form-card__meta">
            <a href="tel:+19034177043">Call (903) 417-7043</a>
            <a href="mailto:peintnerfamilysites@gmail.com">Email directly</a>
          </div>
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <div className="project-form__grid">
            <label>
              <span>Name *</span>
              <input name="name" value={form.name} onChange={updateField} autoComplete="name" required />
            </label>
            <label>
              <span>Email *</span>
              <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" />
            </label>
            <label>
              <span>Business / company</span>
              <input name="company" value={form.company} onChange={updateField} autoComplete="organization" />
            </label>
            <label>
              <span>Service needed</span>
              <select name="service" value={form.service} onChange={updateField}>
                <option>New website build</option>
                <option>Website redesign</option>
                <option>React web app</option>
                <option>Landing page</option>
                <option>Website repair / polish</option>
              </select>
            </label>
            <label>
              <span>Estimated budget</span>
              <select name="budget" value={form.budget} onChange={updateField}>
                <option value="">Choose a range</option>
                <option>$500 - $1,500</option>
                <option>$1,500 - $3,500</option>
                <option>$3,500 - $7,500</option>
                <option>$7,500+</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label className="project-form__full">
              <span>Timeline</span>
              <input name="timeline" value={form.timeline} onChange={updateField} placeholder="Example: ASAP, 2-4 weeks, this quarter" />
            </label>
            <label className="project-form__full">
              <span>Project details *</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                rows="6"
                placeholder="Tell me about your business, what pages you need, what is broken, or what you want the site to accomplish."
                required
              />
            </label>
          </div>

          <label className="project-form__trap" aria-hidden="true">
            Website
            <input name="website" tabIndex="-1" value={form.website} onChange={updateField} autoComplete="off" />
          </label>

          <div className="project-form__footer">
            <button className="button button--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send project request'}
            </button>
            {notice ? <p className={`project-form__notice project-form__notice--${status}`}>{notice}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
