export default function Footer() {
  return (
      <footer className="fixed inset-1 top-auto rounded-md bg-zinc-800 px-8 py-3 text-center text-sm text-white">
          Open source project on{" "}
          <a
              href="https://github.com/upstash/radio-hackernews"
              target="_blank"
              className="underline"
          >
              GitHub
          </a>{" "}
          • Powered by{" "}
          <a
              href="https://upstash.com/docs/workflow/getstarted"
              target="_blank"
              className="underline"
          >
              Upstash Workflow,
          </a>

          <a
              href="https://elevenlabs.io/"
              target="_blank"
              className="underline"
          >
              ElevenLabs,
          </a>

          <a
              href="https://www.tigrisdata.com/"
              target="_blank"
              className="underline"
          >
              Tigris Data
          </a>
      </footer>
  );
}
