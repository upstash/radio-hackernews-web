import { AudioProvider } from "./Audio";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AudioProvider>{children}</AudioProvider>;
};
