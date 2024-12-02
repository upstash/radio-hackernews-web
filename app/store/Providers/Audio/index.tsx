"use client";

import { useState } from "react";
import { AudioContext } from "../../AudioContext";

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const onChangeActiveId = (id: string) => {
    setActiveId(id);
  };

  return (
    <AudioContext.Provider value={{ activeId, onChangeActiveId }}>
      {children}
    </AudioContext.Provider>
  );
};
