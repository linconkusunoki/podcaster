import { describe, expect, it } from 'vitest'

import { formatDuration, formatPublishedAt } from '@/presentation/utils/episode-formatters'

describe('formatPublishedAt', () => {
  it('formats a date in US locale', () => {
    expect(formatPublishedAt(new Date('2026-01-15T08:00:00.000Z'))).toBe('Jan 15, 2026')
  })

  it('formats December dates correctly', () => {
    expect(formatPublishedAt(new Date('2026-12-25T00:00:00.000Z'))).toBe('Dec 25, 2026')
  })
})

describe('formatDuration', () => {
  it('formats minutes from milliseconds', () => {
    expect(formatDuration(1800000)).toBe('30 min')
  })

  it('rounds to nearest minute', () => {
    expect(formatDuration(1850000)).toBe('31 min')
  })

  it('handles sub-minute durations', () => {
    expect(formatDuration(30000)).toBe('1 min')
  })
})
