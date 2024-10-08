import { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import colors from "tailwindcss/colors";
import { Story } from "@/utils/types";

const StoryComp = ({
  title,
  url,
  score,
  summaryAudio,
  readableTime,
}: Story) => {
  const containerRef = useRef(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: "https://fly.storage.tigris.dev/radio-hackernews/audio/41718030_1727918222021_summary.mp3",
    waveColor: colors.zinc["300"],
    progressColor: colors.emerald["500"],
    cursorColor: colors.emerald["500"],
    cursorWidth: 2,
    height: 40,
    barWidth: 2,
    barGap: 2,
    barRadius: 4,
    normalize: true,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <article className="w-full border rounded-xl p-4 grid gap-2 shadow-sm">
      <header>
        <h4>{title}</h4>
        <p>{summaryAudio}</p>
      </header>

      <div className="" ref={containerRef} />

      <footer className="flex items-center gap-4">
        <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>

        <span className="ml-auto" />
        <span>Score: {score}</span>
        <span>Time: {readableTime}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Source
        </a>
      </footer>
    </article>
  );
};

export default StoryComp;
