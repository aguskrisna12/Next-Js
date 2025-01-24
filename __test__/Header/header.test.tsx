import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/layout/Header';
import { describe, it, expect, jest } from '@jest/globals';

const mockRouter = {
  push: jest.fn(),
  pathname: '/'
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter
}));

describe('Header Component', () => {
  it('renders header with logo', () => {
    render(<Header />);
    const logoElement = screen.getByText(/Paris/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    const homeLink = screen.getByText(/Home/i);
    const cartLink = screen.getByText(/Cart/i);
    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });

  it('renders login button when not authenticated', () => {
    render(<Header />);
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('renders with correct styles', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'w-full', 'bg-white');
  });
});

