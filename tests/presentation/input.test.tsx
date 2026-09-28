import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { Input } from '@/presentation/components/input'

describe('Input', () => {
  it('connects the visible label and status to the native input', () => {
    function ControlledFilter() {
      const [value, setValue] = useState('')

      return (
        <Input
          id="podcast-filter"
          label="Filter podcasts"
          status="3 podcasts"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      )
    }

    render(<ControlledFilter />)

    const input = screen.getByRole('textbox', { name: 'Filter podcasts' })
    expect(input).toHaveAttribute('aria-describedby', 'podcast-filter-status')
    expect(screen.getByRole('status')).toHaveTextContent('3 podcasts')
    expect(screen.getByRole('status')).toHaveClass('ui-input__status')

    fireEvent.change(input, { target: { value: 'news' } })
    expect(input).toHaveValue('news')
  })

  it('omits status relationships when no status is provided', () => {
    render(<Input id="podcast-filter" label="Filter podcasts" />)

    expect(screen.getByRole('textbox', { name: 'Filter podcasts' })).not.toHaveAttribute(
      'aria-describedby',
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('preserves native and custom input properties', () => {
    render(
      <Input
        id="podcast-filter"
        label="Filter podcasts"
        className="filter-input"
        disabled
        placeholder="Search shows"
        required
        aria-invalid="true"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Filter podcasts' })
    expect(input).toBeDisabled()
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('placeholder', 'Search shows')
    expect(input).toHaveClass('filter-input')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
