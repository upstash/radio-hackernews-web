import { createContext, useContext } from "react";

const defaultContextValue = {
  activeId: null,
  onChangeActiveId: () => {},
};

export const AudioContext = createContext<{
  activeId: string | null;
  onChangeActiveId: (id: string) => void;
} | null>(defaultContextValue);

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
