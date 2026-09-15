import { events } from "../lib/events";

const currentFlyer = {
  src: "/images/event-flyer-current.png",
  alt: "Vimos Pa La Playa event flyer featuring DJ Wakanda",
  label: "CURRENT FLYER / JULY 25",
};

export default function Events() {
  return <section className="events section-grid reveal" id="events">
    <div className="events-intro">
      <p className="eyebrow">002 / TRANSMISSIONS</p>
      <h2>Upcoming<br /><span>rituals.</span></h2>
      <p className="body-copy">Recurring sessions, club transmissions, and open-air rituals. The flyer is refreshed here whenever the next event is announced.</p>
      <a className="text-link" href="#booking">Book DJ Wakanda <span aria-hidden="true">↗</span></a>
    </div>
    <div className="events-content">
      <figure className="event-flyer">
        <img src={currentFlyer.src} alt={currentFlyer.alt} />
        <figcaption><span>{currentFlyer.label}</span><span>UPDATE THIS ASSETS / PUBLIC IMAGES</span></figcaption>
      </figure>
      <div className="event-list stagger-group" aria-label="Upcoming events">
        {events.map((e) => <div className="event" key={`${e.date}-${e.city}`}><strong>{e.date}</strong><span><b>{e.city}</b><small>{e.venue}</small></span><em className={e.status === "SOLD OUT" ? "sold" : ""}>{e.status}</em></div>)}
      </div>
    </div>
  </section>;
}
