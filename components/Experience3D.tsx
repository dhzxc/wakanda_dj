import AudioSpectrum from "./AudioSpectrum";

export default function Experience3D() {
  return <section className="experience reveal" aria-labelledby="experience-title">
    <div className="experience-neon" aria-hidden="true"><span /><span /><span /></div>
    <div className="experience-shape" aria-hidden="true" />
    <p className="eyebrow">THE WAKANDA EXPERIENCE</p>
    <h2 id="experience-title">Not a show.<br /><em>A state of being.</em></h2>
    <AudioSpectrum compact />
    <a className="text-link" data-magnetic href="#booking">Build the ritual ↗</a>
  </section>;
}
