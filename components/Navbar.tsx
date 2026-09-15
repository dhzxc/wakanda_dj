"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const links = [["About", "about"], ["Sound", "sound"], ["Events", "events"], ["Booking", "booking"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="nav"><a className="brand" href="#top" aria-label="Wakanda home"><img src="/images/wakanda-mark.png" alt="" /> <span>W/K</span></a><nav aria-label="Primary navigation" className={open ? "nav-links open" : "nav-links"}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav><a className="nav-cta" data-magnetic href="#booking">Book W/K</a><button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>;
}
