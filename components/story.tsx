import { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import colors from "tailwindcss/colors";
import { Story } from "@/utils/types";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

const StoryComp = ({
  title,
  url,
  score,
  summaryAudio,
  readableTime,
}: Story) => {
  console.log(url);
  const containerRef = useRef(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: summaryAudio,
    waveColor: colors.zinc["300"],
    progressColor: colors.emerald["500"],
    cursorColor: colors.emerald["500"],
    cursorWidth: 2,
    height: 32,
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
      <h4 className="font-bold text-balance">{title}</h4>

      <div className="" ref={containerRef} />

      <div className="flex items-center gap-4 text-sm">
        <button
          className="border flex items-center justify-center rounded-full size-8"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <IconPlayerPauseFilled size={16} />
          ) : (
            <IconPlayerPlayFilled size={16} />
          )}
        </button>
        <span>Time: {readableTime}</span>

        <span className="ml-auto" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Score: {score}
        </a>
      </div>
    </article>
  );
};

export default StoryComp;
