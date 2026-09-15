export type Track = { id: number; title: string; meta: string; duration: string; src?: string; youtubeId?: string; color: string };
export const tracks: Track[] = [
  { id: 1, title: "Nights of Lagos", meta: "WAKANDA / 2024", duration: "06:42", color: "#ff4d2e" },
  { id: 2, title: "Ubuntu Frequency", meta: "WAKANDA / 2023", duration: "05:18", color: "#b7ff3c" },
  { id: 3, title: "Red Earth", meta: "WAKANDA / 2023", duration: "07:05", color: "#c9b6ff" },
  { id: 4, title: "Wakanda Transmission", meta: "YOUTUBE / LIVE", duration: "VIDEO", youtubeId: "C0anRDtIUsM", color: "#d6a84f" },
];
