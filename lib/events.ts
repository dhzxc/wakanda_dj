export type EventItem = { date: string; city: string; venue: string; status: "SOLD OUT" | "TICKETS" | "PRIVATE" };
export const events: EventItem[] = [
  { date: "OCT 18", city: "LAGOS, NG", venue: "The Shrine / Main Stage", status: "SOLD OUT" },
  { date: "NOV 02", city: "LONDON, UK", venue: "Fabric / Room 1", status: "TICKETS" },
  { date: "NOV 23", city: "CAPE TOWN, ZA", venue: "The Labia / After Dark", status: "TICKETS" },
  { date: "DEC 14", city: "DUBAI, AE", venue: "Expo City / Private", status: "PRIVATE" },
];
