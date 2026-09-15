/**
 * The Hero keeps the supplied Wakanda artwork as its single visual background.
 * Content remains semantic and independent from the decorative image layer.
 */
export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker" aria-hidden="true"><span>WK—001</span><span>JOHANNESBURG / GLOBAL</span></div>

      <div className="hero-copy reveal">
        <img className="hero-mark" src="/images/wakanda-mark.png" alt="DJ Wakanda" />
        <p className="eyebrow">DJ / PRODUCER / CULTURAL TRANSMITTER</p>
        <h1 id="hero-title">Feel the<br /><em>frequency.</em></h1>
        <p className="hero-lede">Afro-tech rhythms for future-facing bodies. A ritual in motion, curated by WAKANDA.</p>
        <div className="hero-actions">
          <a className="button button-orange" data-magnetic href="#sound">Enter the sound <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#events">Next transmissions <span aria-hidden="true">↓</span></a>
        </div>
        <a className="hero-social" href="https://www.instagram.com/wakanda_dj/" target="_blank" rel="noreferrer" aria-label="Follow DJ Wakanda on Instagram"><Instagram aria-hidden="true" /><span>Follow the frequency</span><b aria-hidden="true">↗</b></a>
      </div>

      <a className="hero-index" href="#sound" aria-label="Scroll to the selected transmissions player">
        <span className="hero-index-line" aria-hidden="true" />
        <span>SCROLL TO EXPLORE</span><span className="hero-index-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
import { Instagram } from "lucide-react";
