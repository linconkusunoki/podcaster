export function formatPublishedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatDuration(durationMs: number): string {
  return `${Math.round(durationMs / 60000)} min`
}
