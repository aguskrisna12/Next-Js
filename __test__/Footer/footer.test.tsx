import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@/layout/Footer';

describe('Footer', () => {
  it('renders footer content correctly', () => {
    render(<Footer />);
    
    // Test footer content is present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays copyright text', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(<Footer />);
    
    // Test footer links are present
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('contains navigation links that are clickable', async () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Test first link is clickable
    const user = userEvent.setup();
    await user.click(links[0]);
  });

  it('has accessible navigation', () => {
    render(<Footer />);
    
    // Test navigation landmark
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
