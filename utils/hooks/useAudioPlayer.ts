import { useEffect, RefObject } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { useAudioContext } from "@/app/store/AudioContext";

interface UseAudioPlayerProps {
  id: string;
  container: RefObject<HTMLElement>;
  summaryAudio: string;
  summaryAudioDuration: number;
}

const useAudioPlayer = ({
  id,
  container,
  summaryAudio,
  summaryAudioDuration,
}: UseAudioPlayerProps) => {
  const { activeId, onChangeActiveId } = useAudioContext();

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: container,
    duration: summaryAudioDuration,
    url: summaryAudio,
    waveColor: "#D1D5DB",
    progressColor: "#10B981",
    cursorColor: "#10B981",
    cursorWidth: 2,
    height: 32,
    barWidth: 2,
    barGap: 3,
    barRadius: 4,
    normalize: true,
  });

  useEffect(() => {
    if (!wavesurfer) return;

    if (activeId !== id) {
      onPause();
    }
  }, [activeId]);

  const onPause = () => {
    if (!wavesurfer) return;

    wavesurfer.pause();
  };

  const onPlayPause = () => {
    if (!wavesurfer) return;

    onChangeActiveId(id);
    wavesurfer.playPause();
  };

  return { wavesurfer, isPlaying, onPlayPause };
};

export { useAudioPlayer };
