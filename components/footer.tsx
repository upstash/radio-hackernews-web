export default function Footer() {
  return (
    <footer className="fixed flex items-center justify-center z-10 inset-x-0 p-6 bottom-0">
      <span className="absolute pointer-events-none inset-x-0 bottom-0 h-[230px] from-40% -z-10 bg-gradient-to-t from-white to-transparent" />

      <div className="max-w-screen-sm w-full rounded-lg font-mono bg-zinc-800 p-4 text-center text-white">
        <p>
          Open source project on{" "}
          <a
            href="https://github.com/upstash/radio-hackernews"
            target="_blank"
            className="underline"
          >
            GitHub
          </a>
        </p>
        <p>
          Powered by{" "}
          <a
            href="https://upstash.com/docs/workflow/getstarted"
            target="_blank"
            className="underline"
          >
            Upstash Workflow
          </a>
          ,{" "}
          <a
            href="https://elevenlabs.io/"
            target="_blank"
            className="underline"
          >
            ElevenLabs
          </a>
          ,{" "}
          <a
            href="https://www.tigrisdata.com/"
            target="_blank"
            className="underline"
          >
            Tigris Data
          </a>
        </p>
      </div>
    </footer>
  );
}
