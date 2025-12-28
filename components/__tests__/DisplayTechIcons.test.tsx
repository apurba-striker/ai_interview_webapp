import { render, screen } from '@testing-library/react'
import DisplayTechIcons from '../DisplayTechIcons'
import { getTechLogos } from '@/lib/utils'

jest.mock('@/lib/utils', () => ({
  getTechLogos: jest.fn(),
  cn: jest.requireActual('@/lib/utils').cn
}))

describe('DisplayTechIcons', () => {
  it('renders icons', async () => {
    (getTechLogos as jest.Mock).mockResolvedValue([
      { tech: 'React', url: '/react.png' },
      { tech: 'Next.js', url: '/next.png' }
    ])

    // Async Server Component testing pattern
    const jsx = await DisplayTechIcons({ techStack: ['React', 'Next.js'] })
    render(jsx)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByAltText('React')).toBeInTheDocument()
  })
})
