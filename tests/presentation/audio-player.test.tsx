import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AudioPlayer } from '@/presentation/components/audio-player'

describe('AudioPlayer', () => {
  it('exposes native audio controls', () => {
    render(<AudioPlayer src="https://example.com/episode.mp3" title="Episode one" />)

    const player = screen.getByLabelText('Audio player for Episode one')
    const audio = player.querySelector('audio')

    expect(audio).not.toBeNull()
    expect(audio).toHaveAttribute('controls')
  })

  it('explains when audio is unavailable', () => {
    render(<AudioPlayer src="" title="Episode one" />)

    expect(screen.getByRole('status')).toHaveTextContent('Audio unavailable.')
  })
})
