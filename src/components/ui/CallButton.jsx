import { pfsPhone } from '../../data/contactInfo';

export function CallButton({ className = '', compact = false }) {
  return (
    <a className={`call-button ${compact ? 'call-button--compact' : ''} ${className}`.trim()} href={pfsPhone.href}>
      <span className="call-button__icon" aria-hidden="true">☎</span>
      <span className="call-button__copy">
        <small>Call me</small>
        <strong>{pfsPhone.display}</strong>
      </span>
    </a>
  );
}
