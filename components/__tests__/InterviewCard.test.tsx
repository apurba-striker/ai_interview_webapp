import { render, screen } from '@testing-library/react'
import InterviewCard from '../InterviewCard'
import { getFeedbackByInterviewId } from '@/lib/actions/general.action'
import { getRandomInterviewCover } from '@/lib/utils'

jest.mock('@/lib/actions/general.action', () => ({
  getFeedbackByInterviewId: jest.fn()
}))
jest.mock('@/lib/utils', () => ({
  getRandomInterviewCover: jest.fn(),
  cn: (...inputs: any[]) => inputs.join(' '),
  getTechLogos: jest.fn().mockResolvedValue([])
}))

// Mock DisplayTechIcons as it is a server component
jest.mock('../DisplayTechIcons', () => {
    return function DummyDisplayTechIcons() {
        return <div data-testid="tech-icons">Tech Icons</div>
    }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: any) => <a {...props}>{props.children}</a>
}))


describe('InterviewCard', () => {
  it('renders interview details', async () => {
    (getFeedbackByInterviewId as jest.Mock).mockResolvedValue({
        totalScore: 85,
        finalAssessment: 'Good job',
        createdAt: new Date().toISOString()
    });
    (getRandomInterviewCover as jest.Mock).mockReturnValue('/cover.png');

    const props = {
        interviewId: '123',
        userId: 'user1',
        role: 'Frontend',
        type: 'Technical',
        techstack: ['React'],
        createdAt: new Date().toISOString()
    }

    const jsx = await InterviewCard(props)
    render(jsx)

    expect(screen.getByText('Frontend Interview')).toBeInTheDocument()
    expect(screen.getByText('85/100')).toBeInTheDocument()
    expect(screen.getByText('Good job')).toBeInTheDocument()
  })
})
