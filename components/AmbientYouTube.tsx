"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_ID = "TPI4mkZVkt0";

export default function AmbientYouTube() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "https://www.youtube.com",
    );
  }, []);

  useEffect(() => {
    // Local audio can be analysed; the YouTube iframe is cross-origin and intentionally
    // uses a conservative pulse instead of pretending to expose its waveform.
    const localAudio = document.querySelector<HTMLAudioElement>("audio[data-ambient-audio], audio");
    let animationFrame = 0;
    let fallbackFrame = 0;
    let ambientPlaying = true;
    if (localAudio && window.AudioContext) {
      try {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 128;
        const source = context.createMediaElementSource(localAudio);
        source.connect(analyser);
        analyser.connect(context.destination);
        audioContextRef.current = context;
        analyserRef.current = analyser;
        const bins = new Uint8Array(analyser.frequencyBinCount);
        const publish = () => {
          analyser.getByteFrequencyData(bins);
          const measured = bins.reduce((sum, value) => sum + value, 0) / (bins.length * 255);
          const pulse = 0.1 + (Math.sin(performance.now() * 0.006) + 1) * 0.06;
          const level = Math.max(measured, pulse);
          window.dispatchEvent(new CustomEvent("wakanda-audio-level", { detail: level }));
          animationFrame = window.requestAnimationFrame(publish);
        };
        publish();
      } catch {
        // An audio element may already be connected to another MediaElementSource.
      }
    } else {
      const publishFallback = (time: number) => {
        if (ambientPlaying && !mutedRef.current) {
          const pulse = 0.18 + (Math.sin(time * 0.006) + Math.sin(time * 0.013) * 0.5 + 1.5) * 0.12;
          window.dispatchEvent(new CustomEvent("wakanda-audio-level", { detail: Math.min(1, pulse) }));
        }
        fallbackFrame = window.requestAnimationFrame(publishFallback);
      };
      fallbackFrame = window.requestAnimationFrame(publishFallback);
    }
    const startMuted = () => {
      // Request sound on entry; browsers may defer audible autoplay until a gesture.
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
      sendCommand("playVideo");
    };
    const handleTransmissionAudio = (event: Event) => {
      const playing = (event as CustomEvent<{ playing: boolean }>).detail?.playing;
      ambientPlaying = !playing;
      if (playing) {
        sendCommand("pauseVideo");
      } else if (!mutedRef.current) {
        sendCommand("playVideo");
      }
    };

    const currentFrame = frame.current;
    currentFrame?.addEventListener("load", startMuted);
    window.addEventListener("wakanda-transmission-audio", handleTransmissionAudio);
    const activateAfterGesture = () => {
      if (!muted) {
        sendCommand("unMute");
        sendCommand("setVolume", [100]);
        sendCommand("playVideo");
      }
    };
    window.addEventListener("pointerdown", activateAfterGesture, { once: true });
    window.addEventListener("keydown", activateAfterGesture, { once: true });
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (fallbackFrame) window.cancelAnimationFrame(fallbackFrame);
      analyserRef.current?.disconnect();
      void audioContextRef.current?.close();
      analyserRef.current = null;
      audioContextRef.current = null;
      currentFrame?.removeEventListener("load", startMuted);
      window.removeEventListener("wakanda-transmission-audio", handleTransmissionAudio);
      window.removeEventListener("pointerdown", activateAfterGesture);
      window.removeEventListener("keydown", activateAfterGesture);
    };
  }, [sendCommand]);

  const toggleSound = () => {
    const nextMuted = !muted;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    sendCommand(nextMuted ? "mute" : "unMute");
    if (!nextMuted) sendCommand("setVolume", [100]);
    sendCommand("playVideo");
  };

  return (
    <>
      <iframe
        ref={frame}
        className="ambient-video"
        title="DJ WAKANDA ambient transmission"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=0&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        aria-hidden="true"
      />
      <button
        className="sound-toggle"
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Activate ambient sound" : "Mute ambient sound"}
        aria-pressed={!muted}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{muted ? "Activate sound" : "Sound on"}</span>
      </button>
    </>
  );
}
