"use client";

import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";
import { useState } from "react";

const posts = [
  { id: "DbRgpnLEW1Q", index: 1, label: "FIELD NOTE / 001" },
  { id: "DXc9zjbkWOn", index: 1, label: "FIELD NOTE / 002" },
  { id: "DVrvnPDkdK6", index: 1, label: "FIELD NOTE / 003" },
  { id: "DU4XYmSkayL", index: 4, label: "FIELD NOTE / 004" },
];

export default function SocialGallery() {
  const [active, setActive] = useState(0);
  const post = posts[active];
  const move = (direction: number) => setActive((current) => (current + direction + posts.length) % posts.length);

  return (
    <section className="social-gallery reveal" aria-labelledby="social-gallery-title">
      <div className="social-gallery-head">
        <p className="eyebrow">004 / FIELD NOTES</p>
        <h2 id="social-gallery-title">From the <span>frequency.</span></h2>
        <p className="body-copy">Live moments, visual rituals, and transmissions from the WAKANDA world.</p>
        <a className="social-gallery-link" href="https://www.instagram.com/wakanda_dj/" target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" /> Follow @wakanda_dj <b aria-hidden="true">↗</b>
        </a>
      </div>
      <div className="social-gallery-stage">
        <div className="social-gallery-frame">
          <iframe
            key={`${post.id}-${post.index}`}
            src={`https://www.instagram.com/p/${post.id}/embed/captioned/?img_index=${post.index}`}
            title={`${post.label} from DJ Wakanda on Instagram`}
            loading="lazy"
            allowTransparency={true}
          />
        </div>
        <div className="social-gallery-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous Instagram post"><ArrowLeft aria-hidden="true" /></button>
          <span>{String(active + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")} <b>{post.label}</b></span>
          <button type="button" onClick={() => move(1)} aria-label="Next Instagram post"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
