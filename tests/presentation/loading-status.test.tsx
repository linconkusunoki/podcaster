import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingStatus } from '@/presentation/components/loading-status'

describe('LoadingStatus', () => {
  it('announces a loading message as a polite status', () => {
    render(<LoadingStatus label="Updating podcasts..." />)

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Updating podcasts...')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status).toHaveAttribute('aria-atomic', 'true')
    expect(status.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})
