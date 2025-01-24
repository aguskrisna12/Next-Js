import { render, screen, fireEvent } from '@testing-library/react';
import Register from '@/pages/register';
import { useRouter } from 'next/router';

// Mock the router
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Register', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders register form correctly', () => {
    render(<Register />);
    
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(<Register />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Add assertions based on your registration logic
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('displays validation errors for empty fields', () => {
    render(<Register />);
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
  });

  it('displays error when passwords do not match', () => {
    render(<Register />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('validates email format', () => {
    render(<Register />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });
});
