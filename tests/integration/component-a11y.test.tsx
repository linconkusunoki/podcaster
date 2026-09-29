import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import axe from 'axe-core'

import { buildPodcast } from '../builders/podcast'
import { buildEpisode } from '../builders/episode'
import { PodcastCard } from '@/presentation/components/podcast-card'
import { PodcastGrid } from '@/presentation/components/podcast-grid'
import { PodcastSidebar } from '@/presentation/components/podcast-sidebar'
import { EpisodeList } from '@/presentation/components/episode-list'
import { Input } from '@/presentation/components/input'
import { AudioPlayer } from '@/presentation/components/audio-player'

describe('component accessibility', () => {
  it('PodcastCard has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <PodcastCard podcast={buildPodcast()} rank={1} />
      </MemoryRouter>,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('PodcastGrid has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <PodcastGrid podcasts={[buildPodcast()]} />
      </MemoryRouter>,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('PodcastSidebar has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <PodcastSidebar podcast={buildPodcast()} />
      </MemoryRouter>,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('EpisodeList has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <EpisodeList episodes={[buildEpisode()]} />
      </MemoryRouter>,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('Input has no axe violations', async () => {
    const { container } = render(
      <Input id="test-input" label="Test label" status="helper text" />,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('AudioPlayer has no axe violations', async () => {
    const { container } = render(
      <AudioPlayer src="https://example.com/audio.mp3" title="Test episode" />,
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
