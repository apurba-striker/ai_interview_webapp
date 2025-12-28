import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AuthForm from '../AuthForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signIn, signUp } from '@/lib/actions/auth.action'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))
jest.mock('@/lib/actions/auth.action', () => ({
  signIn: jest.fn(),
  signUp: jest.fn()
}))
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}))
jest.mock('@/firebase/client', () => ({
  auth: {}
}))

describe('AuthForm', () => {
  const mockPush = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('renders sign in form', () => {
    render(<AuthForm type="sign-in" />)
    // Check for button text or specific text that indicates sign in mode
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument()
  })

  it('renders sign up form', () => {
    render(<AuthForm type="sign-up" />)
    expect(screen.getByRole('button', { name: /create an account/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })
})
