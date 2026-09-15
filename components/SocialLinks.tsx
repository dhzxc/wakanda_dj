import { Facebook, Instagram, Music2, Youtube } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/wakanda_dj/", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@wakandaalmaafro", icon: Music2 },
  { label: "Facebook", href: "https://www.facebook.com/djwakand4", icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@wakandaenlazona1919", icon: Youtube },
];

export default function SocialLinks() {
  return <div className="socials" aria-label="Social networks">
    {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`DJ Wakanda on ${label}`}><Icon aria-hidden="true" /> <span>{label}</span><b aria-hidden="true">↗</b></a>)}
  </div>;
}
