import { memo } from 'react';

const rings = ['one', 'two', 'three', 'four', 'five', 'six'];

function BackgroundEffects() {
  return (
    <div className="studio-world__css-rings" aria-hidden="true">
      <span className="studio-world__planet-glow" />
      <span className="studio-world__planet-core">
        <span className="studio-world__planet-atmosphere" />
      </span>
      {rings.map((ring) => (
        <span key={ring} className={`studio-world__ring studio-world__ring--${ring}`} />
      ))}
    </div>
  );
}

const StudioWorld = memo(function StudioWorld() {
  return (
    <div className="studio-world studio-world--fallback" aria-hidden="true">
      <BackgroundEffects />
    </div>
  );
});

export default StudioWorld;
