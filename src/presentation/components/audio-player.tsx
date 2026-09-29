export type AudioPlayerProps = {
  src: string
  title: string
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <section className="audio-player" aria-label={`Audio player for ${title}`}>
      {src ? (
        <audio className="audio-player" controls preload="metadata" src={src} />
      ) : (
        <p role="status">Audio unavailable.</p>
      )}
    </section>
  )
}
