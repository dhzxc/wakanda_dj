"use client";
import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { tracks } from "../lib/tracks";
export default function MusicPlayer() {
  // AudioContext is intentionally not created until a user presses play; missing audio fails gracefully.
  const [active, setActive] = useState(0), [playing, setPlaying] = useState(false), [progress, setProgress] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  const youtube = useRef<HTMLIFrameElement>(null);
  const track = tracks[active];
  useEffect(() => { const el = audio.current; if (!el) return; const update = () => setProgress(el.duration ? el.currentTime / el.duration * 100 : 0); el.addEventListener("timeupdate", update); return () => el.removeEventListener("timeupdate", update); }, [active]);
  const sendYouTube = (func: string) => youtube.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func }), "https://www.youtube.com");
  const toggle = async () => {
    if (track.youtubeId) { sendYouTube(playing ? "pauseVideo" : "playVideo"); setPlaying(!playing); return; }
    const el = audio.current; if (!el) return; if (playing) { el.pause(); setPlaying(false); return; }
    try { await el.play(); setPlaying(true); } catch { setPlaying(false); }
  };
  const choose = (i: number) => { setActive(i); setProgress(0); setPlaying(false); if (audio.current) { audio.current.pause(); audio.current.currentTime = 0; } sendYouTube("pauseVideo"); };
  return <div className="player" id="sound"><div className="player-head"><span className="eyebrow">SELECTED TRANSMISSIONS</span><span className="live-dot">● LIVE FROM THE VOID</span></div><div className="player-main"><button className="play" aria-label={playing ? "Pause" : "Play"} aria-pressed={playing} onClick={toggle}>{playing ? <Pause /> : <Play fill="currentColor" />}</button><div className="track-info" aria-live="polite"><strong>{track.title}</strong><small>{track.meta}</small><div className="progress" role="progressbar" aria-label={track.youtubeId ? "YouTube transmission selected" : "Track progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={track.youtubeId ? undefined : Math.round(progress)}><span style={{ width: track.youtubeId ? "100%" : `${progress}%`, background: track.color }} /></div></div><div className={playing ? "visualizer playing" : "visualizer"} aria-hidden="true">{[1, 2, 3, 4, 5, 6].map((n) => <i key={n} />)}</div><span className="time">{track.duration}</span><Volume2 className="volume" aria-hidden="true" /></div><div className="track-list" aria-label="Track list">{tracks.map((item, i) => <button key={item.id} className={i === active ? "track active" : "track"} aria-label={`Play ${item.title}`} aria-pressed={i === active} onClick={() => choose(i)}><span>0{item.id}</span><b>{item.title}</b><small>{item.meta}</small><i>{item.duration}</i></button>)}</div>{track.youtubeId && <iframe ref={youtube} className="track-youtube" title={`${track.title} YouTube player`} src={`https://www.youtube.com/embed/${track.youtubeId}?controls=0&enablejsapi=1&playsinline=1`} allow="autoplay; encrypted-media" />}{!track.youtubeId && <audio ref={audio} src={track.src} onEnded={() => setPlaying(false)} />}</div>;
}
